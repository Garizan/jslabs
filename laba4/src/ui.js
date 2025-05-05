// src/ui.js

import { formatDate } from './utils.js';
/**
 * Отрисовывает одну транзакцию в таблице.
 * @param {Object} transaction - Объект транзакции.
 * @param {string} transaction.id - Уникальный идентификатор транзакции.
 * @param {Date} transaction.date - Дата транзакции.
 * @param {string} transaction.category - Категория ("Доход" или "Расход").
 * @param {string} transaction.description - Описание транзакции.
 * @param {number} transaction.amount - Сумма транзакции.
 * @param {HTMLElement} tableBody - Элемент `<tbody>` таблицы для добавления строки.
 */
export function renderTransactionTable(transaction, tableBody) {
  const row = document.createElement('tr');
  row.dataset.id = transaction.id;

  row.innerHTML = `
    <td>${formatDate(transaction.date)}</td>
    <td>${transaction.category}</td>
    <td>${transaction.description.split(' ').slice(0, 4).join(' ')}...</td>
    <td><button class="delete-btn">Удалить</button></td>
  `;

  row.style.color = transaction.amount > 0 ? 'green' : 'red';

  tableBody.appendChild(row);
}
/**
 * Обновляет отображение общей суммы всех транзакций.
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {HTMLElement} totalSumElement - DOM-элемент, в который выводится общая сумма.
 */
export function updateTotalSum(transactions, totalSumElement) {
  const totalSum = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  totalSumElement.textContent = `Общая сумма: ${totalSum}`;
}
/**
 * Отображает подробную информацию о транзакции в DOM.
 * @param {Object} transaction - Объект транзакции.
 * @param {HTMLElement} detailsElement - Элемент, в который будет вставлена информация.
 */
export function renderTransactionDetails(transaction, detailsElement) {
  detailsElement.innerHTML = `
    <p><strong>Дата:</strong> ${formatDate(transaction.date)}</p>
    <p><strong>Категория:</strong> ${transaction.category}</p>
    <p><strong>Сумма:</strong> ${transaction.amount}</p>
    <p><strong>Описание:</strong> ${transaction.description}</p>
  `;
}
