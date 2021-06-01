import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { obtainLicenceTypes } from '../../redux/actions/licenceTypes';
import { obtainVehicleTypes } from '../../redux/actions/vehicleTypes';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
import axios from 'axios';
import * as Constants from '../../constants/constants';
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

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class AddOrEditEnterpriseDirectory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            data: [],
            logo: '',
        };
        this.btnGuardarChange = this.btnGuardarChange.bind(this);
        this.btnGuardarChangeFalse = this.btnGuardarChangeFalse.bind(this);
    }

    btnGuardarChange() {
        this.setState({btnGuardar: true});
    }

    btnGuardarChangeFalse() {
        this.setState({btnGuardar: false});
    }

    handleText(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    saveData() {
        const formData = new FormData();

        if(this.state.business_name && this.state.business_name != '') {
            formData.append('business_name', this.state.business_name);
        }
        if(this.state.logo != '') {
            formData.append('logoFile', this.state.logo);
        }
        if(this.state.description && this.state.description != '') {
            formData.append('description', this.state.description);
        }
        console.log(Constants.APIURLBASE + Constants.MAGICTOWNS + Constants.DASH + this.props.match.params.id);
        fetch(Constants.APIURLBASE + Constants.MAGICTOWNS + Constants.DASH + this.props.match.params.id, {
            method: 'PUT',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            alert(Constants.SUCCESSFULSAVING);
            this.btnGuardarChangeFalse();
            this.props.history.push(Constants.MAGICTOWNSCANCELBTN);
        })
        .catch(error => {
            alert(Constants.ERRORSAVING);
            console.log(error);
            this.btnGuardarChangeFalse();
        });
    }

    fileChangedHandler = (event) => {
        this.setState({logo: event.target.files[0]});
    }

    componentWillMount() {
        fetch(Constants.APIURLBASE + Constants.MAGICTOWNS + Constants.DASH + this.props.match.params.id)
        .then((response) => response.json())
        .then(data => {
            this.setState({data});
            this.setState({status: this.state.data[0].status});
        })
        .catch(error => console.log(error))
    }

    render() {
        if(!this.state.data) {
            return(
            <Row>
                <Col sm={12} md={12} lg={12}>
                        <div className='sweet-loading d-flex align-items-center'>
                                <BeatLoader
                                css={override}
                                sizeUnit={"px"}
                                size={17}
                                color={'#63c2de'}
                                loading={this.state.loading}
                                />
                        </div> 
                </Col>
            </Row>
            )
        }
        else {
            return (
                <div className="animated fadeIn">
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Editar Pueblo Mágico&nbsp;
                                    <b>{ (this.state.data[0]) ? this.state.data[0].business_name : null }</b>
                                </CardHeader>
                                <CardBody>
                                <FormGroup>
                                    <Label htmlFor="name">Nombre Pueblo Mágico</Label>
                                    <Input onChange={(e)=>this.handleText(e)} defaultValue={ (this.state.data[0]) ? this.state.data[0].business_name : null } type="text" id="business_name" name="business_name" />
                                    <br />
                                    <Label htmlFor="name">Portada de Imágen</Label>
                                    <div>
                                        <img src={`${Constants.APIURLBASE}${ (this.state.data[0]) ? this.state.data[0].logo : null }`}
                                            width='225' id="actual_photo" name="actual_photo" alt="Sin portada de Imágen" />
                                    </div>
                                    <Input onChange={this.fileChangedHandler} type="file" id="logo" name="logo" />
                                    <br />
                                    <Label htmlFor="name">Descripción del Lugar</Label>
                                    <Input onChange={(e)=>this.handleText(e)} defaultValue={ (this.state.data[0]) ? this.state.data[0].description : null } type="textarea" rows={6} id="description" name="description" />
                                    <br />
                                    <Label htmlFor="name">Fecha de Creación</Label>
                                    <div>
                                        <Label htmlFor="name">
                                        {
                                            (this.state.data[0] && this.state.data[0].created_at)
                                            ?
                                                <Moment format='YYYY-MM-DD HH:mm:ss'>{this.state.data[0].created_at}</Moment>
                                            :
                                                null 
                                        }
                                        </Label>
                                    </div>
                                    <br />
                                    <Label htmlFor="name">Última Modificación</Label>
                                    <div>
                                        <Label htmlFor="name">
                                        {
                                            (this.state.data[0] && this.state.data[0].updated_at)
                                            ?
                                                <Moment format='YYYY-MM-DD HH:mm:ss'>{this.state.data[0].updated_at}</Moment>
                                            :
                                                null 
                                        }
                                        </Label>
                                    </div>
                                </FormGroup>
                                </CardBody>
                                <CardFooter>
                                    <Button onClick={() => {this.btnGuardarChange(); this.saveData();} } color="primary" disabled={this.state.btnGuardar}>Guardar</Button>
                                    &nbsp;&nbsp;
                                    <Link to={Constants.MAGICTOWNSCANCELBTN}>
                                        <Button color="warning">Cancelar</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export default AddOrEditEnterpriseDirectory;
