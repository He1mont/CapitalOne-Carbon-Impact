// Converter.js
import React, { useState, useEffect } from "react";

export function Converter(value, currency) {
    const [output, setOutput] = useState();

    useEffect(() => {
        const calculateOutput = async () => {
            // fetch the selected from currency rates
            const response = await fetch(
                `https://v6.exchangerate-api.com/v6/515e94b4c93a7abdfb065900/latest/${"USD"}`
            ).then((response) => response.json());
            const fetchedRates = response.conversion_rates;
            // calculate and store the result
            const CurrencyRate = fetchedRates[currency];
            const calculatedOutput = value * CurrencyRate;
            setOutput(calculatedOutput);
        };

        calculateOutput();
    }, [value, currency]); // Run the effect whenever value or currency changes

    return output;
}