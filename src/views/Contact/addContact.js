import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
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
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import MapView from './MapView';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      magicTowns: [],
      categories: [],
      selectedMagicTownId: 0,
      selectedMagicTownName: '',
      selectedCategoryId: 0,
      selectedCategoryName: '',
      btnGuardar: false,

      name: '',
      description: '',
      image_destiny: '',
      pricing_rate: '',
      phone: '',
      email: '',
      external_url: '',
      address: '',
      status: 1,
      latitude: '',
      longitude: '',
    };
    this.btnGuardarChange = this.btnGuardarChange.bind(this);
    this.btnGuardarChangeFalse = this.btnGuardarChangeFalse.bind(this);
    this.handleCategoriesByMagicTownId = this.handleCategoriesByMagicTownId.bind(this);
  }

  saveData() {
    const formData = new FormData();

    formData.append('magic_town_id', this.state.selectedMagicTownId);
    formData.append('category_id', this.state.selectedCategoryId);
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('image_destiny', this.state.image_destiny);
    formData.append('pricing_rate', this.state.pricing_rate);
    formData.append('phone', this.state.phone);
    formData.append('email', this.state.email);
    formData.append('external_url', this.state.external_url);
    formData.append('address', this.state.address);
    formData.append('status', this.state.status);
    formData.append('latitude', this.state.latitude);
    formData.append('longitude', this.state.longitude);

   // sending to backend
    axios.post(Constants.APIURLBASE + Constants.DESTINIES, formData)
    .then(response => {
      alert(Constants.SUCCESSFULSAVING);
      this.btnGuardarChangeFalse();
      this.props.history.push(Constants.DESTINIESCANCELBTN);
    })
    .catch(error => {
        alert(Constants.ERRORSAVING);
        console.log(error);
        this.btnGuardarChangeFalse();
    })
  }

  handleText(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  fileChangedHandler = (event) => {
    this.setState({image_destiny: event.target.files[0]});
  }

  updatePlace(lat, lng) {
    this.setState({latitude:''+lat, longitude:''+lng});
  }

  componentWillMount() {
    fetch(Constants.APIURLBASE + Constants.MAGICTOWNS)
    .then((response) => response.json())
    .then(magicTowns => {
      this.setState({magicTowns});
    })
    .catch(error => console.log(error));
  }

  btnGuardarChange() {
    this.setState({btnGuardar: true});
  }

  btnGuardarChangeFalse() {
    this.setState({btnGuardar: false});
  }

  handleMagicTownChange(e) {
    const fields = e.target.value.split(',');

    const selectedMagicTownId = fields[0];
    const selectedMagicTownName = fields[1];

    if(selectedMagicTownId != 0) {
      this.setState({'selectedMagicTownId': selectedMagicTownId},
      () => {
          // console.log(this.state.selectedMagicTownId);
          // this.setState({data: []});
          console.log(Constants.APIURLBASE + Constants.GETCATEGORIESBYMAGICTOWNID + Constants.DASH + selectedMagicTownId);
          fetch(Constants.APIURLBASE + Constants.GETCATEGORIESBYMAGICTOWNID + Constants.DASH + selectedMagicTownId)
          .then((response) => response.json())
          .then(categories => {
              console.log(categories);
              this.setState({categories: categories});
          })
          .catch(error => console.log(error));
      });
      this.setState({'selectedMagicTownName': selectedMagicTownName},
      () => {
          // console.log(this.state.selectedMagicTownName);
      });
    }
    else {
      this.setState({'selectedCategoryId': 0});
      this.setState({'selectedCategoryName': ''});
      this.setState({categories: []});

      this.setState({'selectedMagicTownId': 0});
      this.setState({'selectedMagicTownName': ''});
    }

    e.preventDefault();
  }

  handleCategoriesByMagicTownId(e) {
    const fields = e.target.value.split(',');

    console.log(fields);
    const selectedCategoryId = fields[0];
    const selectedCategoryName = fields[1];
    this.setState({'selectedCategoryId': selectedCategoryId});
    this.setState({'selectedCategoryName': selectedCategoryName});

    e.preventDefault();
  }

    render() {
        return(
        <div className="animated fadeIn">
            <Col xs="12" sm="12">
                <Card>
                    <CardHeader>
                        <strong>Agregar nuevo destino</strong>
                    </CardHeader>
                    <CardBody>
                    <FormGroup>
                        <Label htmlFor="name">Nuevo destino de <b>{ this.state.selectedMagicTownName }</b></Label>
                        <Input type="select" onChange={(e)=>this.handleMagicTownChange(e)} id="magic_town_id" name="magic_town_id" >
                            <option value="0">- - Seleccione un Pueblo Mágico - -</option>
                            {
                              this.state.magicTowns.map(magicTown => (
                                <option key={magicTown.id} value={magicTown.id+','+magicTown.business_name}>
                                    {magicTown.business_name}
                                </option>
                              ))
                            }
                        </Input>

                        <Label htmlFor="status">Categoría <b>{ this.state.selectedCategoryName }</b></Label>
                        <Input type="select" onChange={(e)=>this.handleCategoriesByMagicTownId(e)} id="category_id" name="category_id">
                            <option value="0">- - Selecciona una opcion - -</option>
                            {
                              this.state.categories.map(category => (
                                <option key={category.id+category.name} value={category.id+','+category.name}>
                                    {category.name}
                                </option>
                              ))
                            }
                        </Input>
                        <Label htmlFor="name">Nombre</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="text" id="name" name="name" />
                        <Label htmlFor="name">Descripción</Label>
                        <Input onChange={(e)=>this.handleText(e)} defaultValue='' type="textarea" rows={4} id="description" name="description" />
                        <Label htmlFor="name">Imagen de portada</Label>
                        <Input onChange={this.fileChangedHandler} type="file" id="image_destiny" name="image_destiny" />
                        <Label htmlFor="name">Rango de Precio</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="text" id="pricing_rate" name="pricing_rate" />
                        <Label htmlFor="name">Teléfono</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="number" id="phone" name="phone" />
                        <Label htmlFor="name">E-mail de contacto</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="text" id="email" name="email" />
                        <Label htmlFor="name">URL Externos del destino</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="text" id="external_url" name="external_url" />
                        <Label htmlFor="name">Dirección Completa (Calle, número exterior y colonia)</Label>
                        <Input onChange={(e)=>this.handleText(e)} type="text" id="address" name="address" />
                        <Label htmlFor="status">Estatús</Label>
                        <Input type="select" value={this.state.status} onChange={(e)=>this.handleText(e)} id="status" name="status">
                            <option>- - Selecciona una opción - -</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </Input>
                        <Label htmlFor="status">Coordenadas</Label>
                        <Col className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <Input value={this.state.latitude} type="text" id="latitude" name="latitude" placeholder='Latitud' readOnly/>
                          <Input value={this.state.longitude} type="text" id="longitude" name="longitude" placeholder='Longitud' readOnly/>
                        </Col>
                        <br />
                        <Label htmlFor="status">Ubicación</Label>
                        <MapView onChange={this.updatePlace.bind(this)} dataMap={this.state} />
                    </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => {this.btnGuardarChange(); this.saveData();} } color="primary" disabled={this.state.btnGuardar}>Guardar</Button>
                        &nbsp;&nbsp;
                        <Link to={Constants.DESTINIESCANCELBTN}>
                            <Button color="warning">Cancelar</Button>
                        </Link>
                    </CardFooter>
                </Card>
             </Col>
        </div>
        );
    }
}

export default Forms;