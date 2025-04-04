import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';  // Assuming you have 'react-select' installed
import "./HistoryCoin.css";

export default function HistoryCoin({ fetchHistory, historyData, setHistoryData, SearchCurrencies, searchQuery, fetchList }) {
    const initialState = {
        target: searchQuery ? searchQuery.label : "", 
        date: "", 
        symbols: "" 
    };

    const [historyForm, setHistoryForm] = useState(initialState);
    const [result, setResult] = useState(null);
    const [coinsChoice, setCoinsChoice] = useState([]);

    useEffect(() => {
        if (searchQuery) {
            setHistoryForm((prevForm) => ({
                ...prevForm,
                target: searchQuery.label 
            }));
        }
    }, [searchQuery]);

    useEffect(() => {
        handleCoinSearch();
    }, []);

    async function handleCoinSearch() {
        try {
            const coinList = await fetchList();
            const coinsData = Object.values(coinList["crypto"]).map(coin => ({
                name: coin.name_full,
                symbol: coin.symbol,
                link: coin.link,
                maxSupply: coin.max_supply,
                value: coin.symbol
            }));
            setCoinsChoice(coinsData); // Now coinsChoice holds the array
        } catch (err) {
            console.error("Error fetching coinList:", err);
        }
    }

    function handleCoinSelection(coin) {
        // Handle the full selected coin object
        setHistoryForm({
            ...historyForm,
            symbols: coin.symbol // Set the symbol to the form
        });
    }

    function handleChange(event) {
        setHistoryForm({
            ...historyForm,
            [event.target.name]: event.target.value
        });
    }

    function handleDateChange(date) {
        setHistoryForm({
            ...historyForm,
            date: date.toISOString().split("T")[0]
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if (!historyForm.date || !historyForm.symbols || !historyForm.target) {
                throw new Error("Please fill in all fields with valid values.");
            }

            const data = await fetchHistory(historyForm);
            setResult(data);
            setHistoryForm(initialState);
        } catch (err) {
            console.error("Error fetching history:", err);
        }
    }

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
                        selected={historyForm.date ? new Date(historyForm.date) : null} 
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd" 
                        placeholderText="Click to select a date"
                        maxDate={new Date()} 
                        showYearDropdown
                        scrollableYearDropdown
                        isClearable
                    />

                    <label htmlFor="symbols">Coin:</label>
                    <Select
                        options={coinsChoice} // Use coinsChoice here
                        onChange={handleCoinSelection}
                        getOptionLabel={(coin) => `${coin.name} (${coin.symbol})`}
                        getOptionValue={(coin) => coin.symbol}
                        placeholder="Select a coin"
                    />

                    <button type="submit">Submit</button>
                </form>

                {result && (
                    <div className="json-output">
                        <ul>
                            <li><strong>Symbol:</strong> {result.symbol}</li>
                            {coinsChoice.length > 0 && (
                                <img 
                                    src={coinsChoice.find(coin => coin.symbol === result.symbol)?.link} 
                                    alt="coin-symbol" 
                                    width="100" 
                                    height="100" 
                                />
                            )}
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
