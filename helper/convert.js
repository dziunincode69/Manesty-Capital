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
}
function GenerateRandomName() {
  const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'James', 'Olivia', 'Robert', 'Ava', 'William', 'Isabella'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Martinez', 'Garcia', 'Harris', 'Lee', 'Clark'];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFirstName} ${randomLastName}`;
}

module.exports = {ConvertToUsd,CountPerTypeTransaction, GenerateRandomName}