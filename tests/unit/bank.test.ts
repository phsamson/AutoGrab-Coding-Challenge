//get the logic from /src/bank
import Bank from '../../src/app/bank';

describe('Bank', () => {
  let bank: Bank;

  beforeEach(() => {
    bank = new Bank();
  });

  test('Test Case #1 - Check if a customer is allowed to join the bank with an initial deposit', () => {
    bank.join('Charles Harvey', 100);
    expect(bank.checkBalance('Charles Harvey')).toBe(100);
  });

  test('Test Case #2 - Check if a customer is allowed to deposit money', () => {
    bank.join('Jane Doe', 50);
    bank.deposit('Jane Doe', 30);
    expect(bank.checkBalance('Jane Doe')).toBe(80);
  });

  test('Test Case #3 - Check if a customer is allowed to withdraw money', () => {
    bank.join('Bob Smith', 200);
    bank.withdraw('Bob Smith', 50);
    expect(bank.checkBalance('Bob Smith')).toBe(150);
  });

  test('Test Case #4 - Check if a customer tries to withdraw more than the balance, it should display an error message', () => {
    bank.join('Alice Johnson', 30);
    expect(() => bank.withdraw('Alice Johnson', 50)).toThrow(
      'Insufficient funds for customer "Alice Johnson".'
    );
  });

  test('Test Case #5 - Check if a customer tries to join with an existing name, it should display an error message', () => {
    bank.join('John Doe', 100);
    expect(() => bank.join('John Doe', 50)).toThrow('Customer "John Doe" already exists.');
  });

  test('Test Case #6 - Check if trying to perform an operation on a non-existing customer displays an error message', () => {
    expect(() => bank.deposit('Non-existing Customer', 50)).toThrow(
      'Customer "Non-existing Customer" not found.'
    );
  });

  test('Test Case #7 - Check if the bank manager can see the total balance of the bank', () => {
    bank.join('John Doe', 100);
    bank.join('Jane Doe', 50);
    bank.join('Bob Smith', 200);
    bank.join('Charles Harvey', 500)

    const totalBalance = bank.getTotalBalance();
    expect(totalBalance).toBe(850);
  });
});
