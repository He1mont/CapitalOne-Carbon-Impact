function dateSort (data, mmyyyy) {
    const filteredData = data.filter(item => {
         return item.date === mmyyyy;
    });
    return filteredData;
}

/** For search sort */
function searchSort({ transactions, searchInput }) {
    const searchLower = searchInput?.toLowerCase() ?? '';
    const matchingTransactions = transactions.filter(transaction => {
        const descriptionLower = transaction.merchant.description?.toLowerCase() ?? '';
        const categoryLower = transaction.merchant.category?.toLowerCase() ?? '';
        return descriptionLower.includes(searchLower) || categoryLower.includes(searchLower);
    });
    return matchingTransactions
}

/** For column sort */
function sortByTimestamp(transactions, flag) {
    return transactions.sort((a, b) => {
        if (flag)   // ascending order
            return new Date(a.timestamp) - new Date(b.timestamp);
        else        // descending order
            return new Date(b.timestamp) - new Date(a.timestamp);
    });
}

function sortByDescription(transactions, flag) {
    return transactions.sort((a, b) => {
        const descriptionA = a.merchant.description.toUpperCase();
        const descriptionB = b.merchant.description.toUpperCase();

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
        const catA = a.merchant.category.toUpperCase();
        const catB = b.merchant.category.toUpperCase();

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

function colSort (transactions, column, flag) {
    if (column === 1) {
        return sortByTimestamp(transactions, flag);
    } else if (column === 2) {
        return sortByDescription(transactions, flag)
    } else if (column === 3) {
        return sortByCategory(transactions, flag)
    } else if (column === 5) {
        return sortByAmount(transactions, flag)
    } else {
        console.log("############# Invalue Column Input! #############")
        return transactions
    }
}

export async function Sorter (data, column, direction, search, mmyyyy) {
    if (mmyyyy != null) {
        return dateSort(data, mmyyyy);
    }
    if (search != null) {
        return searchSort({ transactions: data, searchInput: search });
    }
    if (column != null && direction != null) {
        return colSort(data, column, direction);
    }
}

export default Sorter;



