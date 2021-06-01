import React, { Component } from "react";
import { Table } from "reactstrap";
import * as Constants from "../../constants/constants";

class TableHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      history:this.props
    };
  }
  componentWillMount() {
    const userId = localStorage.getItem("userId");
    fetch(Constants.APIURLBASE + `/api/v1/history/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
        console.log(this.state.history);
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-12 mx-auto main-container-table rounded shadow">
            <div class="table-responsive">
              <Table responsive>
                <thead>
                  <tr>
                    <th scope="col" class="col-3">
                      #
                    </th>
                    <th scope="col" class="col-3">
                      Tipo de Movimiento
                    </th>
                    <th scope="col" class="col-3">
                      Fecha de Movimiento
                    </th>
                    <th scope="col" class="col-3">
                      Cantidad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((item, index) => (
                    <tr>
                      <th className="col-3" scope="row">{index+1}</th>
                      <td className="col-3">
                        {
                          (item.type == 'deposit') ?
                            'Depósito'
                          :
                            'Retiro'
                        }
                      </td>
                      <td className="col-3">{item.created_at}</td>
                      <td className="col-3"> {item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableHistory;
