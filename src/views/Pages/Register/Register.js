import React, { Component } from 'react';
import * as Constants from '../../../constants/constants';
import { Link, Redirect } from 'react-router-dom';
import { Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label } from 'reactstrap';
  import axios from 'axios';
  import LandingHeader from '../../Landing/LandingHeader';
  import { createBrowserHistory } from 'history';

const history = createBrowserHistory({forceRefresh:true})

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      last_name: '',
      email: '',
      password: '',
      c_password: '',
      rfc: '',
      address: '',
      phone: '',

      errors: '',

      btnGuardar: false
    };
    this.btnGuardarChange = this.btnGuardarChange.bind(this);
    this.btnGuardarChangeFalse = this.btnGuardarChangeFalse.bind(this);
    this.saveData = this.saveData.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  btnGuardarChange() {
    this.setState({btnGuardar: true});
  }

  btnGuardarChangeFalse() {
    this.setState({btnGuardar: false});
  }

  cancel(evnt) {
    history.push(Constants.CANCELREGISTERBTN);
  }

  saveData() {

    if(this.state.name == '') {
      this.state.errors += Constants.PLEASEFILLYOURNAME;
    }
    if(this.state.last_name == '') {
      this.state.errors += Constants.PLEASEFILLYOURLASTNAME;
    }
    if(this.state.email == '') {
      this.state.errors += Constants.PLEASEFILLYOUREMAIL;
    }
    if(this.state.password == '') {
      this.state.errors += Constants.PLEASEFILLYOURPASSWORD;
    } else if(this.state.password !== this.state.c_password) {
      this.state.errors += Constants.PASSWORDSDOESNTMATCH;
    }
    if(this.state.RFC == '') {
      this.state.errors += Constants.PLEASEFILLYOURRFC;
    }
    if(this.state.address == '') {
      this.state.errors += Constants.PLEASEFILLYOURADDRESS;
    }
    if(this.state.phone == '') {
      this.state.errors += Constants.PLEASEFILLYOURPHONE;
    }

    if(this.state.errors) {
      alert(this.state.errors);
      this.state.errors = '';
      this.btnGuardarChangeFalse();
    } else {
        console.log(this.state);
        const formData = new FormData()
        formData.append('name', this.state.name);
        formData.append('last_name', this.state.last_name);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('c_password', this.state.c_password);
        formData.append('rfc', this.state.rfc);
        formData.append('address', this.state.address);
        formData.append('phone', this.state.phone);
        console.log(formData);
        
        fetch(Constants.APIURLBASE + Constants.APIV1 + Constants.REGISTER, {
          method: Constants.POST,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }, 
          body:  JSON.stringify({
            name: this.state.name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            c_password: this.state.c_password,
            rfc: this.state.rfc,
            address: this.state.address,
            phone: this.state.phone
          }),
        }).then((response) => response.json())
          .then(async (responseJson) => {
            console.log(responseJson);
            history.push(Constants.REGISTERSUCCESSBTN);
        })
        .catch(error => {
            console.log(error);
            this.btnGuardarChangeFalse();
        })
    }
    // event.preventDefault();
  }

  handleText(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const centerScreen = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center' /*centers items on the cross-axis (y by default)*/
  }

    return (
      <div className="main-container-user app" style={centerScreen}>
        <div className="container-form">
          <div className='div-twinexchange-logo-left' align='left' style={{marginBottom: 10}}>
            <img src='assets/img/twinexchange-black.svg' width='100px' style={{marginTop: 5}} />
          </div>
          <Form className="main-container-form">
            <Row form>
              <Col md={12}>
                <Form className="form">
                  <h2>Crea tu propia cuenta</h2>
                  <p className="text-muted">{Constants.TXTBEFOREREGISTRATION}</p>
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
              <Col md={6}>
                <Form className="form">
                  <Label for="exampleAddress2">RFC</Label>
                  <Input
                    type='text'
                    name='rfc'
                    id='rfc'
                    placeholder=''
                    onChange={(e)=>this.handleText(e)}
                    value={this.state.rfc}
                  />
                </Form>
              </Col>
              <Col md={6}>
                <Form className="form">
                  <Label for="exampleCity">Teléfono Móvil</Label>
                  <Input
                    type='tel'
                    name='phone'
                    id='phone'
                    placeholder=''
                    pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                    maxLength={10}
                    onChange={(e)=>this.handleText(e)}
                    value={this.state.phone}
                  />
                </Form>
              </Col>
              <Col md={6}>
                <Form className="form">
                  <Label>E-mail</Label>
                  <Input
                    className="color-input-text"
                    type='email'
                    name='email'
                    placeholder=""
                    onChange={(e)=>this.handleText(e)}
                    defaultValue={this.state.email}
                  />
                </Form>
              </Col>
              <Col md={6}>
                <Form className="form">
                  <Label>Dirección Completa</Label>
                  <Input
                    type='text'
                    name='address'
                    id='address'
                    placeholder=''
                    onChange={(e)=>this.handleText(e)}
                    value={this.state.address}
                  />
                </Form>
              </Col>
              <Col md={6}>
                <Form className="form">
                  <Label for="exampleAddress2">Contraseña</Label>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    placeholder=''
                    onChange={(e)=>this.handleText(e)}
                    value={this.state.password}
                  />
                </Form>
              </Col>
              <Col md={6}>
                <Form className="form">
                  <Label for="exampleAddress2">Confirmar Contraseña</Label>
                  <Input
                    type='password'
                    name='c_password'
                    id='c_password'
                    placeholder=''
                    onChange={(e)=>this.handleText(e)}
                    value={this.state.c_password}
                  />
                </Form>
              </Col>
            </Row>
            <div className="class-div-button">
              <Button
                onClick={() => {this.btnGuardarChange(); this.saveData();} }
                disabled={this.state.btnGuardar}
                className="button-container btn-confirmation-tw">
                Registrarse
              </Button>
            </div>
            <div className="class-div-button">
            <Button 
              onClick={event => this.cancel(event)}
              className="button-container btn-confirmation-tw">
              Cancelar
            </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
