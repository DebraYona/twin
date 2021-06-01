import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  Input
} from "reactstrap";
import logo from "../../assets/img/brand/paisaje.jpeg";
import user from "../../assets/img/brand/user.png";
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      email: '',
      name: '',
      last_name: '',
      address: '',
      rfc: '',
      phone: ''
    };
    this.handleText = this.handleText.bind(this);
  }

  handleText(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  componentWillMount() {
    const userId = localStorage.getItem("userId");
    fetch(Constants.APIURLBASE + 
          Constants.APIV1 + 
          Constants.SLASH + 
          Constants.USERS + 
          Constants.SLASH + userId)
      .then(response => response.json())
      .then(data => {
        this.setState({
          email: data.user.email,
          name: data.user.name,
          last_name: data.user.last_name,
          rfc: data.user.rfc,
          address: data.user.address,
          phone: data.user.phone
        });
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  sendPost(e) {
    console.log(this.state);
    const userId = localStorage.getItem("userId");
    fetch(Constants.APIURLBASE + 
          Constants.APIV1 + 
          Constants.SLASH + 
          Constants.USERS + 
          Constants.SLASH + userId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        last_name: this.state.last_name,
        rfc: this.state.rfc,
        address: this.state.address,
        phone: this.state.phone
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="main-container-user">
        <div className="container-form">
          <Form className="main-container-form">
            <Row form>
              <Col xs="6" sm="6"md="12">
                <Form className="form">
                  <Label>E-mail: <span className='user-email-label'>{this.state.email}</span></Label>
                </Form>
              </Col>
              <Col md={6}>
                <Form className="form">
                  <Label>Nombre</Label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    onChange={(e)=>this.handleText(e)}
                    value={this.state.name}
                  />
                </Form>
              </Col>
              <Col md={6}>
                <Form className="form">
                  <Label>Apellidos</Label>
                  <Input
                    type='text'
                    name='last_name'
                    id='last_name'
                    onChange={(e)=>this.handleText(e)}
                    value={this.state.last_name}
                  />
                </Form>
              </Col>
            </Row>
            <Form className="form">
              <Label>Dirección Completa</Label>
              <Input
                type="text"
                name='address'
                id='address'
                onChange={(e)=>this.handleText(e)}
                value={this.state.address}
              />
            </Form>
            <Form className="form">
              <Label for="exampleAddress2">RFC</Label>
              <Input
                type="text"
                name='rfc'
                id='rfc'
                onChange={(e)=>this.handleText(e)}
                value={this.state.rfc}
              />
            </Form>
            <Row form>
              <Col md={6}>
                <Form className="form">
                  <Label for="exampleCity">Teléfono Móvil</Label>
                  <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    maxLength={10}
                    onChange={(e)=>this.handleText(e)}
                    value={this.state.phone}
                  />
                </Form>
              </Col>
            </Row>
            <div className="class-div-button">
              <Button
                onClick={event => this.sendPost(event)}
                className="button-container btn-confirmation-tw">
                Guardar
              </Button>
            </div>
          </Form>
        </div>
        {
        // <div className="animated fadeIn">
        //   <Row>
        //     <Col xl={4}>
        //       <Card
        //         style={{ width: "18rem" }}
        //         className="text-center style-container-card"
        //       >
        //         <CardImg
        //           top
        //           width="100%"
        //           src={logo}
        //           alt="Card image cap"
        //           className="haven"
        //         />
        //         <CardImg
        //           src={user}
        //           className="rounded-circle2 eye"
        //           alt="200x200"
        //         />
        //         <CardBody>
        //           <CardTitle className="style-text-card">Card title</CardTitle>
        //           <CardSubtitle>Card subtitle</CardSubtitle>
        //           <CardText>
        //             Some quick example text to build on the card title and make
        //             up the bulk of the card's content.
        //           </CardText>
        //           <CardFooter className="container-rsi">
        //             <i className="icon-social-facebook icons font-2xl d-block mt-4 space-rs-face"></i>
        //             <i className="icon-social-twitter icons font-2xl d-block mt-4 space-rsi"></i>
        //             <i className="icon-social-linkedin icons font-2xl d-block mt-4"></i>
        //           </CardFooter>
        //         </CardBody>
        //       </Card>
        //     </Col>
        //   </Row>
        // </div>
        }
      </div>
    );
  }
}

export default Users;
