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
  Row } from 'reactstrap';
  import axios from 'axios';
  import logo from '../../../assets/img/brand/twinexchange-black.svg';

class RegisterSuccess extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const centerScreen = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center' /*centers items on the cross-axis (y by default)*/
    }

    return (
        <div className="app flex-row align-items-center" style={centerScreen}>
            <Container>
                <Row className="justify-content-center">
                    <img src={logo} style={{marginBottom: 10}} />
                </Row>
                <Row className="justify-content-center">
                  <p className='white-font'>
                      Su información ha sido recibida, favor de revisar su correo.
                  </p>
                </Row>
                <Row className="justify-content-center">
                  <p className='white-font'>
                    Twinexchange
                  </p>
                </Row>
                <Row className="justify-content-center">
                    <Link to="/">
                        <Button color="primary">Regresar a la pagina principal</Button>
                    </Link>
                </Row>
            </Container>
        </div>
    );
  }
}

export default RegisterSuccess;
