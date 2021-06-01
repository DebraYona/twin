import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { obtainLicenceTypes } from '../../redux/actions/licenceTypes';
import { obtainVehicleTypes } from '../../redux/actions/vehicleTypes';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
import axios from 'axios';
import * as Constants from '../../constants/constants';

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
  ModalHeader
} from 'reactstrap';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Forms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            birthday: '',
            licenceNum: '',
            licenceTypeId: '',
            license_plate: '',
            photo: '',
            vehicleTypeId: '',
            status: '',
            email: '',
            password: '',
            data: []
        };
    }

    saveData() {
        const formData = new FormData()
        formData.append('name', this.state.name);
        formData.append('birthday', this.state.birthday);
        formData.append('licenceNum', this.state.licenceNum);
        formData.append('licenceTypeId', this.state.licenceTypeId);
        formData.append('photo', this.state.photo);
        formData.append('vehicleTypeId', this.state.vehicleTypeId);
        formData.append('license_plate', this.state.license_plate);
        formData.append('status', this.state.status);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        // console.log(formData);
        // sending backend
        axios.post(Constants.APIURLBASE + 'drivers', formData)
        .then(response => {
            alert('Guardado con exito');
            this.props.history.push('/drivers');
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    handleText(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    fileChangedHandler = (event) => {
        this.setState({photo: event.target.files[0]});
    }

    componentWillMount = async () =>  {
        await this.props.obtainLicenceTypes();
        await this.props.obtainVehicleTypes();
    }

    render() {
        const { licenceTypes, isFetching} = this.props.licenceTypes;
        const { vehicleTypes, isFetchingVehicle} = this.props.vehicleTypes;
        if(isFetching && isFetchingVehicle) {
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
        return (
        <div className="animated fadeIn">
            <Col xs="12" sm="12">
                <Card>
                    <CardHeader>
                        <strong>Agregar un nuevo chofer</strong>
                    </CardHeader>
                    <CardBody>
                    <FormGroup>
                        <Label htmlFor="name">Nombre</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="text" id="name" name="name" />
                        <Label htmlFor="birdthdate">Fecha de nacimiento</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="text" id="birthday" name="birthday" />
                        <Label htmlFor="licence">No. de licencia</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="text" id="licenceNum" name="licenceNum" />
                        <Label htmlFor="type_licence">Tipo de licencia</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="select" id="licenceTypeId" name="licenceTypeId" >
                            <option value="">Selecciona una opción</option>
                            {
                                licenceTypes.map(licenceType => (
                                    <option key={licenceType.id} value={licenceType.id}>{licenceType.type}</option>
                                ))
                            }
                        </Input>
                        <Label htmlFor="email">Placas</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="text" id="license_plate" name="license_plate" />
                        <Label htmlFor="url">Ubicación de foto</Label>
                        <Input onChange={this.fileChangedHandler} type="file" id="photo" name="photo"  />
                        <Label htmlFor="type">Tipo de vehiculo</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="select" id="vehicleTypeId" name="vehicleTypeId" >
                            <option value="">Selecciona una opción</option>
                            {
                                vehicleTypes.map(vehicleType => (
                                    <option key={vehicleType.id} value={vehicleType.id}>{vehicleType.name}</option>
                                ))
                            }
                        </Input>
                        <Label htmlFor="status">Estatus</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="select" id="status" name="status" >
                            <option value="">Selecciona una opción</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </Input>
                        <Label htmlFor="email">Email</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="email" id="email" name="email" />
                        <Label htmlFor="password">Contraseña</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="password" id="password" name="password" />
                    </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => this.saveData()} color="primary">Guardar</Button>
                        &nbsp;&nbsp;
                        <Link to="/drivers">
                            <Button color="warning">Cancelar</Button>
                        </Link>
                    </CardFooter>
                </Card>
             </Col>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      licenceTypes: state.licenceTypes,
      vehicleTypes: state.vehicleTypes,
    };
  }  
  function mapDispatchToProps(dispatch) {
    return {
        obtainLicenceTypes: () => dispatch(obtainLicenceTypes()),
        obtainVehicleTypes: () => dispatch(obtainVehicleTypes()),
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Forms);
