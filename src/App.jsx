import { useEffect, useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/Welcome/SignUp/SignUp'
import Welcome from './components/Welcome/Welcome'
import SignOut from './components/SignOut/SignOut'
import Buttons from './components/Buttons'
import SearchCurrencies from './components/Directory/Currencies/SearchCurrencies'
import DeleteCoin from './components/LoggedIn/DeleteCoin/DeleteCoin'
import About from './components/About/About'
import Convert from './components/Convert/Convert'
import * as Services from './Services/Services'

//import CoinDetails from './components/CoinDetails/CoinDetails'

//entire currency object 
const currencies = {
  AED: 'United Arab Emirates Dirham',
  AFN: 'Afghan Afghani',
  ALL: 'Albanian Lek',
  AMD: 'Armenian Dram',
  ANG: 'Netherlands Antillean Guilder',
  AOA: 'Angolan Kwanza',
  ARS: 'Argentine Peso',
  AUD: 'Australian Dollar',
  AWG: 'Aruban Florin',
  AZN: 'Azerbaijani Manat',
  BAM: 'Bosnia-Herzegovina Convertible Mark',
  BBD: 'Barbadian Dollar',
  BDT: 'Bangladeshi Taka',
  BGN: 'Bulgarian Lev',
  BHD: 'Bahraini Dinar',
  BIF: 'Burundian Franc',
  BMD: 'Bermudan Dollar',
  BND: 'Brunei Dollar',
  BOB: 'Bolivian Boliviano',
  BRL: 'Brazilian Real',
  BSD: 'Bahamian Dollar',
  BTN: 'Bhutanese Ngultrum',
  BWP: 'Botswanan Pula',
  BYN: 'New Belarusian Ruble',
  BYR: 'Belarusian Ruble',
  BZD: 'Belize Dollar',
  CAD: 'Canadian Dollar',
  CDF: 'Congolese Franc',
  CHF: 'Swiss Franc',
  CLF: 'Chilean Unit of Account (UF)',
  CLP: 'Chilean Peso',
  CNY: 'Chinese Yuan',
  CNH: 'Chinese Yuan Offshore',
  COP: 'Colombian Peso',
  CRC: 'Costa Rican Colón',
  CUC: 'Cuban Convertible Peso',
  CUP: 'Cuban Peso',
  CVE: 'Cape Verdean Escudo',
  CZK: 'Czech Republic Koruna',
  DJF: 'Djiboutian Franc',
  DKK: 'Danish Krone',
  DOP: 'Dominican Peso',
  DZD: 'Algerian Dinar',
  EGP: 'Egyptian Pound',
  ERN: 'Eritrean Nakfa',
  ETB: 'Ethiopian Birr',
  EUR: 'Euro',
  FJD: 'Fijian Dollar',
  FKP: 'Falkland Islands Pound',
  GBP: 'British Pound Sterling',
  GEL: 'Georgian Lari',
  GGP: 'Guernsey Pound',
  GHS: 'Ghanaian Cedi',
  GIP: 'Gibraltar Pound',
  GMD: 'Gambian Dalasi',
  GNF: 'Guinean Franc',
  GTQ: 'Guatemalan Quetzal',
  GYD: 'Guyanaese Dollar',
  HKD: 'Hong Kong Dollar',
  HNL: 'Honduran Lempira',
  HRK: 'Croatian Kuna',
  HTG: 'Haitian Gourde',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  IMP: 'Manx pound',
  INR: 'Indian Rupee',
  IQD: 'Iraqi Dinar',
  IRR: 'Iranian Rial',
  ISK: 'Icelandic Króna',
  JEP: 'Jersey Pound',
  JMD: 'Jamaican Dollar',
  JOD: 'Jordanian Dinar',
  JPY: 'Japanese Yen',
  KES: 'Kenyan Shilling',
  KGS: 'Kyrgystani Som',
  KHR: 'Cambodian Riel',
  KMF: 'Comorian Franc',
  KPW: 'North Korean Won',
  KRW: 'South Korean Won',
  KWD: 'Kuwaiti Dinar',
  KYD: 'Cayman Islands Dollar',
  KZT: 'Kazakhstani Tenge',
  LAK: 'Laotian Kip',
  LBP: 'Lebanese Pound',
  LKR: 'Sri Lankan Rupee',
  LRD: 'Liberian Dollar',
  LSL: 'Lesotho Loti',
  LTL: 'Lithuanian Litas',
  LVL: 'Latvian Lats',
  LYD: 'Libyan Dinar',
  MAD: 'Moroccan Dirham',
  MDL: 'Moldovan Leu',
  MGA: 'Malagasy Ariary',
  MKD: 'Macedonian Denar',
  MMK: 'Myanma Kyat',
  MNT: 'Mongolian Tugrik',
  MOP: 'Macanese Pataca',
  MRO: 'Mauritanian Ouguiya',
  MUR: 'Mauritian Rupee',
  MVR: 'Maldivian Rufiyaa',
  MWK: 'Malawian Kwacha',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  MZN: 'Mozambican Metical',
  NAD: 'Namibian Dollar',
  NGN: 'Nigerian Naira',
  NIO: 'Nicaraguan Córdoba',
  NOK: 'Norwegian Krone',
  NPR: 'Nepalese Rupee',
  NZD: 'New Zealand Dollar',
  OMR: 'Omani Rial',
  PAB: 'Panamanian Balboa',
  PEN: 'Peruvian Nuevo Sol',
  PGK: 'Papua New Guinean Kina',
  PHP: 'Philippine Peso',
  PKR: 'Pakistani Rupee',
  PLN: 'Polish Zloty',
  PYG: 'Paraguayan Guarani',
  QAR: 'Qatari Rial',
  RON: 'Romanian Leu',
  RSD: 'Serbian Dinar',
  RUB: 'Russian Ruble',
  RWF: 'Rwandan Franc',
  SAR: 'Saudi Riyal',
  SBD: 'Solomon Islands Dollar',
  SCR: 'Seychellois Rupee',
  SDG: 'Sudanese Pound',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  SHP: 'Saint Helena Pound',
  SLL: 'Sierra Leonean Leone',
  SOS: 'Somali Shilling',
  SRD: 'Surinamese Dollar',
  STD: 'São Tomé and Príncipe Dobra',
  SVC: 'Salvadoran Colón',
  SYP: 'Syrian Pound',
  SZL: 'Swazi Lilangeni',
  THB: 'Thai Baht',
  TJS: 'Tajikistani Somoni',
  TMT: 'Turkmenistani Manat',
  TND: 'Tunisian Dinar',
  TOP: 'Tongan Paʻanga',
  TRY: 'Turkish Lira',
  TTD: 'Trinidad and Tobago Dollar',
  TWD: 'New Taiwan Dollar',
  TZS: 'Tanzanian Shilling',
  UAH: 'Ukrainian Hryvnia',
  UGX: 'Ugandan Shilling',
  USD: 'United States Dollar',
  UYU: 'Uruguayan Peso',
  UZS: 'Uzbekistan Som',
  VEF: 'Venezuelan Bolívar Fuerte',
  VES: 'Sovereign Bolivar',
  VND: 'Vietnamese Dong',
  VUV: 'Vanuatu Vatu',
  WST: 'Samoan Tala',
  XAF: 'CFA Franc BEAC',
  XAG: 'Silver (troy ounce)',
  XAU: 'Gold (troy ounce)',
  XCD: 'East Caribbean Dollar',
  XDR: 'Special Drawing Rights',
  XOF: 'CFA Franc BCEAO',
  XPF: 'CFP Franc',
  YER: 'Yemeni Rial',
  ZAR: 'South African Rand',
  ZMK: 'Zambian Kwacha (pre-2013)',
  ZMW: 'Zambian Kwacha',
  ZWL: 'Zimbabwean Dollar'
}
const [conversion,setConversion] = useState({
  from: '',
  fromQuant: 0,
  to: ''
})

//creating list of separate object pairs from giant currencies object
const currencyList = Object.keys(currencies).map((key) => {
  return {
    value: key,
    label: currencies[key],
  };
});

console.log(currencyList)
async function createUser(userData) {
  /* come back here when working on services */
  /* newUser = await create <User></User> */

}
//fetch calls

useEffect(()=>{
  async function fetchConvert() {
    try {
      const data = await Services.convert()
      console.log(data)
    }catch(err){
      console.log(err)
    }
    
  }

})


function App() {

  /*   const [destination, setDestination] = useState({
      deleteCoin: false,
      buyCoin: false,
      indexCoin: false
    })
    const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: ''
    })
   */


  return (
    <>
      <h1>Choose any currency from all around the world!</h1>
      <ul>
        {currencyList.forEach(element => {
          <li key={element.value}>
            {element}
          </li>
        })}
      </ul>

      <Convert />

      {/* <SignUp userData={userData} setUserData={setUserData}/> */}
      {/* <SignOut /> */}
      <SearchCurrencies currencyList={currencyList} />
      {/* <Buttons destination={DeleteCoin} setDestination={setDestination }>Do you want to make changes to your crypto portfolio?</Buttons> */}
      {/* <About /> */}
      <Welcome />
      {/* <SignUp userData={userData} setUserData={setUserData} createUser={createUser}></SignUp> */}



    </>
  )
}

export default App
