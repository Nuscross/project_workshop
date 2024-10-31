
import { useEffect, useState } from "react";
import CurrencyComponent from "./components/CurrencyComponent";
import money from "./assets/images/money.png";
import "./App.css";

function App() {

  const [currencyChoice,setCurrencyChoice] = useState([]);

  const [formCurrency,setFormCurrency] = useState("USD");
  const [toCurrency,setToCurrency] = useState("THB");

  const [amount,setAmount] = useState(1);
  const [exchangeRate,setExchangeRate] = useState(0);

  const [checkFromCurrency,setCheckFromCurrency] = useState(true);

  let formAmount, toAmount;

  useEffect(()=>{
    const url = `https://api.exchangerate-api.com/v4/latest/${formCurrency}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      // console.log(data);
      setCurrencyChoice([...Object.keys(data.rates)]);
      setExchangeRate(data.rates[toCurrency]);
    })
  },[formCurrency,toCurrency])

  const changeFromCurrency = (currency) => {
    setFormCurrency(currency);
  }

  const changeToCurrency = (currency) => {
    setToCurrency(currency);
  }

  const amountFromCurrency = (e) => {
    setCheckFromCurrency(true);
    setAmount(e.target.value)
  }

  const amountToCurrency = (e) => {
    setCheckFromCurrency(false);
    setAmount(e.target.value)
  }

  if (checkFromCurrency) {
    formAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  }
  else {
    formAmount = (amount / exchangeRate).toFixed(2);
    toAmount = amount
  }

  return (
    <div>
      <img alt="Logo" src={money} />
      <h1>App Convert Currency (API)</h1>
      <div className="container">
        <CurrencyComponent 
          currencyChoice={currencyChoice} 
          selectCurrency={formCurrency} 
          changeCurrency={changeFromCurrency}
          amount={formAmount}
          onChangeAmount={amountFromCurrency}
        />
        <div className="equal"> = </div>
        <CurrencyComponent
          currencyChoice={currencyChoice} 
          selectCurrency={toCurrency} 
          changeCurrency={changeToCurrency}
          amount={toAmount}
          onChangeAmount={amountToCurrency}
        />
      </div>
    </div>
  )
}

export default App;
