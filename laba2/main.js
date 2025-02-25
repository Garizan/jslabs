import transactions from "./transactions.js";

function getUniqueTransactionTypes(transactions) {
    return [...new Set(transactions.map(tx => tx.transaction_type))];
}

// Тестируем функцию
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));