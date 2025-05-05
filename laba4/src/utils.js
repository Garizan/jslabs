// src/utils.js
/**
 * Генерирует уникальный идентификатор.
 * @returns {string} Уникальный ID.
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 15);
}
/**
 * Форматирует дату в локальный строковый формат.
 * @param {Date|string|number} date - Объект Date или значение, которое может быть преобразовано в дату.
 * @returns {string} Отформатированная дата и время.
 */
export function formatDate(date) {
  return new Date(date).toLocaleString();
}
