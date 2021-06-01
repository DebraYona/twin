import React, { Component, Suspense } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import * as Constants from '../../constants/constants';
import logo from '../../assets/img/brand/twinexchange.png'
import mobileIntroLogo from '../../assets/img/brand/landing_mobile_logo.png';
import logoLightBlue from '../../assets/img/brand/logo_redi_clean_blue.png';
import googleplaybutton from '../../assets/img/brand/googleplaybutton.png';

import { Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row } from 'reactstrap';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

const LandingHeader = React.lazy(() => import('./LandingHeader'));
const LandingFooter = React.lazy(() => import('./LandingFooter'));

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  handleSubmit(event) {
    fetch(Constants.APIURLBASE + 'login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        if(responseJson.token) {
          await localStorage.setItem('token', JSON.stringify(responseJson.data));
          this.props.history.push('/dashboard');
        } else {
           alert('Usuario o Contraseña incorrecto.');
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="app">
        <Suspense fallback={this.loading()}>
          <LandingHeader onLogout={e=>this.signOut(e)}/>
        </Suspense>
        
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col>
                  <img src={mobileIntroLogo} style={{ width: 'auto', height: '700px', alt: 'REDI Logo'}} align='left' />
                  <img src={logoLightBlue} style={{ width: 'auto', height: '200px', alt: 'REDI Logo'}} align='left' />
                  <h1 style={{ 'color': '#4A90E2', 'marginLeft': '50px', 'fontWeight': 'bold' }}>Bienvenidos</h1>
                  <h2 style={{ 'color': '#4A90E2', 'marginLeft': '50px', 'fontWeight': 'bold' }}>Residuos</h2>
                  <h2 style={{ 'color': '#4A4A4A', 'marginLeft': '50px', 'fontWeight': 'bold' }}>Digitales</h2>
                  <br /><br /><br /><br /><br /><br /><br /><br />
                  <img src={googleplaybutton} style={{ width: 'auto', height: '150px', alt: 'REDI Logo'}} align='left' />
              </Col>
            </Row>
          </Container>
        </div>
        <AppFooter>
          <LandingFooter />
        </AppFooter>
      </div>
    );
  }
}

export default Landing;

