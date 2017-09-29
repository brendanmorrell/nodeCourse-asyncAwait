const axios = require('axios')

const getExchangeRate = (from, to) => {
  return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
    return response.data.rates[to];
  });
};

const getCountries = (currency) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`).then((response) => {
    return response.data.map((country) => country.name);
  });
};

/*const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries=tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangedAmount = amount* rate;
    return `${amount} ${from} is worth ${exchangedAmount} in ${to}. ${to} can be used in the following countries:${countries.join(', ')}`
  });
};*/

const convertCurrency = async (from, to, amount) => {
  const countries = await getCountries(to);
  const exchangeRate = await getExchangeRate(from, to);
  const exchangedAmount = amount*exchangeRate;

  return `${amount} in ${from} is equal to ${exchangedAmount} in ${to}. ${to} can be used in the folloeing countries: ${countries.join(', ')}`
};

convertCurrency('CAD', 'USD', 100).then((string) => {
  console.log(string);
});
