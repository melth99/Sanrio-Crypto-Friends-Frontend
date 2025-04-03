import { useState } from "react";
import "./HistoryCoin.css";

export default function HistoryCoin({ fetchHistory, historyData, setHistoryData }) {
    const initialState = {
        target: "", // JPY, USD, EUR
        date: "", // YYYY-MM-DD
        symbols: "" // Can have multiple symbols separated by commas
    };

    const [historyForm, setHistoryForm] = useState(initialState);
    const [result, setResult] = useState(null);

    function handleChange(event) {
        setHistoryForm({
            ...historyForm,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent page refresh

        try {
            if (!historyForm.date || !historyForm.symbols || !historyForm.target) {
                throw new Error("Please fill in all fields with valid values.");
            }

            const data = await fetchHistory(historyForm); // Fetch data from API
            setResult(data); // Store response in state
            setHistoryForm(initialState); // Reset form after submission
        } catch (err) {
            console.error("Error fetching history:", err);
        }
    }

    return (
        <>
        <div className="history-block">
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
                    {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
                    <ul>
                        <li><strong>Symbol:</strong> {result.symbol}</li>
                        <li><strong>High:</strong> {result.high}</li>
                        <p>The highest exchange rate recorded for {result.symbol} on this date.</p>

                        <li><strong>Low:</strong> {result.low}</li>
                        <p>The lowest exchange rate recorded for {result.symbol} on this date.</p>

                        <li><strong>Volume:</strong> {result.vol}</li>
                        <p>The trading volume of {result.symbol} on this date. This represents the total amount of {result.symbol} traded.</p>

                        <li><strong>Market Cap:</strong> {result.cap}</li>
                        <p>Market capitalization is the total value of all {result.symbol} on this date.</p>

                        <li><strong>Supply:</strong> {result.sup}</li>
                        <p>The total supply of {result.symbol} on that date.</p>

                        <li><strong>Change:</strong> {result.change}</li>
                        <p>The absolute change in {result.symbol}'s exchange rate from the previous day.</p>

                        <li><strong>Percent Change:</strong> {result.change_pct}</li>
                        <p>The percentage change in {result.symbol}'s exchange rate from the previous day.</p>
                    </ul>
                </div>
            )}
            </div>
        </>
    );
}
