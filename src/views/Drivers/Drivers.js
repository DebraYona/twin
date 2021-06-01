import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import * as Constants from '../../constants/constants'

class Drivers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        fetch(Constants.APIURLBASE + 'driversList')
        .then((response) => response.json())
        .then(data => {
            this.setState({data});
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Chóferes
                            </CardHeader>
                            <Link to="/drivers/add">
                                <div>
                                    <Button color="primary" className="mt-3" active tabIndex={-1} style={{marginLeft:20}}>
                                      <i className="fa fa-plus px-2"></i>Agregar&nbsp;</Button>
                                </div>
                            </Link>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Fecha de nacimiento</th>
                                            <th>No. de licencia</th>
                                            <th>Tipo de licencia</th>
                                            <th>Foto</th>
                                            <th>Tipo de vehículo asignado</th>
                                            <th>Estatus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.data.map(driver => (
                                            <tr>
                                                <td><Link to={`/drivers/${driver.id}`}>  {driver.name} </Link></td>
                                                <td>{driver.birthday.substring(0, 10)}</td>
                                                <td>{driver.licence_number}</td>
                                                <td>{driver.licenceType}</td>
                                                <td><img src={`${Constants.APIURLBASE}${driver.photo}`} width='50' /></td>
                                                <td>{driver.vehicleName}</td>
                                                <td>{(driver.status==1) ? <span class="badge badge-success">Activo</span>: <span class="badge badge-danger">Inactivo</span>}</td>
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

export default Drivers;


