import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const convertCurrency = () => {
    setLoading(true);

    fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${selectedCurrency}/?format=json`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[0].mid;
        const convertedAmount = (amount * rate).toFixed(2);
        setResult(`${amount} ${selectedCurrency} to ${convertedAmount} PLN`);
      })
      .catch((error) => {
        setResult('Błąd podczas pobierania kursu waluty.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App" >
      
      <main>
        <div className="container">
          <div className="currency-container">
          <header className="App-header">
        <h1>Przelicznik walut</h1>
      </header>
            <label htmlFor="currency">Wybierz walutę:</label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              <option value="EUR">Euro (EUR)</option>
              <option value="USD">Dolary amerykańskie (USD)</option>
              <option value="CHF">Franki szwajcarskie (CHF)</option>
            </select>
          </div>

          <div className="amount-container">
            <label htmlFor="amount">Wprowadź kwotę:</label>
            <input
              type="number"
              placeholder="Kwota"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="loader-container">
            <button id="convertButton" onClick={convertCurrency}>
              Przelicz
            </button>
            {loading && <div className="loader">Loading...</div>}
            <div className="result">{result}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;