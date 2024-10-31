import React, { useEffect, useState } from 'react';
import './CountryFetch.css';

function CountryFetch() {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const countriesData = await response.json();
                setCountries(countriesData);
            } catch (error) {
                setError('Erreur lors de la récupération du pays');
                console.error('Erreur lors de la récupération du pays:', error);
            }
        };
        
        fetchCountries();
    }, []);

    return (
        <div id="flags-container">
            {error && <p>{error}</p>}
            {countries.map((country) => (
                <div key={country.cca3} className="country">
                    <img 
                        src={country.flags.svg} 
                        alt={`Drapeau de ${country.name.common}`} 
                        className="flag"
                    />
                    <p>{country.name.common}</p>
                </div>
            ))}
        </div>
    );
}

export default CountryFetch;
