import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../../constants/constants';
import Select from 'react-select'
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
      selectedMagicTownName: '',
      selectedCategoryName: '',
      btnGuardar: false,

      actual_photo: '',
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

  componentWillMount() {
     this.getData();
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

  async getData() {
    await fetch(Constants.APIURLBASE + Constants.DESTINIES + Constants.DASH + this.props.match.params.id)
    .then((response) => response.json())
    .then(data => {
        // console.log(data);
        this.setState({magic_town_id: data.magic_town_id});
        this.setState({category_id: data.category_id});
        this.setState({name: data.name});
        this.setState({description: data.description});
        this.setState({actual_photo: data.image_destiny});
        this.setState({pricing_rate: data.pricing_rate});
        this.setState({phone: data.phone});
        this.setState({email: data.email});
        this.setState({external_url: data.external_url});
        this.setState({address: data.address});
        this.setState({status: data.status});
        this.setState({latitude: data.latitude});
        this.setState({longitude: data.longitude});
    })
    .then(() => {
      fetch(Constants.APIURLBASE + Constants.MAGICTOWNS)
      .then((response) => response.json())
      .then(magicTowns => {
        magicTowns.map(magicTown => {
          var mgTown = this.state.magicTowns.concat({ label: magicTown.business_name, value: magicTown.id });
          this.setState({magicTowns: mgTown})
        });
      })
      .catch(error => console.log(error));

      console.log(Constants.APIURLBASE + Constants.MAGICTOWNS + Constants.DASH + this.state.magic_town_id);
      fetch(Constants.APIURLBASE + Constants.MAGICTOWNS + Constants.DASH + this.state.magic_town_id)
      .then((response) => response.json())
      .then(magicTown => {
          console.log(magicTown);
          console.log('magicTown.business_name: ', magicTown[0].business_name);
          this.setState({selectedMagicTownName: magicTown[0].business_name});
      })
      .catch(error => console.log(error));

      console.log(Constants.APIURLBASE + Constants.GETCATEGORIESBYMAGICTOWNID + Constants.DASH + this.state.magic_town_id);
      fetch(Constants.APIURLBASE + Constants.GETCATEGORIESBYMAGICTOWNID + Constants.DASH + this.state.magic_town_id)
      .then((response) => response.json())
      .then(categories => {
        categories.map(category => {
          var localCategory = this.state.categories.concat({ label: category.name, value: category.id });
          this.setState({categories: localCategory})
        });
      })
      .catch(error => console.log(error));

      console.log(Constants.APIURLBASE + Constants.CATEGORIES + Constants.DASH + this.state.category_id);
      fetch(Constants.APIURLBASE + Constants.CATEGORIES + Constants.DASH + this.state.category_id)
      .then((response) => response.json())
      .then(categories => {
        console.log(categories);
        console.log('categories.name: ', categories.name);
        this.setState({selectedCategoryName: categories.name});
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  }

  saveData() {
    const formData = new FormData();
    formData.append('magic_town_id', this.state.magic_town_id);
    formData.append('category_id', this.state.category_id);
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

    // sending backend
    axios.put(Constants.APIURLBASE + Constants.DESTINIES + Constants.DASH + this.props.match.params.id, formData)
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

  updatePlace(lat, lng) {
    this.setState({latitude:''+lat, longitude:''+lng});
  }

  btnGuardarChange() {
    this.setState({btnGuardar: true});
  }

  btnGuardarChangeFalse() {
    this.setState({btnGuardar: false});
  }

  handleMagicTownChange(e) {

    const selectedMagicTownId = e.value;
    const selectedMagicTownName = e.label;

    if(selectedMagicTownId != 0) {
      this.setState({categories: []});
      this.setState({'magic_town_id': selectedMagicTownId},
      () => {
        // console.log(this.state.selectedMagicTownId);
        // this.setState({data: []});
        console.log(Constants.APIURLBASE + Constants.GETCATEGORIESBYMAGICTOWNID + Constants.DASH + selectedMagicTownId);
        fetch(Constants.APIURLBASE + Constants.GETCATEGORIESBYMAGICTOWNID + Constants.DASH + selectedMagicTownId)
        .then((response) => response.json())
        .then(categories => {
          categories.map((category, index) => {
            if(index == 0) {
              this.setState({category_id: category.id});
              this.setState({selectedCategoryName: category.name});
            }
            var localCategory = this.state.categories.concat({ label: category.name, value: category.id });
            this.setState({categories: localCategory});
          });
        })
        .catch(error => console.log(error));
        this.setState({'selectedMagicTownName': selectedMagicTownName});
      });
    }
    else {
      this.setState({'category_id': 0});
      this.setState({'selectedCategoryName': ''});
      this.setState({categories: []});

      this.setState({'magic_town_id': 0});
      this.setState({'selectedMagicTownName': ''});
    }
  }

  handleCategoriesByMagicTownId(e) {
    const selectedCategoryId = e.value;
    const selectedCategoryName = e.label;
    this.setState({'category_id': selectedCategoryId});
    this.setState({'selectedCategoryName': selectedCategoryName});
  }

  render() {

    return(
      <div className="animated fadeIn">
          <Col xs="12" sm="12">
              <Card>
                  <CardHeader>
                      <Label>Editar Destino <b>{ this.state.name }</b></Label>
                  </CardHeader>
                  <CardBody>
                  <FormGroup>
                      <Label htmlFor="name">Nuevo destino de <b>{ this.state.selectedMagicTownName }</b></Label>
                      <Select
                        options={this.state.magicTowns}
                        value={{ label: this.state.selectedMagicTownName, value: this.state.magic_town_id }}
                        onChange={value => this.handleMagicTownChange(value)}
                        defaultValue={{ label: this.state.selectedMagicTownName, value: this.state.magic_town_id }}
                      />
                      {
                      // <Input type="select" onChange={(e)=>this.handleMagicTownChange(e)} id="magic_town_id" name="magic_town_id" >
                      //     <option value="0">- - Seleccione un Pueblo Mágico - -</option>
                      //     {
                      //       this.state.magicTowns.map(magicTown => (
                      //         <option key={magicTown.id} value={magicTown.id+','+magicTown.business_name}>
                      //             {magicTown.business_name}
                      //         </option>
                      //       ))
                      //     }
                      // </Input>
                      }

                      <Label htmlFor="status">Categoría <b>{ this.state.selectedCategoryName }</b></Label>
                      <Select
                        options={this.state.categories}
                        value={{ label: this.state.selectedCategoryName, value: this.state.category_id }}
                        onChange={value => this.handleCategoriesByMagicTownId(value)}
                        defaultValue={{ label: this.state.selectedCategoryName, value: this.state.category_id }} />
                      {
                        // <Input type="select" onChange={(e)=>this.handleCategoriesByMagicTownId(e)}
                        //     defaultValue={this.state.category_id} id="category_id" name="category_id">
                        // <option value="0">- - Selecciona una opcion - -</option>
                        // this.state.categories.map((category, index) => (
                        //     <option key={category.id+category.name} value={category.id+','+category.name}>
                        //         {category.name}
                        //     </option>
                        // ))
                        // </Input>
                      }
                      <Label htmlFor="name">Nombre</Label>
                      <Input onChange={(e)=>this.handleText(e)} defaultValue={this.state.name} type="text" id="name" name="name" />
                      <Label htmlFor="name">Descripción</Label>
                      <Input onChange={(e)=>this.handleText(e)} defaultValue={this.state.description} type="textarea" rows={4} id="description" name="description" />
                      <Label htmlFor="name">Imagen de portada</Label>
                      <div>
                        <img src={`${Constants.APIURLBASE}${ this.state.actual_photo }`}
                            width='200' id="actual_photo" name="actual_photo" alt="Sin imágen" />
                      </div>
                      <br />
                      <Input onChange={this.fileChangedHandler} type="file" id="image_destiny" name="image_destiny" />
                      <Label htmlFor="name">Rango de Precio</Label>
                      <Input onChange={(e)=>this.handleText(e)} defaultValue={this.state.pricing_rate} type="text" id="pricing_rate" name="pricing_rate" />
                      <Label htmlFor="name">Teléfono</Label>
                      <Input onChange={(e)=>this.handleText(e)} defaultValue={this.state.phone} type="number" id="phone" name="phone" />
                      <Label htmlFor="name">Email</Label>
                      <Input onChange={(e)=>this.handleText(e)} defaultValue={this.state.email} type="text" id="email" name="email" />
                      <Label htmlFor="name">External URL</Label>
                      <Input onChange={(e)=>this.handleText(e)} defaultValue={this.state.external_url} type="text" id="external_url" name="external_url" />
                      <Label htmlFor="status">Dirección</Label>
                      <Input onChange={(e)=>this.handleText(e)} defaultValue={this.state.address} type="text" id="address" name="address" />
                      <Label htmlFor="status">Estatús</Label>
                      <Input type="select" value={this.state.status} defaultValue={this.state.status} onChange={(e)=>this.handleText(e)} id="status" name="status" >
                          <option >Selecciona una opcion</option>
                          <option value="1">Activo</option>
                          <option value="0">Inactivo</option>
                      </Input>
                      <Label htmlFor="status">Coordenadas</Label>
                      <Col className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <Input value={this.state.latitude} defaultValue={this.state.latitude} type="text" id="latitude" name="latitude" placeholder='Latitud' readOnly/>
                        <Input value={this.state.longitude} defaultValue={this.state.longitude} type="text" id="longitude" name="longitude" placeholder='Longitud' readOnly/>
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