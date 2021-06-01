import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../../constants/constants';
import axios from 'axios';
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

const token = localStorage.getItem('token');

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            magicTowns: [],
            selectedMagicTownName: '',
            selectedMagicTownId: 0,
            categoryArray: [],
            btnGuardar: false
        };
        this.handleText = this.handleText.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.handleMagicTownChange = this.handleMagicTownChange.bind(this);

        this.btnGuardarChange = this.btnGuardarChange.bind(this);
        this.btnGuardarChangeFalse = this.btnGuardarChangeFalse.bind(this);
    }

    componentWillMount() {
        fetch(Constants.APIURLBASE + Constants.MAGICTOWNS)
        .then((response) => response.json())
        .then(magicTowns => {
            this.setState({magicTowns});
        })
        .catch(error => console.log(error))
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
        this.setState({'selectedMagicTownId': selectedMagicTownId},
        () => {
            // console.log(this.state.selectedMagicTownId);
            this.setState({data: []});
            console.log(Constants.APIURLBASE + Constants.GETCATEGORIESBYMAGICTOWNID + Constants.DASH + selectedMagicTownId);
            fetch(Constants.APIURLBASE +Constants.GETCATEGORIESBYMAGICTOWNID + Constants.DASH + selectedMagicTownId)
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                this.setState({data});
                this.setState({categoryArray: data});
            })
            .catch(error => console.log(error));
        });
        this.setState({'selectedMagicTownName': selectedMagicTownName},
        () => {
            // console.log(this.state.selectedMagicTownName);
        });
        e.preventDefault();
    }

    handleText(index, e) {
        const updatedArray = [...this.state.categoryArray];
        updatedArray[index][e.target.name] = this.state.categoryArray[index][e.target.name] = e.target.value;
        this.setState({categoryArray: updatedArray});
    }

    fileChangedHandler(index, e) {
        const updatedArray = [...this.state.categoryArray];
        updatedArray[index][e.target.name] = this.state.categoryArray[index][e.target.name] = e.target.files[0];
        this.setState({categoryArray: updatedArray});
    }

    saveData() {
        const { categoryArray, imagesCategory } = this.state;

        const formData = new FormData();
        this.state.categoryArray.map((category, index) => {
            console.log(category);
            console.log(category.image_category);
            formData.append('imagesCategory'+index, category.image_category);
            formData.append('categoryArray[]', JSON.stringify(category));
        });
       // sending to backend
        axios.put(Constants.APIURLBASE + Constants.DESTINIES + `/${this.state.selectedMagicTownId}`, formData)
        .then(response => {
            console.log(response);
            alert(Constants.SUCCESSFULSAVING);
            this.btnGuardarChangeFalse();
            this.props.history.push(Constants.CATEGORIESCANCELBTN);
            window.location.reload();
        })
        .catch(error => {
            alert(Constants.ERRORSAVING);
            console.log(error);
            this.btnGuardarChangeFalse();
        })
    }

    cancelData() {
        this.props.history.push(Constants.CATEGORIESCANCELBTN);
        window.location.reload();
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Categorías
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th className="w-10">Categorías de <b>{ this.state.selectedMagicTownName }</b></th>
                                            <th colSpan={2}>
                                                <Input type="select" onChange={(e)=>this.handleMagicTownChange(e)} id="magic_town_id" name="magic_town_id" >
                                                    <option value="">- - Seleccione un Pueblo Mágico - -</option>
                                                    {
                                                      this.state.magicTowns.map(magicTown => (
                                                        <option key={magicTown.id} value={magicTown.id+','+magicTown.business_name}>
                                                            {magicTown.business_name}
                                                        </option>
                                                      ))
                                                    }
                                                </Input>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        (this.state.data[0] && this.state.data[0].name)
                                        ?   
                                            this.state.data.map((categoryByMagicTown, index) => (
                                                    (index == 0)
                                                    ?
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <Label htmlFor="name">Nombre Categoría</Label>
                                                            </td>
                                                            <td>
                                                                <Label htmlFor="name">Descripción Categoría</Label>
                                                            </td>
                                                            <td>
                                                                <Label htmlFor="name">Portada Categoría</Label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Input onChange={(e)=>this.handleText(index, e)} defaultValue={ categoryByMagicTown.name } type="text" id="name" name="name" />
                                                            </td>
                                                            <td>
                                                                <Input onChange={(e)=>this.handleText(index, e)} defaultValue={ categoryByMagicTown.description } type="textarea" rows={6} id="description" name="description" />
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <img src={`${Constants.APIURLBASE}${ categoryByMagicTown.image_category }`}
                                                                        width='200' id="actual_photo" name="actual_photo" alt="Sin imágen" />
                                                                    <Input onChange={(e)=>this.fileChangedHandler(index, e)} type="file" id="image_category" name="image_category" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>
                                                    :
                                                    <tr>
                                                        <td>
                                                            <Input onChange={(e)=>this.handleText(index, e)} defaultValue={ categoryByMagicTown.name } type="text" id="name" name="name" />
                                                        </td>
                                                        <td>
                                                            <Input onChange={(e)=>this.handleText(index, e)} defaultValue={ categoryByMagicTown.description } type="textarea" rows={6} id="description" name="description" />
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <img src={`${Constants.APIURLBASE}${ categoryByMagicTown.image_category }`}
                                                                    width='200' id="actual_photo" name="actual_photo" alt="Sin imágen" />
                                                                <Input onChange={(e)=>this.fileChangedHandler(index, e)} type="file" id="image_category" name="image_category" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                            ))
                                        :
                                            null
                                    }
                                    {
                                        (this.state.data[0] && this.state.data[0].name)
                                        ?   
                                            <tr>
                                                <td colSpan={3}>
                                                    <CardFooter>
                                                        <Button onClick={() => {this.btnGuardarChange(); this.saveData()} } color="primary" disabled={this.state.btnGuardar}>Guardar</Button>
                                                        &nbsp;&nbsp;
                                                        <Button onClick={() => this.cancelData()} color="warning">Cancelar</Button>
                                                    </CardFooter>
                                                </td>
                                            </tr>
                                        :
                                            null
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

export default Categories;


