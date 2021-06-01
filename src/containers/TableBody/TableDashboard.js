import React, { Component } from 'react';
import * as Constants from "../../constants/constants";


class TableDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const userId = localStorage.getItem("userId");
        fetch(Constants.APIURLBASE + `api/v1/orders/${userId}`)
          .then(response => response.json())
          .then(data => {
            this.setState({ data: data });
            console.log("ordenes por usuario", data);
          })
          .catch(error => console.log(error));
      }
    render() {
        return (
            <div className="card-style-left-down">
              <div class="row">
                <div class="col-lg-12 mx-auto  rounded ">
                  <div class="table-responsive">
                    <table class="table table-fixed">
                      <thead>
                        <tr>
                          <th scope="col" class="col-3">
                            Activo
                          </th>
                          <th scope="col" class="col-3">
                            Tipo
                          </th>
                          <th scope="col" class="col-3">
                            Fecha
                          </th>
                          <th scope="col" class="col-3">
                            Precio
                          </th>
                        </tr>
                      </thead>
                        <tbody>
                        {this.state.data.map(item => (
                          <tr>
                            <th className="col-3" scope="row">
                              {item.is_active == 1
                                ? "Activo"
                                : "Inactivo"}
                            </th>
                            <td className="col-3" scope="col">
                              {item.type}
                            </td>
                            <td className="col-3">{item.market}</td>
                            <td className="col-3">{item.price} </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default TableDashboard;