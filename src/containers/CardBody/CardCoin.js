import React, { Component } from "react";
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

class CardCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.item,
      datas: this.props.coins
    };
  }
  render() {
    return (
      <Card className="container-card-style" sm="7">
        <CardBody>
          <CardHeader>{this.state.data.name}</CardHeader>
          <br></br>
          <CardSubtitle>
            <Label className="lavel-space ">{this.state.data.symbol}</Label>
            <Label className="color-tags ">{this.state.data.tags}</Label>
          </CardSubtitle>
        </CardBody>
        <CardBody>
          <CardText>Some qu</CardText>
          <CardBody>
            <Label className="label-space-between">
              <a className="a-color"> Precio:</a>
              <a> {this.state.data.quote.USD.price}</a>
            </Label>
            <br />
            <Label className="label-space-between">
              <a className="a-color">Ultima Actualización:</a>
              <a> {this.state.data.quote.USD.last_updated}</a>
            </Label>
            <br />
            <Label className="label-space-between">
              <a className="a-color">Tapa del mercado:</a>
              <a>{this.state.data.quote.USD.market_cap} </a>
            </Label>
            <br />
            <Label className="label-space-between" >
              <a className="a-color">Suministro circulante:</a>
              <a> {this.state.data.circulating_supply} </a>
            </Label>
            <br />
            <Label className="label-space-between">
              <a className="a-color">Cambio porcentual 24h:</a>
              <a>{this.state.data.quote.USD.percent_change_24h}</a>
              <a>{this.state.data.symbol}</a>
            </Label>
          </CardBody>
        </CardBody>
      </Card>
    );
  }
}

export default CardCoin;
