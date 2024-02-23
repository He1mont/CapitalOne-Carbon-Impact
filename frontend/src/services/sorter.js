function dateSort (data, mmyyyy) {
    const filteredData = data.filter(item => {
         return item.date === mmyyyy;
    });
    return filteredData;
}

// function searchSort (data, search) {
//     const filteredData = data.filter(item => {
//         const description = item.description.toLowerCase();
//         const category = item.category.toLowerCase();
//         const searchTerm = search.toLowerCase();

//         return description.includes(searchTerm) || category.includes(searchTerm);
//     });
//     return filteredData;
// }

function searchSort({ transactions, searchInput }) {
    const searchLower = searchInput?.toLowerCase() ?? '';
    const matchingTransactions = transactions.filter(transaction => {
        const descriptionLower = transaction.merchant.description?.toLowerCase() ?? '';
        const categoryLower = transaction.merchant.category?.toLowerCase() ?? '';
        return descriptionLower.includes(searchLower) || categoryLower.includes(searchLower);
    });
    return matchingTransactions
}


function colSort (data, column, direction) {
    const sortedData = data.slice().sort((a, b) => {
        if (direction === 'asc'){
            if (a[column] < b[column]) {
                return -1;
            }
            if (a[column] > b[column]) {
                return 1;
            }
        }
        if (direction === 'desc'){
            if (a[column] < b[column]) {
                return 1;
            }
            if (a[column] > b[column]) {
                return -1;
            }
        }
        
        return 0;
    });
    return sortedData;
}

export async function Sorter (data, column, direction, search, mmyyyy) {
    let ret = data;
    if (mmyyyy != null) {
        ret = dateSort(data, mmyyyy);
    }
    if (search != null) {
        ret = searchSort({ transactions: data, searchInput: search });
    }
    if (column != null && direction != null) {
        ret = colSort(data, column, direction);
    }
    return ret;
}

export default Sorter;

// function Sorter (data, column, direction, search, mmyyyy) {
//     let ret = data;
//     if (mmyyyy != null) {
//         ret = dateSort(data, mmyyyy);
//     }
//     if (search != null) {
//         ret = searchSort({ transactions: data, searchInput: search });
//     }
//     if (column != null && direction != null) {
//         ret = colSort(data, column, direction);
//     }
//     return ret;
// }

// const jsonData = {"Transactions":[{"transactionUUID":"2b1cb5e0-b45c-42a2-8628-79d8bcf3f6b2","accountUUID":"71989644","merchantUUID":"7","merchant":{"name":"Trees Trees Trees","category":"Education","description":"High quality readings, reports, documentaries on one topic: trees.","pointOfSale":["Online"]},"amount":0.93,"creditDebitIndicator":"Credit","currency":"GBP","timestamp":"2023-11-12 01:07:34","emoji":"💸","latitude":53.10944658706874,"longitude":-2.161867958686059,"status":"Successful","message":"Education purchase of 0.93 (GBP, negative) at Trees Trees Trees","pointOfSale":"Online"}, {"transactionUUID":"934ff039-8937-425a-8946-f5b9945135fe","accountUUID":"71989644","merchantUUID":"2","merchant":{"name":"Vapour","category":"Entertainment","description":"The World's #1 Game Store","pointOfSale":["Online"]},"amount":359.89,"creditDebitIndicator":"Credit","currency":"GBP","timestamp":"2024-02-06 15:41:44","emoji":"🤑","latitude":55.03179127975648,"longitude":-2.958089331953409,"status":"Successful","message":"Entertainment purchase of 359.89 (GBP, negative) at Vapour","pointOfSale":"Online"}]}
// const transactions = jsonData.Transactions
// console.log(transactions)

// console.log(Sorter(transactions, null, null, "high", null));
