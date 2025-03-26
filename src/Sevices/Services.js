
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`
// remember to use import.meta.env for react/vite front end over process.env

async function convert() { //coin to coin conversion
    try {
        const response = await fetch(BASE_URL)
        const data = await response.json() //parse json data!
        return data
    }
    catch (err) {
        console.log(err)
    }

    fromCoin = 

}