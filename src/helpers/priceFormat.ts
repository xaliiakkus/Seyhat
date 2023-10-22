export default function priceFormat({ amount, currency }: {
    amount: any;
    currency: any;
}) {

    var symbol = "";

    if (currency == "TRY")
        symbol = "₺"
    else if (currency == "USD")
        symbol = "$"
    else if (currency == "EUR")
        symbol = "€"

    return symbol + (new Intl.NumberFormat().format(amount.toFixed(2)));
}