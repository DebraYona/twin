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
import logo from "../../assets/img/brand/images/adnclinica.jpeg";
import { flexibleCompare } from "@fullcalendar/core";

class CardDir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.item,
      img: this.props.img
    };
  }
  componentDidMount() {
    // console.log(this.props.item.business_name)
  }

  render() {
    return (
    
      <div className="main-container-space">
        <div className="container-card-dir-component">
          <div className="container-flex">
            <div className="image-zise">
              <div className="div-img-style">
                <img
                  left
                  width="100%"
                  src={this.state.img}
                  alt="Card image cap"
                />
              </div>
            </div>
            <div className="display-text ">
              <CardHeader>{this.state.data.business_name}</CardHeader>
              <ul className="style-ul">
                <li className="style-ul-style">
                  <img
                    className="img-style"
                    width={"25px"}
                    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcreate-react-app.dev%2Fdocs%2Fadding-images-fonts-and-files%2F&psig=AOvVaw3tdWNaWA_Nq--d_ki5ftNH&ust=1589746435976000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiegpCZuekCFQAAAAAdAAAAABAD"
                    alt="Hogar"
                  />

                  <a> {this.state.data.sections.name} </a>
                </li>
                <li>
                  <img
                    className="img-style"
                    width={"25px"}
                    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcreate-react-app.dev%2Fdocs%2Fadding-images-fonts-and-files%2F&psig=AOvVaw3tdWNaWA_Nq--d_ki5ftNH&ust=1589746435976000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiegpCZuekCFQAAAAAdAAAAABAD"
                    alt="Hogar"
                  />
                  <a> Proveedor Certificado </a>
                </li>
                <li>
                  <img
                    className="img-style"
                    width={"25px"}
                    src="https://twinchat.com.mx/images/icons/i_mundo.svg"
                    alt="Hogar"
                  />
                  <a className="style-ul-space "> Proveedor Internacional </a>
                </li>
                <li>
                  <img
                    className="img-style"
                    width={"25px"}
                    src="https://api.twinchat.com.mx/storage/countries/b_mexico.jpg"
                    alt="Hogar"
                  />
                  <a className="style-ul-space "> {this.state.data.address1} </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardDir;
