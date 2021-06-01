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
import Cards from "../../containers/CardBody/CardDir";
import Moment from "react-moment";
//import Map from "../../../src/views/DayRoute/MapView";
import Map from "../Mapjs/goMaps";

//const UrlMap = `https://maps.googlepis.com/maps/apoi/js?v=3.exp&key=${Constants.APIKEYMAPS}`;
const UrlMap =  `https://maps.googleapis.com/maps/api/staticmap?key=${Constants.APIKEYMAPS}&center=47.65,-122.35&zoom=12&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=480x360`
class EnterpriseDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      img: "",
    };
  }

  componentDidMount() {
    console.log('web1: ', Constants.APITWINCHATURLBASE + 
        Constants.APIV1 + 
        Constants.SLASH + 
        Constants.WEB1 +
        Constants.BUSINESS_DIRECTORY)
    fetch(Constants.APITWINCHATURLBASE + 
        Constants.APIV1 + 
        Constants.SLASH + 
        Constants.WEB1 +
        Constants.BUSINESS_DIRECTORY)
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        this.setState({
          data: data.data
        });
      })
      .catch(error => console.log(error));
  }
 
  render() {
    return (
      <div>
        <div className="container-card-dir">
          {this.state.data.map(item => (
            <Cards item={item} img={item.logo.url} />
          ))}
        </div>
        <Map/>
      </div>
    );
  }
}

export default EnterpriseDirectory;
