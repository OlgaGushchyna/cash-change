import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Calculator.css";

export default function Calculator(props) {
  let [give, setGive] = useState(100);
  let [take, setTake] = useState(0);
  let [giveCurr, setGiveCurr] = useState("EUR");
  let [takeCurr, setTakeCurr] = useState("UAH");
  let [nameChangeOperation, setNameChangeOperation] = useState([
    "Отдаю:",
    "Получаю:",
  ]);

  useEffect(() => {
    countCurrencies();
  }, [props.data]);

  useEffect(() => {
    countCurrencies();
  }, [nameChangeOperation]);

  useEffect(() => {
    countCurrencies();
  }, [give]);

  useEffect(() => {
    countCurrencies();
  }, [giveCurr]);

  useEffect(() => {
    countCurrencies();
  }, [takeCurr]);

  //function handleSubmit(event) {
  //  event.preventDefault();
  //  let giveSum = event.target.value;
  // setGive(event.target.value);
  //  countCurrencies(giveSum, "EUR", -1, "UAH");
  //  console.log(giveSum + "  ");
  //}

  //function handleSubmit2(event) {
  //  event.preventDefault();
  //  console.log("Hello2");
  // }

  function onChangeOperation(event) {
    event.preventDefault();
    let temp = [nameChangeOperation[1], nameChangeOperation[0]];
    setNameChangeOperation(temp);
  }

  function giveChange(event) {
    event.preventDefault();
    setGive(event.target.value);
    countCurrencies();
  }

  function giveCurrChange(event) {
    event.preventDefault();
    setGiveCurr(event.target.value);
    countCurrencies();
  }

  //function takeChange(event) {
  //  event.preventDefault();
  //  console.log(event.target.value);

  //   setTake(event.target.value);
  //   setIsGive(false);
  //   countCurrencies(event.target.value, giveCurr, takeCurr, isGive);
  // }

  function takeCurrChange(event) {
    event.preventDefault();
    setTakeCurr(event.target.value);
    countCurrencies();
  }

  function countCurrencies() {
    if (props.data === null) return null;
    if (giveCurr === takeCurr) {
      setTake(give);
      return;
    }

    if (nameChangeOperation[0] === "Отдаю:") {
      isGive();
    } else {
      isTake();
    }
  }

  function isGive() {
    let rezult = 0;
    switch (giveCurr) {
      case "USD":
        if (takeCurr === "UAH") {
          rezult = (give * props.data[0].buy).toFixed(2);
        }
        if (takeCurr === "EUR") {
          rezult = ((give * props.data[0].buy) / props.data[1].sale).toFixed(2);
        }
        break;
      case "EUR":
        if (takeCurr === "UAH") {
          rezult = (give * props.data[1].buy).toFixed(2);
        }
        if (takeCurr === "USD") {
          rezult = ((give * props.data[1].buy) / props.data[0].sale).toFixed(2);
        }
        break;
      case "UAH":
        if (takeCurr === "USD") {
          rezult = (give / props.data[0].sale).toFixed(2);
        }
        if (takeCurr === "EUR") {
          rezult = (give / props.data[1].sale).toFixed(2);
        }
        break;
      default:
      // code block
    }
    setTake(rezult);
    console.log("give: " + give);
    console.log(rezult);
  }

  function isTake() {
    let rezult2 = 0;
    switch (takeCurr) {
      case "USD":
        if (giveCurr === "UAH") {
          rezult2 = (give / props.data[0].buy).toFixed(2);
          console.log("USD = UAH " + rezult2);
        }
        if (giveCurr === "EUR") {
          rezult2 = ((give * props.data[1].sale) / props.data[0].buy).toFixed(
            2
          );
        }
        break;
      case "EUR":
        if (giveCurr === "UAH") {
          rezult2 = (give / props.data[1].buy).toFixed(2);
        }
        if (giveCurr === "USD") {
          rezult2 = ((give * props.data[0].sale) / props.data[1].buy).toFixed(
            2
          );
        }
        break;
      case "UAH":
        if (giveCurr === "USD") {
          rezult2 = (give * props.data[0].sale).toFixed(2);
        }
        if (giveCurr === "EUR") {
          rezult2 = (give * props.data[1].sale).toFixed(2);
        }
        break;
      default:
      // code block
    }
    setTake(rezult2);
    console.log("take: " + give);
    console.log(rezult2);
  }

  return (
    <div className="Calculator">
      <Container className="fluid">
        <Row className="mb-3">
          <Col className="activeChange">{nameChangeOperation[0]}</Col>
          <Col>
            <button onClick={onChangeOperation}>Change</button>
          </Col>
          <Col className="pasiveChange">{nameChangeOperation[1]}</Col>
        </Row>
        <Row>
          <Col>
            <form className="row pe-2 ps-2">
              <input
                type="number"
                placeholder={give}
                className="col-8"
                onChange={giveChange}
              />

              <select
                value={giveCurr}
                className="curr-give col-4"
                onChange={giveCurrChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="UAH">UAH</option>
              </select>
            </form>
          </Col>

          <Col>
            <form className="row pe-2 ps-2">
              <input
                text="number"
                value={take}
                className="col-8"
                disabled="disabled"
              />
              <select
                value={takeCurr}
                className="curr-take col-4"
                onChange={takeCurrChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="UAH">UAH</option>
              </select>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
