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

class ManifestDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        fetch(Constants.APIURLBASE + 'manifests/showDetailByManifestId/' + this.props.match.params.id)
        .then((response) => response.json())
        .then(data => {
            this.setState({data});
        })
        .catch(error => console.log(error))
    }

    render() {
        const userId = localStorage.getItem('userId');
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Detalle del Manifiesto { (this.state.data[0]) ? this.state.data[0].manifest_id : '' }
                            </CardHeader>
                            <div class="col-12" style={{marginLeft: '5px', marginTop: '10px'}}>
                            {
                                (this.state.data[0]) ?
                                    <>
                                        <b>ID Manifesto:</b> {this.state.data[0].manifest_id}&nbsp;
                                        <b>Carga:</b> {this.state.data[0].total_weight}&nbsp;
                                        <b>Cliente:</b> {this.state.data[0].client_name}&nbsp;
                                        <b>Destino Final:</b> {this.state.data[0].waste_place_name}&nbsp;
                                        <b>Chofer:</b> {this.state.data[0].driver_name}&nbsp;
                                        <b>QR Status:</b> {this.state.data[0].qr_status}&nbsp;
                                    </>
                                :
                                    'Cargando...'
                            }
                            </div>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>Cantidad</th>
                                            <th>Contenedor</th>
                                            <th>Residuo</th>
                                            <th>Total Cantidad</th>
                                            <th>Unidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.data.map(manifest => (
                                            <tr>
                                                <td>{manifest.quantity}</td>
                                                <td>{manifest.container_name}</td>
                                                <td>
                                                {
                                                    (manifest.residue=='') ?
                                                        'Ninguno'
                                                    :
                                                        manifest.residue
                                                }
                                                </td>
                                                <td>{manifest.total_quantity}</td>
                                                <td>{manifest.unity_name}</td>
                                            </tr>                                            
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                                {
                                    (userId==1) ?
                                        <Link to="/manifests/admin">
                                            <Button color="warning">Cancelar</Button>
                                        </Link>
                                    :
                                        <Link to="/manifests">
                                            <Button color="warning">Cancelar</Button>
                                        </Link>
                                }
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ManifestDetail;


