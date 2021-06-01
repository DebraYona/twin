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
      btnGuardar: false,

      name: '',
      description: '',
      image_interesting_route: '',
      pricing_rate: '',
      phone: '',
    };
    this.btnGuardarChange = this.btnGuardarChange.bind(this);
    this.btnGuardarChangeFalse = this.btnGuardarChangeFalse.bind(this);
  }

  saveData() {
    const formData = new FormData();

    formData.append('magic_town_id', this.state.selectedMagicTownId);
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('image_interesting_route', this.state.image_interesting_route);
    formData.append('pricing_rate', this.state.pricing_rate);
    formData.append('phone', this.state.phone);
   // sending to backend
    axios.post(Constants.APIURLBASE + Constants.INTERESTINGROUTES, formData)
    .then(response => {
      alert(Constants.SUCCESSFULSAVING);
      this.btnGuardarChangeFalse();
      this.props.history.push(Constants.INTERESTINGROUTESCANCELBTN);
    })
    .catch(error => {
        alert(Constants.ERRORSAVING);
        console.log(error);
        this.btnGuardarChangeFalse();
    });
  }

  handleText(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  fileChangedHandler = (event) => {
    this.setState({image_interesting_route: event.target.files[0]});
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
      this.setState({'selectedMagicTownId': selectedMagicTownId});
      this.setState({'selectedMagicTownName': selectedMagicTownName});
    }
    else {
      this.setState({'selectedCategoryId': 0});
      this.setState({'selectedCategoryName': ''});
    }

    e.preventDefault();
  }
  
  render() {
    return(
      <div className="animated fadeIn">
          <Col xs="12" sm="12">
              <Card>
                  <CardHeader>
                      <strong>Agregar Ruta de Interés</strong>
                  </CardHeader>
                  <CardBody>
                  <FormGroup>
                      <Label htmlFor="name">Nueva ruta de <b>{ this.state.selectedMagicTownName }</b></Label>
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
                      <Label htmlFor="name">Nombre</Label>
                      <Input onChange={(e)=>this.handleText(e)} type="text" id="name" name="name" />
                      <Label htmlFor="name">Descripción</Label>
                      <Input onChange={(e)=>this.handleText(e)} defaultValue='' type="textarea" rows={4} id="description" name="description" />
                      <Label htmlFor="name">Imagen de portada</Label>
                      <Input onChange={this.fileChangedHandler} type="file" id="image_interesting_route" name="image_interesting_route" />
                      <Label htmlFor="name">Rango de Precio</Label>
                      <Input onChange={(e)=>this.handleText(e)} type="text" id="pricing_rate" name="pricing_rate" />
                      <Label htmlFor="name">Teléfono</Label>
                      <Input onChange={(e)=>this.handleText(e)} type="number" id="phone" name="phone" />
                  </FormGroup>
                  </CardBody>
                  <CardFooter>
                      <Button onClick={() => {this.btnGuardarChange(); this.saveData();} } color="primary" disabled={this.state.btnGuardar}>Guardar</Button>
                      &nbsp;&nbsp;
                      <Link to={Constants.INTERESTINGROUTESCANCELBTN}>
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