const config = {
    api: "http://localhost:4000"
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
});

export default config;
export { currencyFormatter };