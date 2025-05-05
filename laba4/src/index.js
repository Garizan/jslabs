import { addTransactionToArray, getTransactions, deleteTransactionFromArray } from './transactions.js';
import { renderTransactionTable, renderTransactionDetails } from './ui.js';

const transactionForm = document.getElementById('transaction-form');
const transactionTable = document.getElementById('transaction-table').querySelector('tbody');
const totalSumElement = document.getElementById('total-sum');
const transactionDetailsElement = document.getElementById('transaction-details');

/**
 * Обновляет отображение общей суммы всех транзакций.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {HTMLElement} totalSumElement - DOM-элемент для отображения общей суммы.
 */
function updateTotalSum(transactions, totalSumElement) {
  const totalSum = transactions.reduce((sum, transaction) => {
    // Вычитаем сумму, если это расход, иначе добавляем
    return sum + (transaction.category === 'Доход' ? transaction.amount : -transaction.amount);
  }, 0);

  totalSumElement.textContent = `Общая сумма: ${totalSum.toFixed(2)}`;
}

/**
 * Обработчик отправки формы добавления транзакции.
 * @param {Event} e - Событие отправки формы.
 */
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const amountInput = document.getElementById('amount');
  const categoryInput = document.getElementById('category');
  const descriptionInput = document.getElementById('description');

  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const description = descriptionInput.value;

  if (!amount || !category || !description) {
    alert('Пожалуйста, заполните все поля!');
    return;
  }

  const newTransaction = addTransactionToArray(amount, category, description);

  renderTransactionTable(newTransaction, transactionTable);

  updateTotalSum(getTransactions(), totalSumElement);

  transactionForm.reset();
});
/**
 * Обработчик кликов по таблице транзакций (удаление или отображение деталей).
 * @param {MouseEvent} e - Событие клика по таблице.
 */
transactionTable.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const row = e.target.closest('tr');
    const transactionId = row.dataset.id;

    deleteTransactionFromArray(transactionId);
    row.remove();

    updateTotalSum(getTransactions(), totalSumElement);
  } else if (e.target.tagName === 'TD') {
    const row = e.target.closest('tr');
    const transactionId = row.dataset.id;
    const transaction = getTransactions().find((t) => t.id === transactionId);

    renderTransactionDetails(transaction, transactionDetailsElement);
  }
});
