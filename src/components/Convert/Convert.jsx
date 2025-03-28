import { useState } from "react";

export default function Convert({ fetchConvert, conversion, setConversion }) {
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
    event.preventDefault();
    try {
      if (!convertFormData.coinFrom || !convertFormData.coinTo || convertFormData.fromQuantity <= 0) {
        throw new Error("Please fill in all fields with valid values.");
      }

      console.log("Before fetchConvert:", convertFormData);
      const data = await fetchConvert(convertFormData);
      console.log("Conversion Result:", data);
      
      setConversion(data);
      setError(null); // Clear errors if successful
      setConvertFormData(initialState); // Resets form AFTER updating state
    } catch (err) {
      console.error(err);
      setError(err.message); // Display error message
    }
  }

  return (
    <div className="convert-form">
      <h3>Let's do some crypto conversions!</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="coin-from">From</label>
        <input type="text" id="coin-from" name="coinFrom" value={convertFormData.coinFrom} onChange={handleChange} />

        <label htmlFor="from-quantity">How many?</label>
        <input type="number" id="from-quantity" name="fromQuantity" value={convertFormData.fromQuantity} onChange={handleChange} />

        <label htmlFor="coin-to">To</label>
        <input type="text" id="coin-to" name="coinTo" value={convertFormData.coinTo} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>

      {error && <p className="error">{error}</p>} 

      {conversion && (
        <div>
          <h4>Conversion Result:</h4>
          <div className="json-output">
            <ul>
              <li><strong>Rate:</strong> {conversion.rate}</li>
              <li>
                <strong> Ratio: </strong>{conversion.result} {conversion.to} = {conversion.amount} {conversion.from}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
