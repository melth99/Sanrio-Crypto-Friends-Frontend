import { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";





import "./HistoryCoin.css";

export default function HistoryCoin({ fetchHistory, historyData, setHistoryData, SearchCurrencies, searchQuery }) {
    const initialState = {
        target: searchQuery ? searchQuery.label : "", // efault to selected currency  JPY, USD, EUR
        date: "", // YYYY-MM-DD
        symbols: "" // Can have multiple symbols separated by commas
    };
    if (searchQuery) {
        console.log(searchQuery.label)
    }
    const [historyForm, setHistoryForm] = useState(initialState);
    const [result, setResult] = useState(null);



    useEffect(() => {
        if (searchQuery) {
            setHistoryForm((prevForm) => ({
                ...prevForm,
                target: searchQuery.label // Set target to searchQuery.label
            }));
        }
    }, [searchQuery]);

    function handleChange(event) {
        setHistoryForm({
            ...historyForm,
            [event.target.name]: event.target.value
        });
    }

    function handleDateChange(date) {
        setHistoryForm({
            ...historyForm,
            date: date.toISOString().split("T")[0]// translates to UTC & gets rid of everything after 'T' - like seconds and whatnot
        
        });
        console.log('DATE',historyForm.date)
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
    console.log('historyForm',historyForm)

    return (
        <>
            <div className="history-block">
                <h4>Historical Data:</h4>
                <form onSubmit={handleSubmit}>
                    <p><strong>Selected Currency:</strong> {searchQuery ? searchQuery.label : "None"}</p>
                    <label htmlFor="target">Currency Code?</label>
                    <input type="text" id="target" name="target" value={historyForm.target} onChange={handleChange} />

                    <label htmlFor="date">Select Date:</label>
                    <DatePicker
                        selected={historyForm.date ? new Date(historyForm.date): null} // if date in form exists, create a new instance of a date object, if not leave null
                        // converts string needed to fetch Coin data to date, used in the datepicker 
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd" // Formats the date correctly
                        placeholderText="Click to select a date"
                        maxDate={new Date()} // Prevents selecting future dates
                        showYearDropdown
                        scrollableYearDropdown
                        isClearable
                    />

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
