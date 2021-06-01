import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button
} from "reactstrap";
import * as Constants from "../../constants/constants";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import Moment from "react-moment";
import CardBdy from "../../containers/CardBody/CardCoin";

class Stickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    fetch(Constants.APIURLBASE + "api/v1/coins")
      .then(response => response.json())
      .then(data => {
        //  console.log(data.coins[1].name);
        this.setState({ data: data.coins });
      })
      .catch(error => console.log(error));
  }
  myList() {
    return;
  }
  render() {
    return (
      <div className="main-container-sticker  ">
        <Row>
          {this.state.data.map(item => (
            <CardBdy item={item} />
          ))}
        </Row>
      </div>
    );
  }
}

export default Stickers;
