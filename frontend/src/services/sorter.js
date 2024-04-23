import * as API from './api';

// Five helper functions for column sort:

/**
 * Sorts transactions by date in ascending or descending order.
 * @param {Array} transactions - The array of transactions to be sorted.
 * @param {boolean} flag - The flag indicating the sorting order (true for ascending, false for descending).
 * @returns {Array} The sorted array of transactions.
 */
function sortByDate(transactions, flag) {
    return transactions.sort((a, b) => {
        if (flag)   // ascending order
            return new Date(a.date) - new Date(b.date);
        else        // descending order
            return new Date(b.date) - new Date(a.date);
    });
}

/**
 * Sorts transactions by merchant name in ascending or descending order.
 * @param {Array} transactions - The array of transactions to be sorted.
 * @param {boolean} flag - The flag indicating the sorting order (true for ascending, false for descending).
 * @returns {Array} The sorted array of transactions.
 */
function sortByMerchantName(transactions, flag) {
    return transactions.sort((a, b) => {
        const descriptionA = a.merchantName.toUpperCase();
        const descriptionB = b.merchantName.toUpperCase();

        if (descriptionA < descriptionB) {
            return flag ? -1 : 1;
        }
        if (descriptionA > descriptionB) {
            return flag ? 1 : -1;
        }
        return 0;
    });
}

/**
 * Sorts transactions by category in ascending or descending order.
 * @param {Array} transactions - The array of transactions to be sorted.
 * @param {boolean} flag - The flag indicating the sorting order (true for ascending, false for descending).
 * @returns {Array} The sorted array of transactions.
 */
function sortByCategory(transactions, flag) {
    return transactions.sort((a, b) => {
        const catA = a.category.toUpperCase();
        const catB = b.category.toUpperCase();

        if (catA < catB) {
            return flag ? -1 : 1;
        }
        if (catA > catB) {
            return flag ? 1 : -1;
        }
        return 0;
    });
}

/**
 * Sorts transactions by amount in ascending or descending order.
 * @param {Array} transactions - The array of transactions to be sorted.
 * @param {boolean} flag - The flag indicating the sorting order (true for ascending, false for descending).
 * @returns {Array} The sorted array of transactions.
 */
function sortByAmount(transactions, flag) {
    return transactions.sort((a, b) => {
        return flag ? a.amount - b.amount : b.amount - a.amount;
    });
}

/**
 * Sorts transactions by carbon score in ascending or descending order.
 * @param {Array} transactions - The array of transactions to be sorted.
 * @param {boolean} flag - The flag indicating the sorting order (true for ascending, false for descending).
 * @returns {Array} The sorted array of transactions.
 */
function sortByCarbonScore(transactions, flag) {
    return transactions.sort((a, b) => {
        return flag ? a.carbonScore - b.carbonScore : b.carbonScore - a.carbonScore;
    });
}

/**
 * Sorts transactions by the specified column in the specified order.
 * @param {Array} transactions - The array of transactions to be sorted.
 * @param {number} column - The column index by which to sort the transactions.
 * @param {boolean} flag - The flag indicating the sorting order (true for ascending, false for descending).
 * @returns {Array} The sorted array of transactions.
 */
export function colSort(transactions, column, flag) {
    if (column === 1) {
        return sortByDate(transactions, flag);
    } else if (column === 2) {
        return sortByMerchantName(transactions, flag)
    } else if (column === 3) {
        return sortByCategory(transactions, flag)
    } else if (column === 4) {
        return sortByAmount(transactions, flag)
    } else if (column === 5) {
        return sortByCarbonScore(transactions, flag)
    } else {
        console.log("############# Invalue Column Input! #############")
        return transactions
    }
}

/**
 * Filters transactions based on the search input.
 * @param {Array} transactions - The array of transactions to be filtered.
 * @param {string} searchInput - The input string to search for in transaction merchant names and categories.
 * @returns {Array} The array of transactions that match the search input.
 */
export function searchSort(transactions, searchInput) {
    const searchLower = searchInput?.toLowerCase() ?? '';
    const matchingTransactions = transactions.filter(transaction => {
        const merchantNameLower = transaction.merchantName?.toLowerCase() ?? '';
        const categoryLower = transaction.category?.toLowerCase() ?? '';
        return merchantNameLower.includes(searchLower) || categoryLower.includes(searchLower);
    });
    return matchingTransactions
}

