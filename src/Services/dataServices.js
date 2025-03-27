
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`
// remember to use import.meta.env for react/vite front end over process.env

async function convert(coinFrom, coinTo, fromQuantity) { //coin to coin conversion
    try {
        const response = await fetch(`${BASE_URL}/convert/${coinFrom}/${coinTo}/${fromQuantity}`)
        //parse json data!
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json(); //parsing response from backend
        if (data.err) {
            throw new Error(data.err);
        }
        return data;
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error
    }

}


export { convert }