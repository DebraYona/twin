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
import timeGridPlugin from '@fullcalendar/timegrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
// import '@fullcalendar/dist/fullcalendar.print.min.css';
// import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import './Calendar.css';
import $ from 'jquery';
import moment from 'react-moment';

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


class AddOrEditDayRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            birthday: '',
            licenceNum: '',
            licenceTypeId: '',
            photo: '',
            vehicleTypeId: '',
            status: '',
            data: [],
            clients: [],
            dayRoutes: [],
            selectedClientId: 0,
            selectedClientName: '',
            day_route_order: 0,
            recollector_id: 0,
            driver_id: 0,
            // calendarEvents: [] // initial event data
            // calendarEvents {
            //   day_route: arg.dateStr,
            //   day_route_order: (this.state.day_route_order+1),
            //   driver_id: this.props.match.params.id,
            //   recollector_id: this.state.recollector_id,
            //   client_id: this.state.recollectorId,
            //   day_route: this.state.selectedClientId,
            //   status: 1,
            // }
        };
    }

    saveData() {
        fetch(Constants.APIURLBASE + 'dayRoutesFullCalendar', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({dayRoutes: this.state.dayRoutes}),
        }).then((response) => response.json())
            .then(async (responseJson) => {
            alert('Guardado con éxito');
            this.props.history.push('/dayRoute');
        });
    }
    
    handleText(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    fileChangedHandler = (event) => {
        this.setState({photo: event.target.files[0]});
    }

    componentWillMount () {
        this.fillDayRouteStates()
    }

    async fillDayRouteStates() {
        try{
            const recollectorId = localStorage.getItem('recollectorId');
            this.setState({'recollector_id': recollectorId});
            this.setState({'driver_id': this.props.match.params.id});

            fetch(Constants.APIURLBASE + 'driversList/' + this.props.match.params.id)
            .then((response) => response.json())
            .then(data => {
                this.setState({data});
            })
            .catch(error => console.log(error));

            fetch(Constants.APIURLBASE + 'getClientsByRecollectorId/' + recollectorId + '/1')
            .then((response) => response.json())
            .then(clients => {
                this.setState({clients});
            })
            .catch(error => console.log(error));

            fetch(Constants.APIURLBASE + 'getRouteWeeklyByDriverId/' + this.props.match.params.id)
            .then((response) => response.json())
            .then(dayRoutes => {
                // console.log(dayRoutes);
                this.setState({dayRoutes});
                // dayRoutes.map((dayRoute, key) => {
                //     this.setState( `{dayRoutes[key].start: moment(dayRoute.start).format("YYYY-MM-DD") }` );
                //     // <li key={item.id}>{item.name}</li>
                // });
                // this.setState({dayRoutes});
                // console.log(Constants.APIURLBASE + 'getRouteWeeklyByDriverId/' + this.state.driver_id);
            })
            .catch(error => console.log(error));
        } catch(e) {
            console.warn(e);
        }
    }

    handleDateClick = (arg) => {
        console.log(arg);
        if(this.state.selectedClientId!=0) {
            if (window.confirm('Crear ruta de cliente ' + this.state.selectedClientName + ' el día: ' + arg.dateStr + ' ?')) {
                // function(currentValue, index, arr), thisValue)
                // console.log((this.state.dayRoutes.some(function(dayRoute, index, dayRoute.start.substr(0, 10)), arg.dateStr));
                // if((this.state.dayRoutes.some((dayRoute => dayRoute.start.substr(0, 10)), index, this.state.dayRoutes), arg.dateStr)) && 
                // this.state.dayRoutes.map(dayRoute => {
                let flag = 0;
                for (var i = 0; i < this.state.dayRoutes.length; i++) {
                    if( (this.state.dayRoutes[i].start.substr(0, 10) == arg.dateStr) && 
                                (this.state.dayRoutes[i].client_id == parseInt(this.state.selectedClientId)) ){
                        flag = 1;
                    }
                }
                if(flag == 0) {
                    this.setState({ // add new event data
                        dayRoutes: this.state.dayRoutes.concat({ // creates a new array
                            title: this.state.selectedClientName,
                            day_route_order: (this.state.day_route_order+1),
                            start: arg.dateStr,
                            driver_id: this.state.driver_id,
                            recollector_id: this.state.recollector_id,
                            client_id: this.state.selectedClientId,
                            status: 1,
                        })
                        // { title: 'Event Now', start: new Date(), day_route_order: 1 }
                    })
                }
                else {
                    alert('No se puede agregar dos veces el mismo cliente, '
                            + this.state.selectedClientName + ' el mismo día ' + arg.dateStr + '.' );
                }
            }
            console.log(this.state.dayRoutes)
        }
        else {
            alert("Seleccione un cliente primero");
        }
    }

    removeEvents = (arg) => {
        if(arg.event.id && window.confirm('Seguro desea eliminar el evento ' + 
                arg.event.title + ' el día ' + 
                arg.event.start + ' ?')) {
            fetch(Constants.APIURLBASE + 'dayRoutes/' + arg.event.id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json())
                .then(async (responseJson) => {
                arg.event.remove();
                alert('Eliminado éxitosamente');
            });
        }
    }

    handleSubmit(e) {
        const fields = e.target.value.split(',');

        const clientId = fields[0];
        const clientName = fields[1];
        this.setState({'selectedClientId': clientId});
        this.setState({'selectedClientName': clientName});
        e.preventDefault();
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Ruta del día
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Fecha de nacimiento</th>
                                            <th>No. de licencia</th>
                                            <th>Tipo de licencia</th>
                                            <th>Foto</th>
                                            <th>Tipo de vehículo asignado</th>
                                            <th>Estatús</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.data.map(driver => (
                                            <tr key={driver.id}>
                                                <td>{driver.name}</td>
                                                
                                                <td>{driver.birthday.substring(0, 10)}</td>
                                                <td>{driver.licence_number}</td>
                                                <td>{driver.licenceType}</td>
                                                <td><img src={`${Constants.APIURLBASE}${driver.photo}`} width='50' /></td>
                                                <td>{driver.vehicleName}</td>
                                                <td>
                                                    {
                                                        (driver.status==1) ?
                                                            <span className="badge badge-success">Con Ruta</span>
                                                        :
                                                            <span className="badge badge-danger">Sin Ruta</span>
                                                    }
                                                </td>
                                            </tr>                                            
                                        ))
                                    }
                                    </tbody>
                                </Table>
                                {
                                    // <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
                                <div style={{ display: 'inline-block', marginTop: '10px' }}>
                                    <div className="px-4" style={{marginBottom: '20px'}}>
                                    {
                                        <div id='external-events'>
                                            <h4>Clientes</h4>
                                            {
                                                // console.log(this.state.clients)
                                                // <ClientsRow clients={this.state} />
                                                (this.state.clients[0]) ?
                                                    <Input type="select" id="client_id" name="client_id" onChange={(e)=>this.handleSubmit(e)} >
                                                        <option value="">Selecciona un Cliente</option>
                                                        {
                                                            this.state.clients.map(client => (
                                                                <option key={client.id} value={client.id+','+client.business_name}>{client.business_name}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                :
                                                    ''
                                            }
                                        </div>
                                    }
                                    </div>
                                    <div className="px-4">
                                        <FullCalendar
                                            // customButtons={{
                                            //     today: {
                                            //         text: 'Hoy',
                                            //     },
                                            // }}
                                            selectable={true}
                                            editable={true}
                                            allDaySlot={false}
                                            defaultView="dayGridWeek"
                                            header={{
                                                left: 'prev,next today',
                                                center: 'title',
                                                right: 'listWeek'
                                            }}
                                            // removeEvents={}
                                            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                                            weekends={true}
                                            events={this.state.dayRoutes}
                                            eventClick={ this.removeEvents }
                                            dateClick={ this.handleDateClick }
                                        />
                                    </div>
                                </div>
                              }

                            </CardBody>
                            <CardFooter>
                                <Button onClick={() => this.saveData()} color="primary">Guardar</Button>
                                &nbsp;&nbsp;
                                <Link to="/dayRoute">
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

// class Calendar extends React.Component {
//   render() {
//     return <div id="calendar"></div>;
//   }
//   componentDidMount() {
//     $('#calendar').fullCalendar({
//             header: {
//                 left: 'prev,next today',
//                 center: 'title',
//                 right: 'month,agendaWeek,agendaDay'
//             },
//             editable: true,
//             droppable: true, // this allows things to be dropped onto the calendar
//             drop: function() {
//                 // is the "remove after drop" checkbox checked?
//                 if ($('#drop-remove').is(':checked')) {
//                     // if so, remove the element from the "Draggable Events" list
//                     $(this).remove();
//                 }
//             }
//     })
//   }
// }

// class External extends React.Component {
//   render() {
//     return <div id='external-events'>
//             <h4>Draggable Events</h4>
//             <div className='fc-event'>My Event 1</div>
//             <div className='fc-event'>My Event 2</div>
//             <div className='fc-event'>My Event 3</div>
//             <div className='fc-event'>My Event 4</div>
//             <div className='fc-event'>My Event 5</div>
//             <p>
//                 <input type='checkbox' id='drop-remove' />
//                 <label for='drop-remove'>remove after drop</label>
//             </p>
//         </div>;
//   }
//   componentDidMount() {
//         $('#external-events .fc-event').each(function() {
//             // store data so the calendar knows to render an event upon drop
//             $(this).data('event', {
//                 title: $.trim($(this).text()), // use the element's text as the event title
//                 stick: true // maintain when user navigates (see docs on the renderEvent method)
//             });

//             // make the event draggable using jQuery UI
//             $(this).draggable({
//                 zIndex: 999,
//                 revert: true,      // will cause the event to go back to its
//                 revertDuration: 0  //  original position after the drag
//             });
//         });
//   }
// }

export default AddOrEditDayRoute;
