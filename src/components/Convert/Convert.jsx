import { useState } from "react";
import Select from "react-select";
import { useEffect } from "react";
export default function Convert({ fetchConvert, conversion, setConversion, fetchList }) {
  const [toggle, setToggle] = useState(false)
  const [coinsChoice, setCoinsChoice] = useState([]);
  const [size, setSize] = useState(100)

  function handleClick() {
    console.log('convert clicked!')
    setToggle(!toggle)
    
  }
  const initialState = {
    coinFrom: "",
    coinTo: "",
    fromQuantity: 0,
  };


  const [convertFormData, setConvertFormData] = useState(initialState);
  const [error, setError] = useState(null); // Add error state

  function handleChange(event) {
    const { name, value } = event.target;

    setConvertFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault(); //no refreshing in react
    try {
      if (!convertFormData.coinFrom || !convertFormData.coinTo || convertFormData.fromQuantity <= 0) {
        throw new Error("Please fill in all fields with valid values.");
      }

      //console.log("Before fetchConvert:", convertFormData);
      const data = await fetchConvert(convertFormData);
      //console.log("Conversion Result:", data);

      setConversion(data); //updating wiht data from backend
      setError(null); // Clear errors if successful
      setConvertFormData(initialState); // Resets form AFTER updating state
    } catch (err) {
      console.error(err);
      setError(err.message); // Display error message
    }
  }

  useEffect(() => {
    async function fetchCoins() {
        try {
            const coinList = await fetchList();
            const coinsData = Object.values(coinList["crypto"]).map(coin => ({
                name: coin.name_full,
                symbol: coin.symbol,
                link: coin.icon_url,
                maxSupply: coin.max_supply,
                value: coin.symbol
            }));
            setCoinsChoice(coinsData);
        } catch (err) {
            console.error("Error fetching coin data:", err);
        }
    }
    fetchCoins();
}, []);

useEffect(() => {
  console.log('Updated coinsChoice:', coinsChoice);
}, [coinsChoice]);

function handleCoinSelectionFrom(coin) {
  setConvertFormData({
      ...convertFormData,
      coinFrom: coin.symbol,
    
  });
}

function handleCoinSelectionTo(coin) {
  setConvertFormData({
      ...convertFormData,
      coinTo: coin.symbol
  });
}
  return (
    <>
      <div className="all-convert">

      <div className="clicking" onClick={handleClick}>
       
        <button>Click Here!</button>
        </div>
        <h2 className="mini-header">Coin Trading</h2>
        {!toggle ? ( //conditional for form expansion absed on toggle state
         /*  <div className="pre-toggle"> */
<div>
            <p>Let's see how coins differ in value</p>
            {/*      <button onClick={() => setToggle(true)}>Go to Converter</button> */}
          </div>
        ) : (
          <div className="expand">
            <div className="convert-form">


              <h3>Let's do some crypto conversions!</h3>

              <form onSubmit={handleSubmit}>


              <label htmlFor="coin-from">Coin:</label>
                <Select
                    options={coinsChoice}
                    onChange={handleCoinSelectionFrom}
                    getOptionLabel={(coin) => `${coin.name} (${coin.symbol})`}
                    getOptionValue={(coin) => coin.symbol}
                    placeholder="Select a coin"
                />

                <label htmlFor="from-quantity">How many?</label>
                <input
                  type="number"
                  id="from-quantity"
                  name="fromQuantity"
                  value={convertFormData.fromQuantity}
                  onChange={handleChange}
                />

                <label htmlFor="coin-to">To</label>
                <Select
                    options={coinsChoice}
                    onChange={handleCoinSelectionTo}
                    getOptionLabel={(coin) => `${coin.name} (${coin.symbol})`}
                    getOptionValue={(coin) => coin.symbol}
                    placeholder="Select a coin"
                />

                <button type="submit">Submit</button>
              </form>
              <button onClick={() => setToggle(false)}>Back</button>
              {error && <p className="error">{error}</p>}

              {conversion && (
                <div>
                  <h4>Conversion Result:</h4>
                  <div className="json-output">
                    <ul>
                      <li>
                        <strong>Rate:</strong> {conversion.rate}
                      </li>
                      <li>
                        <strong>Ratio:</strong> {conversion.result} {conversion.to} = {conversion.amount} {conversion.from}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
        }
      </div>
   
    </>
  );
}