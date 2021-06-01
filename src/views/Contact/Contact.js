import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Constants from '../../constants/constants';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        const roleId = localStorage.getItem('roleId');
        let urlToGet = '';
        if(roleId == 2) {
            urlToGet = Constants.GETDESTINIESBYMAGICTOWNID + '/' + localStorage.getItem('recollectorId') + '/0';
        }
        if(roleId == 1) {
            urlToGet = Constants.DESTINIES;
        }
        fetch(Constants.APIURLBASE + urlToGet )
        .then((response) => response.json())
        .then(data => {
            this.setState({data});
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Destinos
                            </CardHeader>
                            <Link to={Constants.DESTINIES+Constants.ADDBTN}>
                                <div>
                                    <Button color="primary" className="mt-3" active tabIndex={-1} style={{marginLeft:20}}>
                                      <i className="fa fa-plus px-2"></i>Agregar&nbsp;</Button>
                                </div>
                            </Link>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre Destino</th>
                                            <th>Descripción</th>
                                            <th>Imágen</th>
                                            <th>Rango de Precio</th>
                                            <th>Teléfono</th>
                                            <th>Email</th>
                                            <th>Estatus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.data.map((destiny, index) => (
                                            <tr key={index}>
                                                <td><Link to={`/destinies/${destiny.id}`}> {index+1} </Link></td>
                                                <td><Link to={`/destinies/${destiny.id}`}> {destiny.name} </Link></td>
                                                <td>{ (destiny.description) }</td>
                                                <td><img src={`${Constants.APIURLBASE}${destiny.image_destiny}`} width='50' /></td>
                                                <td>{destiny.pricing_rate}</td>
                                                <td>{destiny.phone}</td>
                                                <td>{destiny.email}</td>
                                                <td>{destiny.status==1? <span className="badge badge-success">Activo</span>: <span className="badge badge-danger">Inactivo</span> }</td>
                                            </tr>                                            
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>  
        )
    }
}

export default Contact;


