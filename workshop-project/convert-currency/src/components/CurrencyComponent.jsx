const CurrencyComponent = ({currencyChoice,selectCurrency,changeCurrency,amount,onChangeAmount}) => {

  return (
    <div className="currency">
      <select value={selectCurrency} onChange={(e)=>changeCurrency(e.target.value)}>
        {currencyChoice.map((choice)=>{
          return <option key={choice} value={choice}>{choice}</option>
        })}
      </select>
      <input type="number" value={amount} onChange={onChangeAmount}/>
    </div>
  )

}

export default CurrencyComponent;