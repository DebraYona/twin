import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../../../constants/constants';
import logo from '../../../assets/img/brand/twinexchange-black.svg';
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
  // import { createBrowserHistory } from 'history';

// const history = createBrowserHistory({forceRefresh: true})

class Login extends Component {

  constructor(props) {
    super(props);
    // this._isMounted = false;
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  // componentDidMount() {
  //   this.mounted = true;
  // }

  handleSubmit(event) {
    // console.log('email:', this.state.email,
    //   'password:', this.state.password);
       
   fetch(Constants.APIURLBASE + Constants.APIV1 + Constants.LOGIN, {
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
        // console.log(responseJson);
        // console.log(responseJson.user);
        if(responseJson.successToken) {
          console.log(responseJson.user.role_id);
          await localStorage.setItem('token', JSON.stringify(responseJson.successToken));
          await localStorage.setItem('roleId', JSON.stringify(responseJson.user.role_id));
          await localStorage.setItem('userId', JSON.stringify(responseJson.user.id));
          console.log('el perro log', responseJson.user.role_id);
          
          if(responseJson.user.role_id === 1) {
            this.props.history.push('/dashboard');
          }
          else if(responseJson.user.role_id === 2) {
            this.props.history.push('/dashboard');
          }
          else if(responseJson.user.role_id >= 3) {
            alert('Solo Usuarios Admin tienen acceso al Panel Web');
          }
        } else {
           alert('Usuario o Contraseña incorrecto.');
        }
      });
   event.preventDefault(); 
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-2">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <img src={logo} style={{ width: 95, height: 'auto', alt: 'REDI Logo', marginTop: -20}} align='right' />
                      <h1>Login</h1>
                      <p className="text-muted">Ingresa con tu cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Correo Electrónico" autoComplete="email" name="email" value={this.state.email} 
                        onChange={event => this.setState({email: event.target.value})}   />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Contraseña" autoComplete="current-password" name="password" value={this.state.password} 
                          onChange={event => this.setState({password: event.target.value})} 
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                    
                          <Button type="submit" color="secondary" style={{width: '150px'}} active tabIndex={-1}>Iniciar Sesión</Button>
                        
                        {/*   <Button color="secondary" type="submit" value="submit" style={{width: '150px'}}>Iniciar Sesión</Button> */}
                        {
                          // <Button color="warning" style={{marginTop: '5px', width: '150px'}} block>Cancelar</Button>
                        }
                        <Link to={Constants.REGISTER} className="text-white py-5 d-lg-none">
                          <Button color="secondary" style={{width: '150px'}} className="mt-3" active tabIndex={-1}>Registrate ahora</Button>
                        </Link>
                             
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Olvidaste tu contraseña?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white py-5 d-md-down-none" style={{ width: '44%', backgroundColor: '#252830' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Registro</h2>
                      <p>Twinexchange.</p>
                      <Link to={Constants.REGISTER}>
                        <Button color="secondary" className="mt-3" active tabIndex={-1}>Registrate ahora</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

