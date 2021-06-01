import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import * as Constants from '../../constants/constants'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

class DayRoute extends Component {

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
                                <i className="fa fa-align-justify"></i> Ruta del día
                            </CardHeader>
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
                                            <th>Estatús</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.data.map(driver => (
                                            <tr key={driver.id}>
                                                <td><Link to={`/AddOrEditDayRoute/${driver.id}`}> {driver.name} </Link></td>
                                                
                                                <td>{driver.birthday.substring(0, 10)}</td>
                                                <td>{driver.licence_number}</td>
                                                <td>{driver.licenceType}</td>
                                                <td><img src={`${Constants.APIURLBASE}${driver.photo}`} width='50' /></td>
                                                <td>{driver.vehicleName}</td>
                                                <td>
                                                    {
                                                        (driver.status==1) ?
                                                            <span className="badge badge-success">Con Ruta</span>
                                                        :
                                                            <span className="badge badge-danger">Sin Ruta</span>
                                                    }
                                                </td>
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

export default DayRoute;


