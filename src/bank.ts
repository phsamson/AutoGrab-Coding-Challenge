  // src/bank.ts

  class Bank {
  private customers: Map<string, number>;

  constructor() {
    this.customers = new Map();
  }

  join(name: string, initialDeposit: number): void {
    if (this.customers.has(name)) {
      throw new Error(`Customer "${name}" already exists.`);
    }
    this.customers.set(name, initialDeposit);
  }

  deposit(name: string, amount: number): void {
    this.validateCustomer(name);
    const currentBalance = this.customers.get(name)!;
    this.customers.set(name, currentBalance + amount);
  }

  withdraw(name: string, amount: number): void {
    this.validateCustomer(name);
    const currentBalance = this.customers.get(name)!;

    if (amount > currentBalance) {
      throw new Error(`Insufficient funds for customer "${name}".`);
    }

    this.customers.set(name, currentBalance - amount);
  }

  checkBalance(name: string): number {
    this.validateCustomer(name);
    return this.customers.get(name)!;
  }

  getTotalBalance(): number {
    let totalBalance = 0;
    for (const balance of this.customers.values()) {
      totalBalance += balance;
    }
    return totalBalance;
  }

  private validateCustomer(name: string): void {
    if (!this.customers.has(name)) {
      throw new Error(`Customer "${name}" not found.`);
    }
  }
}
export default Bank;
