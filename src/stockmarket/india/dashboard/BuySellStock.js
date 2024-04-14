import React, { useState } from 'react';

const BuySellStock = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [transactionType, setTransactionType] = useState('buy');

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Implement your logic for processing the buy/sell transaction
    console.log('Symbol:', symbol);
    console.log('Quantity:', quantity);
    console.log('Transaction Type:', transactionType);
    // Add logic to perform the buy/sell action (e.g., call an API)

    // Reset the form after submission
    setSymbol('');
    setQuantity(0);
    setTransactionType('buy');
  };

  return (
    <div className="card" style={{width:'400px'}}>
      <div className="card-header">
        <h2>Buy/Sell Stocks</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="symbol" className="form-label">
              Stock Symbol:
            </label>
            <input
                type="text"
                className="form-control"
                id="symbol"
                value={symbol}
                onChange={handleSymbolChange}
                required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity:
            </label>
            <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="transactionType" className="form-label">
              Transaction Type:
            </label>
            <select
                className="form-select"
                id="transactionType"
                value={transactionType}
                onChange={handleTransactionTypeChange}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary p-2 m-2">BUY
            </button>
            <button type="submit" className="btn btn-danger p-2 m-2 ">SELL
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuySellStock;
