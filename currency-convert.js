const axios = require('axios')

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
  } catch (e) {
    throw new Error (`Server request unable to complete using currecy codes ${from} and ${to}`)
  }
  try {
    return response.data.rates[to];
  } catch (e) {
    throw new Error (`Connected to server, but no exchange data found between ${from} and ${to}`);
  }
};

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error (`No countries found matching the currency code ${currencyCode}`)
  }
};


const convertCurrency = async (from, to, amount) => {
  let upperFrom= from.toUpperCase();
  let upperTo= to.toUpperCase();
  const countries = await getCountries(upperTo);
  const exchangeRate = await getExchangeRate(upperFrom, upperTo);
  const exchangedAmount = amount*exchangeRate;

  return `${amount} in ${upperFrom} is equal to ${exchangedAmount} in ${upperTo}. ${upperTo} can be used in the following countries: ${countries.join(', ')}`
};

convertCurrency('usd', 'usd', 200).then((string) => {
  console.log(string);
}).catch((e) => {
  console.log(e.message);
});
