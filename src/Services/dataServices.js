
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

// remember to use import.meta.env for react/vite front end over process.env

async function convert(coinFrom, coinTo, fromQuantity) { //coin to coin conversion
    try {
        const response = await fetch(`${BASE_URL}/convert/${coinFrom}/${coinTo}/${fromQuantity}`) //from url route outlined in backend

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json(); //parsing response from backend
        if (data.err) {
            throw new Error(data.err);
        }
        console.log(data)
        return data;

    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error
    }

}

async function history(date, target, symbols) {
    try {
      const response = await fetch(`${BASE_URL}/historical/${date}/${target}/${symbols}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json()
      console.log(data, 'services')
      return data;
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error
    }
  }







export { convert , history}