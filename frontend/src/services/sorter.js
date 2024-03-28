import * as API from './api';

// 5 helper functions for column sort
function sortByDate(transactions, flag) {
    return transactions.sort((a, b) => {
        if (flag)   // ascending order
            return new Date(a.date) - new Date(b.date);
        else        // descending order
            return new Date(b.date) - new Date(a.date);
    });
}

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

function sortByAmount(transactions, flag) {
    return transactions.sort((a, b) => {
        return flag ? a.amount - b.amount : b.amount - a.amount;
    });
}

function sortByCarbonScore(transactions, flag) {
    return transactions.sort((a, b) => {
        return flag ? a.carbonScore - b.carbonScore : b.carbonScore - a.carbonScore;
    });
}

// column sort with flag true being ascending and false being descending
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

// search the input string in the merchantName and Category of each transaction
export function searchSort(transactions, searchInput) {
    const searchLower = searchInput?.toLowerCase() ?? '';
    const matchingTransactions = transactions.filter(transaction => {
        const merchantNameLower = transaction.merchantName?.toLowerCase() ?? '';
        const categoryLower = transaction.category?.toLowerCase() ?? '';
        return merchantNameLower.includes(searchLower) || categoryLower.includes(searchLower);
    });
    return matchingTransactions
}

export async function returnDataForPieChart(transactions, monthList) {
    // monthList is a list of strings representing timestamp
    for (const month of monthList) {
        ret = await API.getCarbonScoreByMonthInCategory()
    }
}

export function returnDataForLineGraph(transactions, monthList) {
    
    return []
}

export function returnDataForBarGraph(transactions, monthList) {
    
    return []
}
