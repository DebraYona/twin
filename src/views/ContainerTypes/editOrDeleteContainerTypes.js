import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteContainerTypes, fetchContainerTypes ,obtainContainerTypes, updateContainerTypes } from '../../redux/actions/containerTypes';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
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
} from 'reactstrap';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class EditOrDeleteContainerType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: null
        };
    }

    componentWillMount = async () => {
        this.setState({id:this.props.match.params.id});
        await this.props.fetchContainerTypes(this.props.match.params.id);
    }


    handleText(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    delete = async () => {
       await this.props.deleteContainerTypes(this.state.id);
        this.props.history.push('/containerTypes');
    }

    saveData = async () => {
        await this.props.updateContainerTypes(this.state.name, this.state.id);
        this.props.history.push('/containerTypes');
    }


    goBack() {
        this.props.obtainContainerTypes();
        this.props.history.push('/containerTypes');
    }


    render() {
        const { containerTypes, isFetching } = this.props.containerTypes;
        if(isFetching) {
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
                        <strong>Agregar tipo de contenedor</strong>
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                        <Label htmlFor="company">Tipo de contenedor</Label>
                        <Input  onChange={(e)=>this.handleText(e)} defaultValue={containerTypes.name} type="text" id="name" name="name" placeholder="Ingrese tipo" />
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => this.saveData()} color="primary">Guardar</Button>
                        <Button onClick={() => this.delete()} color="danger">Eliminar</Button>
                        <Button onClick={() => this.goBack()} color="warning">Cancelar</Button>
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
        fetchContainerTypes: (id) => dispatch(fetchContainerTypes(id)),
        obtainContainerTypes: () => dispatch(obtainContainerTypes()),
        deleteContainerTypes: (idType) => dispatch(deleteContainerTypes(idType)),
        updateContainerTypes: (type, id) => dispatch(updateContainerTypes(type, id))
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditOrDeleteContainerType);


