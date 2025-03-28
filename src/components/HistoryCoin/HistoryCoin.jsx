import { useState } from "react"
import "./HistoryCoin.css"


export default function HistoryCoin({ fetchHistory, historyData, setHistoryData }) {

    const initialState = {
        target: '', // JPY,USD,EAU 
        date: '', //YYYY-MM-DD
        symbols: '' //can have multiple divided by commas
    }
    const [historyForm, setHistoryForm] = useState(initialState)

    const [result, setResult] = useState(null);

    function handleChange(event) {
        setHistoryForm({
            ...historyForm,
            [event.target.name]: event.target.value
        })
        console.log(historyForm)
    }

    async function handleSubmit(event) {
        event.preventDefault() //no refreshing in react!
        try {
            if (!historyForm.date || !historyForm.symbols || !historyForm.target)
                throw new Error("Please fill in all fields with valid values.");
            const data = await fetchHistory(historyForm) //wait for dataservices -> backend
            setHistoryForm(data)
            setResult(data); //this is the response from Coinlayer

        } catch (err) {
            console.error(err)


        } finally {
            setHistoryForm(initialState);
        }
    }

    return (
        <>
            <h4>Historical Data:</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="target">Currency Code?</label>
                <input type="text" id="target" name="target" value={historyForm.target} onChange={handleChange} />
                <label htmlFor="date">Date YYYY-MM-DD:</label>
                <input type="text" id="date" name="date" value={historyForm.date} onChange={handleChange} />
                <label htmlFor="symbols">Coin:</label>
                <input type="text" id="symbols" name="symbols" value={historyForm.symbols} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {result && (
                <div className="json-output">
                   {/*  <pre>{JSON.stringify(result, null, 2)}</pre> {JSON.stringify(value, replacer, space) } */}
                    <ul>
                        <li> {result.symbol} </li>
                        <li> High: {result.high}</li>
                        <p>The highest exchange rate recorded for {result.symbol} on this date.</p>
                        <li> Low: {result.low}</li>
                        <p>The lowest exchange rate recorded for {result.symbol} on this date.</p>
                        <li> Volume: {result.vol}</li>
                      <p>The trading volume of {result.symbol} on this date, This represents the total amount of {result.symbol} traded.</p>
                        <li> Market cap: {result.cap}</li>
                        <p> Market capitalization is the total value of all {result.Symbol} of result on this date</p>
                        <li> Supply: {result.sup}</li>
                        <p>The total supply of {result.symbol} on that date</p>
                        <li> Change: {result.change}</li>
                        <p>The absolute change in {result.symbol}'s exchange rate from the previous day</p>
                        <li>Percent Change: {result.change_pct}</li>
                        <p>The percentage change in {result.symbol}'s exchange rate from the previous day</p>
                    </ul>
                </div>
            )}


        </>



    )


}