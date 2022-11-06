import React, { useState, useEffect } from "react";
import axios from "axios";
import Currencies from "./Сurrencies";
import Calculator from "./Сalculator";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  let [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
      );

      let dataCurrency = [];
      let i = 0;
      result.data.map(function (currency) {
        if (currency.ccy === "USD" || currency.ccy === "EUR") {
          let buyTemp = parseFloat(currency.buy).toFixed(2);
          let saleTemp = parseFloat(currency.sale).toFixed(2);
          dataCurrency[i] = {
            name: currency.ccy,
            buy: buyTemp,
            sale: saleTemp,
          };
          i++;
        }
        return null;
      });
      setCurrencies(dataCurrency);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <section>
            <h1 className="mb-3">Курс валют к гривне </h1>
            <Currencies data={currencies} />
          </section>
          <section>
            <h3>Калькулятор валют</h3>
            <Calculator data={currencies} />
          </section>
        </header>
      </div>
    </div>
  );
}
