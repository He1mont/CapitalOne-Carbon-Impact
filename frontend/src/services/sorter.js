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

<<<<<<< HEAD
function getCategories() {
    return [
        'Entertainment',
        'Education',
        'Shopping',
        'Personal Care',
        'Health & Fitness',
        'Food & Dining',
        'Gifts & Donations',
        'Bills & Utilities',
        'Auto & Transport',
        'Travel'
    ];
}

export async function returnDataForPieChart(transactions, monthList) {
    // // monthList is a list of strings representing timestamp
    // for (const month of monthList) {
    //     ret = await API.getCarbonScoreByMonthInCategory()
    // }
}

export async function returnDataForLineGraph(accountID, dateList) {
    for (const date of dateList) {
        async () => {
            const response = await API.getCarbonScoreByMonthInCategory
                (accountID, date.getFullYear(), date.getMonth());
        }
      }
=======
export async function returnDataForPieChart(accountID, dateList, data) {
    let ret = []
    for (const date of dateList) {
        const obj = await API.getCarbonScoreByMonthInCategory(accountID, date.getFullYear(), date.getMonth());
        let item = {}
        for (const key of Object.keys(obj)) {
            item[key] += obj.key
        }
        ret.push(item)
    }
    return ret
}

export function returnDataForLineGraph(accountID, dateList, data) {
>>>>>>> 7beeb2bc2c508d0756897bef679735c7beb1a71e
    
    return []
}

export function returnDataForBarGraph(accountID, dateList, data) {
    
    return []
}
