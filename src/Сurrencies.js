import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Currencies.css";

export default function Currencies(props) {
  console.log(props);
  if (props.data) {
    return (
      <div className="Currencies">
        <Container className="fluid">
          <Row>
            {props.data.map(function (currency, index) {
              return (
                <Col key={index}>
                  <div className="currency-body">
                    <div className="course-item-title">{currency.name}</div>
                    <span className="course-item-value">
                      {parseFloat(currency.buy).toFixed(2)}
                    </span>
                    <span className="ps-3 pe-3 course-item-value">/</span>
                    <span className="course-item-value">
                      {parseFloat(currency.sale).toFixed(2)}
                    </span>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  } else {
    return null;
  }
}
