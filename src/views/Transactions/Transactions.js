import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Constants from "../../constants/constants";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import { createBrowserHistory } from "history";
import TableHistory from "../../containers/TableBody/TableHistory";

const history = createBrowserHistory({ forceRefresh: true });

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      balance: "",
      withDrawVal: "",
      value: "",
      destiny: "",
      cant: "",
      coin: "",
      amount: "",
      history: ""
    };
    this.handleInputFound = this.handleInputFound.bind(this);
    this.getTrade = this.getTrade.bind(this);
    this.getFound = this.getFound.bind(this);
    this.getWithdraw = this.getWithdraw.bind(this);
    this.handleDestiny = this.handleDestiny.bind(this);
    this.getTrans = this.getTrans.bind(this);
    this.handleCant = this.handleCant.bind(this);
    this.handleShowWith = this.handleShowWith.bind(this);
    this.handleInputAmount = this.handleInputAmount.bind(this);
    this.handleInputTrade = this.handleInputTrade.bind(this);
  }

  handleInputFound(event) {
    this.setState({ fundValue: event.target.value });
  }

  handleInputTrade(event) {
    this.setState({ coin: event.target.value });
    console.log(event.target.value);
  }
  handleInputAmount(event) {
    this.setState({ amount: event.target.value });
    console.log(event.target.value);
  }
  getFound(event) {
    console.log("get found");
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    fetch(Constants.APIURLBASE + "api/v1/fund", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: this.state.fundValue,
        user_id: userId
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ setShow: false });
        //window.location.reload();
      })
      .catch(error => console.log(error));
  }

  getTrade(event) {
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    console.log(this.state.amount);

    fetch(Constants.APIURLBASE + "api/v1/fund", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: this.state.amount,
        user_id: userId,
        coin: this.state.coin
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        //window.location.reload();
      })
      .catch(error => console.log(error));
  }

  handleShowWith(event) {
    this.setState({ withDrawVal: event.target.value });
  }

  getWithdraw(event) {
    const userId = localStorage.getItem("userId");
    event.preventDefault();
    fetch(Constants.APIURLBASE + "api/v1/withdraw", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: this.state.withDrawVal,
        user_id: userId
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ withDrawVal: false });
        window.location.reload();
      })
      .catch(error => console.log(error));
  }

  getTrans(event) {
    const userId = localStorage.getItem("userId");
    console.log(this.state.cant, this.state.destiny);

    fetch(Constants.APIURLBASE + "api/v1/transfer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: userId,
        to: this.state.destiny,
        amount: this.state.cant
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ transferVal: false });
        // window.location.reload();
      })
      .catch(error => console.log(error));
    event.preventDefault();
  }

  handleDestiny(event) {
    console.log(event.target.value);
    this.setState({ destiny: event.target.value });
  }

  handleCant(event) {
    console.log(event.target.cant);
    this.setState({ cant: event.target.value });
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    fetch(Constants.APIURLBASE + `/api/v1/history/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ history: data });
        console.log(this.state.history);
        localStorage.setItem('history', JSON.stringify(data));
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="main-container-table">
          <Label className="label-title-history">
            <h3> Historial de movimientos</h3>
          </Label>
        </div>
        <TableHistory item={this.state.history} />
      </div>
    );
  }
}

export default Transactions;
