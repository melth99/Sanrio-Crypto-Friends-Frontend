import Select from 'react-select'
import React from 'react';
import { useState } from 'react'


export default function SearchCurrencies({ currencyList, setSearchQuery }) {
    //currencies object passed down as prop from App.jsx
    const [selectedFiat, setSelectedFiat] = useState(null) //selected currency


    const currencyOptions = Object.keys(currencyList.fiat).map((key) => ({ // list of currencies dictionary
        label: key,
        value: currencyList.fiat[key],
    }));

    function handleSelection(value) {
        setSelectedFiat(value)
        setSearchQuery(value)
    }

    return (
        <>
        <div className='searching'>
            <Select /* creates drop down menu */
                options={currencyOptions}
                value={selectedFiat}
                onChange={handleSelection}
                getOptionLabel={(option) => `${option.label} - ${option.value}`}

           
            />

            {selectedFiat && (
                <h2>
                    You selected: {selectedFiat.label} {selectedFiat.value}
                </h2>
                // if selectedFiat truthy (single value), returns label&value
            )}
            </div>
        </>
    )

}

