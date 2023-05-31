import React from 'react';
import { useState, useEffect } from 'react';
import  Block  from './Block';
import './index.scss';
import rateses from "./db"
import { useRef } from 'react';



function App() {
  const [fromCurrency , setFromCurrency] = useState("RUB")
  const [toCurrency , settoCurrency] = useState("USD")
  const [rates, setRates] = useState({});
  const [fromPrice , setFromPrice] = useState();
  const [toPrice , setToPrice] = useState();

  const ratesRef = useRef({})

  ratesRef.current = rateses


  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency] ;
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value ;
    setFromPrice(result.toFixed(3));
    setToPrice(value)
  }

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency] )

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency ] )

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice}/>
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={settoCurrency} onChangeValue={onChangeToPrice}/>
      
    </div>
  );
}

export default App;