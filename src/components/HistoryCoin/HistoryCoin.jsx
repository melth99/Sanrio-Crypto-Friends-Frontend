import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';  // Assuming you have 'react-select' installed
import "./HistoryCoin.css";

export default function HistoryCoin({ fetchHistory, historyData, setHistoryData, SearchCurrencies, searchQuery, fetchList, currencyList, setSearchQuery }) {
    const initialState = {
        target: searchQuery ? searchQuery.label : "",
        date: "",
        symbols: ""
    };

    const [historyForm, setHistoryForm] = useState(initialState);
    const [result, setResult] = useState(null);
    const [coinsChoice, setCoinsChoice] = useState([]);
    const [selectedFiat, setSelectedFiat] = useState(null);

    const currencyOptions = Object.keys(currencyList.fiat).map((key) => ({
        label: key,
        value: currencyList.fiat[key],
    }));

    function handleSelection(value) {
        setSelectedFiat(value);
        setSearchQuery(value);
    }

    useEffect(() => {
        if (searchQuery) {
            setHistoryForm((prevForm) => ({
                ...prevForm,
                target: searchQuery.label,
            }));
            setSelectedFiat(searchQuery);
        }
    }, [searchQuery]);

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

    function handleCoinSelection(coin) {
        setHistoryForm({
            ...historyForm,
            symbols: coin.symbol,
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
        <div className="history-block">
     
            <form className="history-form" onSubmit={handleSubmit}>
            <h2>Historical Data:</h2>
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
                <label htmlFor="fiat">Select Fiat Currency:</label>
                <Select className="selection"
                    options={currencyOptions}
                    value={selectedFiat}
                    onChange={handleSelection}
                    getOptionLabel={(option) => `${option.label} - ${option.value}`}
                />
                <label htmlFor="symbols">Coin:</label>
                <Select className="selection"
                    options={coinsChoice}
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
                                src={coinsChoice.find(coin => coin.symbol === result.symbol)?.link || 'default-image-url.jpg'}
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
    );
}
