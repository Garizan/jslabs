// src/transactions.js

import { generateId } from './utils.js';

const transactions = [];
/**
 * Добавляет новую транзакцию в массив.
 * @param {number} amount - Сумма транзакции.
 * @param {string} category - Категория транзакции ("Доход" или "Расход").
 * @param {string} description - Описание транзакции.
 * @returns {Object} Добавленная транзакция.
 */
export function addTransactionToArray(amount, category, description) {
  const transaction = {
    id: generateId(),
    date: new Date(),
    amount,
    category,
    description,
  };

  transactions.push(transaction);
  return transaction;
}
/**
 * Возвращает массив всех транзакций.
 * @returns {Array<Object>} Массив транзакций.
 */
export function getTransactions() {
  return transactions;
}

/**
 * Удаляет транзакцию по её идентификатору.
 * @param {string} id - Уникальный идентификатор транзакции.
 */
export function deleteTransactionFromArray(id) {
  const index = transactions.findIndex((transaction) => transaction.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
  }
}
