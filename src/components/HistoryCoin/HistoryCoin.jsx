import { useState } from "react"


export default function HistoryCoin({fetchHistory, historyData, setHistoryData}) {

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
            const data = await fetchHistory(historyForm)
            setHistoryForm(data)
            setResult(data); //response from Coinlayer

        } catch (err) {
            console.error(err)


        } finally {
            setHistoryForm(initialState);
        }
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="target">Fiat/Currency?(USD default)</label>
                <input type="text" id="target" name="target" value={historyForm.target} onChange={handleChange} />
                <label htmlFor="date">Date YYYY-MM-DD:</label>
                <input type="text" id="date" name="date" value={historyForm.date} onChange={handleChange} />
                <label htmlFor="symbols">Coins: (if more than one separate by commas)</label>
                <input type="text" id="symbols" name="symbols" value={historyForm.symbols} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {historyData && (
                <div>
                    <h4>Historical Data:</h4>
                    <pre>{JSON.stringify(result, null, 2)}</pre> {/* JSON.stringify(value, replacer, space) */}
                </div>
            )}


        </>



    )


}