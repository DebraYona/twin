import React, { Component } from "react";
import ApexCharts from "react-apexcharts";
//import ApexCharts from "apexcharts";
import { Col, Row } from "reactstrap";
import moment from "moment";
import color from "@material-ui/core/colors/lightGreen";
import * as Constants from "../../constants/constants";
import Dimensions from 'react-dimensions'

const generateDayWiseTimeSeries = moment.isDate;
const s = localStorage.getItem("color");
const jsonData = JSON.parse(s);
var propsColor;
export default class grafics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorSi: this.props.color,
      valueType: this.props.value,
      balance7: "",
      balance1: "",
      balance: [],
      series: [],
      options: {},
      data:[],
      ethForm:[],
    };
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    //console.log("el color si", nextProps.value);
    fetch(Constants.APIURLBASE + "api/v1/coins")
      .then(response => response.json())
      .then(data => {
      //  console.log(data.coins);
        this.setState({ data: data.coins });
      

        this.state.data.map(item => {
          // switch (item.symbol) {
          //   case "ETH":
          //     {
                
          //       this.setState({
          //       series: [
          //           {
          //             name: "Balance",
          //             data: [
          //               item.quote.USD.percent_change_24h,
          //               item.quote.USD.percent_change_1h,
          //               item.quote.USD.percent_change_7d
          //             ]
          //           }
          //         ]
          //       });
          //     }
          //     break;
          //   case "BTC":
          //     {
          //       this.setState({
          //         series: [
          //           {
          //             name: "Balance",
          //             data: [
          //               item.quote.USD.percent_change_24h,
          //               item.quote.USD.percent_change_1h,
          //               item.quote.USD.percent_change_7d
          //             ]
          //           }
          //         ]
          //       });
          //     }
          //     break;
          //   case "XRP":
          //     {
          //       this.setState({
          //         series: [
          //           {
          //             name: "Balance",
          //             data: [
          //               item.quote.USD.percent_change_24h,
          //               item.quote.USD.percent_change_1h,
          //               item.quote.USD.percent_change_7d
          //             ]
          //           }
          //         ]
          //       });
          //     }
          //     break;
          //   case "LTC": {
          //     this.setState({
          //       series: [
          //         {
          //           name: "Balance",
          //           data: [
          //             item.quote.USD.percent_change_24h,
          //             item.quote.USD.percent_change_1h,
          //             item.quote.USD.percent_change_7d
          //           ]
          //         }
          //       ]
          //     });
          //   }
          //   case "MXN": {
          //     this.setState({
          //       series: [
          //         {
          //           name: "Balance",
          //           data: [
          //             item.quote.USD.percent_change_24h,
          //             item.quote.USD.percent_change_1h,
          //             item.quote.USD.percent_change_7d
          //           ]
          //         }
          //       ]
          //     });
          //   }
          //   case "TWC": {
          //     this.setState({
          //       series: [
          //         {
          //           name: "Balance",
          //           data: [
          //             item.quote.USD.percent_change_24h,
          //             item.quote.USD.percent_change_1h,
          //             item.quote.USD.percent_change_7d
          //           ]
          //         }
          //       ]
          //     });
          //   }
          //   default:
          // }
        });
      })
      .catch(error => console.log(error));

    const valores = {
      chart: {
        width: "100%",
        height: 350,
        type: "line",
        colors: ["#541aff"],
        background: "#242833",
        foreColor: "#e6e0e0",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false,
          autoSelected: "zoom"
        }
      },
      colors: nextProps.color,
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Balance de Monedas",
        align: "left",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#e6e0e0"
        }
      },
      grid: {
        row: {
          colors: ["#232733"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ["MXN", "TWN", "BTC", "LTC", "ETH", "XRP"]
      }
    };
    const seriesVal = [
      {
        name: "Balance",
        data: [0.003, 0.002, 0.003, 0.005, 0.006, 0.001]
      }
    ];
    this.setState({ options: valores, series: seriesVal });
  }

  render() {
//console.log('colores',this.state.ethForm);
    //this.setState({colors:this.state.colorSi})
    // const heightCustom = (this.props.containerHeight * 2);
    // const widthCustom = (this.props.containerWidth * 2);
    const heightCustom = this.props.containerHeight;
    const widthCustom = this.props.containerWidth;
    return (
      <div id="chart">
        <ApexCharts
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={450}
        />
      </div>
    );
  }
}
