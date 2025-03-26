import Select from 'react-select'
import React from 'react';
import { useState } from 'react'
import App from '../../../App';

export default function SearchCurrencies({ currencyList }) {
    //currencies object passed down as prop from App.jsx
    const [selectedFiat, setSelectedFiat] = useState(null)

    /*  const currencyOptions = Object.keys(currencyList).map((key) => ({ // list of currencies dictionary
         key: key,
         value : currencies[key],
          
         
         
         //array of objects ex: AED:'United Arab Emirates Dirham'
     }));
 */
    function handleSelection(value) {
        setSelectedFiat(value)
    }

    return (
        <>
            {<Select
                options={currencyList}
                value={selectedFiat}
                onChange={handleSelection} />}

            {selectedFiat && (
                <h2>
                    You selected: {selectedFiat.label} (Key: {selectedFiat.value})
                </h2> 
                // if selectedFiat truthy (single value), returns label&value
            )}
        </>
    )

}

