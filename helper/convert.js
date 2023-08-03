function ConvertToUsd(num){
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(num)
}

module.exports = ConvertToUsd