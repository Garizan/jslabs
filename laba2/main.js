const transactions = [
    {
        transaction_id: "1",
        transaction_date: "2024-01-20",
        transaction_amount: 150.00,
        transaction_type: "credit",
        transaction_description: "Оплата за услуги",
        merchant_name: "Netflix",
        card_type: "credit"
    },
    {
        transaction_id: "2",
        transaction_date: "2024-02-21",
        transaction_amount: 50.00,
        transaction_type: "debit",
        transaction_description: "Покупка в магазине",
        merchant_name: "Walmart",
        card_type: "debit"
    },
    {
        transaction_id: "3",
        transaction_date: "2024-01-22",
        transaction_amount: 100.00,
        transaction_type: "credit",
        transaction_description: "Аренда жилья",
        merchant_name: "Airbnb",
        card_type: "credit"
    },
    {
        transaction_id: "4",
        transaction_date: "2024-02-22",
        transaction_amount: 200.00,
        transaction_type: "debit",
        transaction_description: "Оплата за покупки",
        merchant_name: "MediaMarkt",
        card_type: "debit"
    }
];
// Создание пустого массива.
const emptyTransactions = [];

// Массив с 1 транзакцией.
const singleTransaction = [
    {
        transaction_id: "1",
        transaction_date: "2024-01-20",
        transaction_amount: 70.00,
        transaction_type: "credit",
        transaction_description: "Оплата за услуги",
        merchant_name: "Netflix",
        card_type: "credit"
    }
]; 

/**
 * Получить уникальные типы транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {Array<string>} Массив уникальных типов транзакций.
 */
function getUniqueTransactionTypes(transactions) {
    const types = transactions.map(tx => tx.transaction_type);
    return [...new Set(types)];
}
/**
 * Вычислить общую сумму всех транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Общая сумма транзакций.
 */
function calculateTotalAmount(transactions) {
    return transactions.reduce((sum, tx) => sum + tx.transaction_amount, 0);
}
/**
 * Вычислить общую сумму транзакций за определённую дату.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {number} year - Год.
 * @param {number} month - Месяц (1-12).
 * @param {number} day - День (1-31).
 * @returns {number} Общая сумма транзакций за указанную дату.
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.filter(tx => { const date = new Date(tx.transaction_date);

    return (!year || date.getFullYear() === year) &&
        (!month || date.getMonth() + 1 === month) &&
        (!day || date.getDate() === day);
    }).reduce((sum, tx) => sum + tx.transaction_amount, 0);
}
/**
 * Получить транзакции указанного типа.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} type - Тип транзакции (например, "debit" или "credit").
 * @returns {Array} Массив транзакций указанного типа.
 */
function getTransactionByType(transactions, type) {
    return transactions.filter(tx => tx.transaction_type === type);
}
/**
 * Получить транзакции в указанном диапазоне дат.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} startDate - Начальная дата в формате YYYY-MM-DD.
 * @param {string} endDate - Конечная дата в формате YYYY-MM-DD.
 * @returns {Array} Массив транзакций в указанном диапазоне дат.
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
    return transactions.filter(tx => {
        const date = tx.transaction_date;
        return date >= startDate && date <= endDate;
    })
}
/**
 * Получить транзакции от указанного продавца.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} merchantName - Название продавца.
 * @returns {Array} Массив транзакций с указанным продавцом.
 */
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(tx => tx.merchant_name === merchantName);
}
/**
 * Рассчитать среднюю сумму транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Средняя сумма транзакций.
 */
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    const totalAmount = transactions.reduce((sum, tx) => sum + tx.transaction_amount, 0);
    return totalAmount / transactions.length;
}
/**
 * Получить транзакции в указанном диапазоне сумм.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {number} minAmount - Минимальная сумма транзакции.
 * @param {number} maxAmount - Максимальная сумма транзакции.
 * @returns {Array} Массив транзакций в указанном диапазоне сумм.
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(tx => tx.transaction_amount >= minAmount && tx.transaction_amount <= maxAmount);
}
/**
 * Вычислить общую сумму дебетовых транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Общая сумма дебетовых транзакций.
 */
function calculateTotalDebitAmount(transactions) {
    return transactions.filter(tx => tx.transaction_type === "debit")
    .reduce((sum,tx) => sum + tx.transaction_amount, 0);
}
/**
 * Найти месяц с наибольшим количеством транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number|null} Номер месяца (1-12) или null, если массив пуст.
 */
function findMostTransactionsMonth(transactions) {
    if (transactions.length === 0) {
        return null;
    }
    const months = transactions.map(transaction => new Date(transaction.transaction_date).getMonth());
    const monthCounts = months.reduce((counts, month) => {
        counts[month] = (counts[month] || 0) + 1;
        return counts;
    }, {});
    const mostTransactionsMonth = Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
    return parseInt(mostTransactionsMonth) + 1; 
}

/**
 * Найти месяц с наибольшим количеством дебетовых транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number|null} Номер месяца (1-12) или null, если массив пуст.
 */
function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = transactions.filter(transaction => transaction.card_type === 'debit');
    if (transactions.length === 0) {
        return null;
    }
    return findMostTransactionsMonth(debitTransactions);
}
/**
 * Определить, какого типа транзакций больше.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {string} "debit", "credit" или "equal".
 */
function mostTransactionTypes(transactions) {
    const debitCount = transactions.filter(transaction => transaction.transaction_type === 'debit').length;
    const creditCount = transactions.filter(transaction => transaction.transaction_type === 'credit').length;

    if (debitCount > creditCount) return 'debit';
    if (creditCount > debitCount) return 'credit';
    return 'equal';
}
/**
 * Получить транзакции, совершённые до указанной даты.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string|Date} date - Целевая дата.
 * @returns {Array} Массив транзакций до указанной даты.
 */
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = typeof date === "string" ? new Date(date) : date;
    return transactions.filter(tx => {
        const transactionDate = new Date(tx.transaction_date); 
        return transactionDate < targetDate;
    });
}
/**
 * Найти транзакцию по уникальному идентификатору.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} id - Уникальный идентификатор транзакции.
 * @returns {Array} Массив, содержащий найденную транзакцию (или пустой массив).
 */
function findTransactionById(transactions, id) {
    return transactions.filter(tx => tx.transaction_id === id);
}
/**
 * Получить описания всех транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {Array<string>} Массив описаний транзакций.
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(tx => tx.transaction_description);
}
// Тестирование функций.
console.log("1. Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("2. Сумма всех транзакций:",calculateTotalAmount(transactions));
console.log("3. Общая сумма транзакций за указанный период времени:", calculateTotalAmountByDate(transactions, 2024, 2, 20));
console.log("4. Транзакция указанного типа:", getTransactionByType(transactions, "debit"));
console.log("5. Транзакции проведённые в указанном диапазоне:", getTransactionsInDateRange(transactions, "2024-02-20", "2024-02-22"));
console.log("6. Транзакция с указанным названием:", getTransactionsByMerchant(transactions, "Walmart"));
console.log("7. Среднее значение транзакций:", calculateAverageTransactionAmount(transactions));
console.log("8. Транзакции в указанном диапазоне:", getTransactionsByAmountRange(transactions, 50, 100));
console.log("9. Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
console.log("10. Месяц в котором было больше всего транзакций:", findMostTransactionsMonth(transactions));
console.log("11. Месяц в котором было больше всего дебетовых транзакций:", findMostDebitTransactionMonth(transactions))
console.log("12. Больше всего транзакций: ",  mostTransactionTypes(transactions));
console.log("13. Массив транзакций, совершённых до определённой даты:", getTransactionsBeforeDate(transactions, "2024-02-20"));
console.log("14. Транзакция с уникальным идентификатором:", findTransactionById(transactions, "3"));
console.log("15. Описания транзакций:", mapTransactionDescriptions(transactions));



// Тестирование на пустом массиве.
console.log("\nТестирование на пустом массиве:");

console.log("1. Уникальные типы транзакций:", getUniqueTransactionTypes(emptyTransactions));
console.log("2. Сумма всех транзакций:",calculateTotalAmount(emptyTransactions));
console.log("3. Общая сумма транзакций за указанный период времени:", calculateTotalAmountByDate(emptyTransactions, 2024, 2, 20));
console.log("4. Транзакция указанного типа:", getTransactionByType(emptyTransactions, "debit"));
console.log("5. Транзакции проведённые в указанном диапазоне:", getTransactionsInDateRange(emptyTransactions, "2024-02-20", "2024-02-21"));
console.log("6. Транзакция с указанным названием:", getTransactionsByMerchant(emptyTransactions, "Walmart"));
console.log("7. Среднее значение транзакций:", calculateAverageTransactionAmount(emptyTransactions));
console.log("8. Транзакции в указанном диапазоне:", getTransactionsByAmountRange(emptyTransactions, 50, 100));
console.log("9. Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(emptyTransactions));
console.log("10. Месяц в котором было больше всего транзакций:", findMostTransactionsMonth(emptyTransactions));
console.log("11. Месяц в котором было больше всего дебетовых транзакций:", findMostDebitTransactionMonth(emptyTransactions))
console.log("12. Больше всего транзакций: ",  mostTransactionTypes(emptyTransactions));
console.log("13. Массив транзакций, совершённых до определённой даты:", getTransactionsBeforeDate(emptyTransactions, "2024-02-21"));
console.log("14. Транзакция с уникальным идентификатором:", findTransactionById(emptyTransactions, "3"));
console.log("15. Описания транзакций:", mapTransactionDescriptions(emptyTransactions));

// Тестирование на массиве с 1 транзакцией.
console.log("\n Тестирование на массиве с 1 транзакцией.");

console.log("1. Уникальные типы транзакций:", getUniqueTransactionTypes(singleTransaction));
console.log("2. Сумма всех транзакций:",calculateTotalAmount(singleTransaction));
console.log("3. Общая сумма транзакций за указанный период времени:", calculateTotalAmountByDate(singleTransaction, 2024, 2, 20));
console.log("4. Транзакция указанного типа:", getTransactionByType(singleTransaction, "debit"));
console.log("5. Транзакции проведённые в указанном диапазоне:", getTransactionsInDateRange(singleTransaction, "2024-02-20", "2024-02-21"));
console.log("6. Транзакция с указанным названием:", getTransactionsByMerchant(singleTransaction, "Walmart"));
console.log("7. Среднее значение транзакций:", calculateAverageTransactionAmount(singleTransaction));
console.log("8. Транзакции в указанном диапазоне:", getTransactionsByAmountRange(singleTransaction, 50, 100));
console.log("9. Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(singleTransaction));
console.log("10. Месяц в котором было больше всего транзакций:", findMostTransactionsMonth(singleTransaction));
console.log("11. Месяц в котором было больше всего дебетовых транзакций:", findMostDebitTransactionMonth(singleTransaction))
console.log("12. Больше всего транзакций: ",  mostTransactionTypes(singleTransaction));
console.log("13. Массив транзакций, совершённых до определённой даты:", getTransactionsBeforeDate(singleTransaction, "2024-02-21"));
console.log("14. Транзакция с уникальным идентификатором:", findTransactionById(singleTransaction, "3"));
console.log("15. Описания транзакций:", mapTransactionDescriptions(singleTransaction));


