import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import SignUp from './components/Welcome/SignUp/SignUp';
import Welcome from './components/Welcome/Welcome';
import SignOut from './components/SignOut/SignOut';
import Buttons from './components/Buttons';
import SearchCurrencies from './components/Directory/Currencies/SearchCurrencies';
import DeleteCoin from './components/LoggedIn/DeleteCoin/DeleteCoin';
import About from './components/About/About';
import Convert from './components/Convert/Convert';
import CoinDetails from './components/CoinDetails/CoinDetails';
import HistoryCoin from './components/HistoryCoin/HistoryCoin';
import * as dataServices from './Services/dataServices';


const currencies = {
  // Your currency list here...
};

async function fetchConvert(formData) {
  try {
    const data = await dataServices.convert(formData.coinFrom, formData.coinTo, formData.fromQuantity);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error
  }
}

async function fetchHistory(formData){
  try {
    const data = await dataServices.history(formData.date, formData.target, formData.symbols);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error
  }
}



function App() {
  const [conversion, setConversion] = useState({}); // Initialize conversion state here
const [historyData, setHistoryData] = useState({})
  const currencyList = Object.keys(currencies).map((key) => {
    return {
      value: key,
      label: currencies[key],
    };
  });

  const formData = {
    coinFrom: '',
    coinTo: '', 
    fromQuantity: 0, 
  };

  useEffect(() => {
    fetchConvert(formData)
      .then((data) => {
        setConversion(data);
      })
      .catch((err) => {
        console.error('Error fetching conversion:', err);
      });
  }, []); // Empty array runs useEffect once

  return (
    <>
      <h1>Choose any currency from all around the world!</h1>

      <Convert fetchConvert={fetchConvert} conversion={conversion} setConversion={setConversion} />
    <CoinDetails SearchCurrencies={SearchCurrencies}/>
     <HistoryCoin fetchHistory={fetchHistory} historyData={historyData} setHistoryData={setHistoryData}/>
      <SignOut />
      <About />
    </>
  );
}

export default App;
