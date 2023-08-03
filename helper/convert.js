function ConvertToUsd(num){
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(num)
}
function CountPerTypeTransaction(array){
    let transactionTotal = {}
    array.forEach(transaction => {
        const perType = transaction["TransactionType"]["typeName"]
        if (transactionTotal[perType]) {
            transactionTotal[perType]++;
          } else {
            transactionTotal[perType] = 1;

          }
    });
    return transactionTotal;

    // return JSON.stringify(transactionTotal)

}


module.exports = {ConvertToUsd,CountPerTypeTransaction}