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
      selectedMagicTownName: '',
      btnGuardar: false,

      actual_photo: '',
      name: '',
      description: '',
      image_interesting_route: '',
      pricing_rate: '',
      phone: '',
    };
    this.btnGuardarChange = this.btnGuardarChange.bind(this);
    this.btnGuardarChangeFalse = this.btnGuardarChangeFalse.bind(this);
  }

  componentWillMount() {
     this.getData();
  }

  handleText(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  fileChangedHandler = (event) => {
    this.setState({image_interesting_route: event.target.files[0]});
  }

  async getData() {
    await fetch(Constants.APIURLBASE + Constants.INTERESTINGROUTES + Constants.DASH + this.props.match.params.id)
    .then((response) => response.json())
    .then(data => {
        console.log(data); 
        this.setState({magic_town_id: data.magic_town_id});
        this.setState({name: data.name});
        this.setState({description: data.description});
        this.setState({actual_photo: data.image_interesting_route});
        this.setState({pricing_rate: data.pricing_rate});
        this.setState({phone: data.phone});
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
    })
    .catch(error => console.log(error));
  }

  saveData() {
    const formData = new FormData();
    formData.append('magic_town_id', this.state.magic_town_id);
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('image_interesting_route', this.state.image_interesting_route);
    formData.append('pricing_rate', this.state.pricing_rate);
    formData.append('phone', this.state.phone);

    // sending backend
    axios.put(Constants.APIURLBASE + Constants.INTERESTINGROUTES + Constants.DASH + this.props.match.params.id, formData)
    .then(response => {
      alert(Constants.SUCCESSFULSAVING);
      this.btnGuardarChangeFalse();
      this.props.history.push(Constants.INTERESTINGROUTESCANCELBTN);
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
    }
  }

  render() {

    return(
      <div className="animated fadeIn">
          <Col xs="12" sm="12">
              <Card>
                  <CardHeader>
                      <Label>Editar Ruta de Interés de <b>{ this.state.name }</b></Label>
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
                      <Input onChange={this.fileChangedHandler} type="file" id="image_interesting_route" name="image_interesting_route" />
                      <Label htmlFor="name">Rango de Precio</Label>
                      <Input onChange={(e)=>this.handleText(e)} defaultValue={this.state.pricing_rate} type="text" id="pricing_rate" name="pricing_rate" />
                      <Label htmlFor="name">Teléfono</Label>
                      <Input onChange={(e)=>this.handleText(e)} defaultValue={this.state.phone} type="number" id="phone" name="phone" />
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