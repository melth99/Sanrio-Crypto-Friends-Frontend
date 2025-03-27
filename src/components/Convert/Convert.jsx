import { useState } from "react"

export default function Convert({ fetchConvert }) {

    const initialState = {
        coinFrom: '',
        coinTo: '',
        fromQuantity: 0
    }

    const [convertData, setConvertData] = useState(initialState)

    function handleChange(event) {
        setConvertData({
            ...convertData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault() //prevents page refresh -important in react
        fetchConvert(convertData)
        setConvertData(initialState)

    }


    return (
        <>
            <h3>Lets do some crypto conversions!</h3>
            <div className="convert-form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="coin-from" >From</label>
                    <input type="text" id="coin-from" name="coinFrom" value={convertData.coinFrom} onChange={handleChange} />
                    <label htmlFor="from-quantity">How many?</label>
                    <input type="number" id="from-quantity" name="fromQuantity" value={convertData.fromQuantity} onChange={handleChange} />
                    <label htmlFor="coin-to">To</label>
                    <input type="text" id="coin-to" name="coinTo" value={convertData.coinTo} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
{/*                 {conversionResult && (
                    <div>
                        <h4>Conversion Result:</h4>
                        <pre>{JSON.stringify(conversionResult, null, 2)}</pre>
                    </div>
                )}
                {error && (
                    <div style={{ color: 'red' }}>
                        Error: {error}
                    </div>
                )} */}
            </div>


        </>



    )
}