import { useState } from "react";

export default function Convert({ fetchConvert, conversion, setConversion }) {

  const initialState = {
    coinFrom: '',
    coinTo: '',
    fromQuantity: 0,
  };

  const [convertFormData, setConvertFormData] = useState(initialState);


  function handleChange(event) {
    console.log('handle change', convertFormData);
    console.log('convertform');
    setConvertFormData({
      ...convertFormData,
      [event.target.name]: event.target.value,
    });
    console.log('convertform', convertFormData);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!convertFormData.coinFrom || !convertFormData.coinTo || convertFormData.fromQuantity <= 0) {
        throw new Error("Please fill in all fields with valid values.");
      }
      console.log("Before fetchConvert:", convertFormData); // Verify convertFormData here
      const data = await fetchConvert(convertFormData);
      console.log("Conversion Result:", data);
      setConversion(data);
      setError(null); // Clear any previous error
    } catch (err) {
      console.error(err);
      setError(err.message); // Display error message
    } finally {
      setConvertFormData(initialState);
    }
  }

  return (
    <>
      <h3>Lets do some crypto conversions!</h3>
      <div className="convert-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="coin-from">From</label>
          <input type="text" id="coin-from" name="coinFrom" value={convertFormData.coinFrom} onChange={handleChange} />
          <label htmlFor="from-quantity">How many?</label>
          <input type="number" id="from-quantity" name="fromQuantity" value={convertFormData.fromQuantity} onChange={handleChange} />
          <label htmlFor="coin-to">To</label>
          <input type="text" id="coin-to" name="coinTo" value={convertFormData.coinTo} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>

        {conversion && (
          <div>
            <h4>Conversion Result:</h4>
            <pre>{JSON.stringify(conversion, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}
