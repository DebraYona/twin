import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeContainerTypes } from '../../redux/actions/containerTypes';
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

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:''
        };  
    }


saveData = async () => {
 const response = await this.props.storeContainerTypes(this.state.name);
    if(response)
        this.props.history.push('/containerTypes');
}

handleText(e) {
    this.setState({[e.target.name]:e.target.value});
}


    render() {
        return(
        <div className="animated fadeIn">
            <Col xs="12" sm="12">
                <Card>
                    <CardHeader>
                        <strong>Agregar tipo de contenedor</strong>
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                        <Label htmlFor="company">Tipo de Contenedor</Label>
                        <Input  onChange={(e)=>this.handleText(e)} type="text" id="name" name="name" placeholder="Ingrese tipo" />
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => this.saveData()} color="primary">Guardar</Button>
                        <Link to="/containerTypes">
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
      containerTypes: state.containerTypes,
    };
  }  
  function mapDispatchToProps(dispatch) {
    return {
        storeContainerTypes: (name) => dispatch(storeContainerTypes(name)),
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Forms);
