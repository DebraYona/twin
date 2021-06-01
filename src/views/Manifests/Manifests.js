import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../../constants/constants'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import Moment from 'react-moment';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from 'reactstrap';

class Manifests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        const recollectorId = localStorage.getItem('recollectorId');
        fetch(Constants.APIURLBASE + 'manifests/manifestsByRecollectorId/' + recollectorId)
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
                                <i className="fa fa-align-justify"></i> Listado de Manifiestos
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>ID Manifiesto</th>
                                            <th>Día Manifiesto</th>
                                            <th>Peso vehícular con carga</th>
                                            <th>Peso vehícular sin carga</th>
                                            <th>Peso de la carga</th>
                                            <th>Comentarios</th>
                                            <th>Destino Final</th>
                                            <th>Responsable</th>
                                            <th>Chofer</th>
                                            <th>Cliente</th>
                                            <th>Dirección de Servicio</th>
                                            <th>Estatús QR</th>
                                            <th>Fecha de Creación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.data.map(manifest => (
                                            <tr>
                                                <td><Link to={`/manifestDetail/${manifest.manifest_id}`}>{manifest.manifest_id}</Link></td>
                                                
                                                <td><Moment format='YYYY-MM-DD'>{manifest.day_route}</Moment></td>
                                                <td>{manifest.vehicle_weight_charged}</td>
                                                <td>{manifest.vehicle_weight_free}</td>
                                                <td>{manifest.total_weight}</td>
                                                <td>
                                                    {
                                                        (manifest.comments=='') ?
                                                            'Ninguno'
                                                        :
                                                            manifest.comments
                                                    }
                                                </td>
                                                <td>{manifest.waste_place_name}</td>
                                                <td>{manifest.responsible}</td>
                                                <td>{manifest.driver_name}</td>
                                                <td>{manifest.client_name}</td>
                                                <td>{manifest.client_address}</td>
                                                <td>{manifest.qr_status}</td>
                                                <td><Moment format='YYYY-MM-DD HH:mm:ss'>{manifest.created_at}</Moment></td>
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

export default Manifests;


