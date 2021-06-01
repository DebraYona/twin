import React, { Component, useState } from "react";
import * as Constants from "../../constants/constants";
import {
  Col,
  Row,
  Card,
  Label,
  Form,
  Container,
  CarouselItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Chart from "../Apexfolder/grafics";
import Map from "../MapChart/IndexMap";
import { Button } from "reactstrap";
import CardBdy from "../../containers/CardBody/CardCoin";
import $ from "jquery";
import logoBtc from "../../assets/img/brand/btc.png";
import logoEth from "../../assets/img/brand/eth.png";
import logoLtc from "../../assets/img/brand/ltc.png";
import logoTwin from "../../assets/img/brand/twin.png";
import logoXrp from "../../assets/img/brand/xrp.png";
import logoMxn from "../../assets/img/brand/money-bag (1).png";
import { Input } from "@material-ui/core";
import TableDashboar from "../../containers/TableBody/TableDashboard"
import { Box } from "@material-ui/core";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: true,
      radioSelected: 2,
      roleIdUserLogged: localStorage.getItem('roleId'),
      mxn: '',
      twc: '',
      btc: '',
      ltc: '',
      eth: '',
      xrp: '',
      data: [],
      btcQuote: '+' + 2.5,
      ltcQuote: '+' + 2.5,
      ethQuote: '+' + 2.5,
      xrpQuote: '+' + 2.5,
      valueX: '',
      coins: [],
      price: '',
      quantity: '',
      type: '',
      priceSell: '',
      quantitySell: '',
      typeSell: '',
      balance: '',
      dropdownOpen: false,
      setDropdownOpen: false,
      ordersID: '',
      filterVal: false,
      valueChange: 'TWC',
      classLabel: 'title-card-twc',
      colors: ['#20a8d8'],
      isGoingOrd: true,
      isGoindTop: true,
      isGoinSell: true,
      balanceInPesos: '',
      selectedCurrency: '',
      selectedCurrencyBalance: ''
    };
    this.handlePrice = this.handlePrice.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handletype = this.handletype.bind(this);
    this.setBuyCard = this.setBuyCard.bind(this);
    this.setSellCard = this.setSellCard.bind(this);
    this.handleQuantitySell = this.handleQuantitySell.bind(this);
    this.handletypeSell = this.handletypeSell.bind(this);
    this.handlePriceSell = this.handlePriceSell.bind(this);
    this.changefilt = this.changefilt.bind(this);
    this.handleIsGoing = this.handleIsGoing.bind(this);
    this.handleIsGoingBuy = this.handleIsGoingBuy.bind(this);
    this.handleIsGoingSell = this.handleIsGoingSell.bind(this);
  }
  handleIsGoing() {
    this.setState({
      isGoingOrd: !this.state.isGoingOrd,
      isGoinBuy: false,
      isGoinSell: false
    });
    console.log("its here");
    const userId = localStorage.getItem("userId");
    if (this.state.isGoingOrd === true) {
      fetch(Constants.APIURLBASE + `/api/v1/orders/active/${userId}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ data: data });
          console.log("isGoin true", data);
        })
        .catch(error => console.log(error));
    } else {
      fetch(Constants.APIURLBASE + `api/v1/orders/${userId}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ data: data });
          console.log("isGoin false", data);
        })
        .catch(error => console.log(error));
    }
  }
  handleIsGoingBuy() {
    this.setState({
      isGoingTop: !this.state.isGoingTop,
      isGoinBuy: false,
      isGoinSell: false
    });
    console.log("its here");
    const userId = localStorage.getItem("userId");
    if (this.state.isGoingTop != true) {
      fetch(Constants.APIURLBASE + "/api/v1/latest_buy")
        .then(response => response.json())
        .then(data => {
          this.setState({ data: data });
          console.log("isGoinTop true", data);
        })
        .catch(error => console.log(error));
    } else {
      fetch(Constants.APIURLBASE + `api/v1/orders/${userId}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ data: data });
          console.log("isGoinTop false", data);
        })
        .catch(error => console.log(error));
    }
  }
  handleIsGoingSell() {
    this.setState({
      isGoinSell: !this.state.isGoinSell,
      isGoinBuy: false,
      isGoinBuy: false
    });
    console.log("its here SELL");
    const userId = localStorage.getItem("userId");
    if (this.state.isGoinSell == true) {
      fetch(Constants.APIURLBASE + "/api/v1/latest_sell")
        .then(response => response.json())
        .then(data => {
          this.setState({ data: data });
          console.log("isGoinTop true", data);
        })
        .catch(error => console.log(error));
    } else {
      fetch(Constants.APIURLBASE + `api/v1/orders/${userId}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ data: data });
          console.log("isGoinTop false", data);
        })
        .catch(error => console.log(error));
    }
  }

  componentDidMount() {
    // $(".container-fomr-mxn").on("click", function() {
    //   $(".card-mxn").toggleClass("flipped-mxn");
    //   console.log("jala");
    // });

    // $(".container-fomr-twc").on("click", function() {
    //   $(".card-twc").toggleClass("flipped-twc");
    //   console.log("jala");
    // });

    // $(".container-fomr-btc").on("click", function() {
    //   $(".card-btc").toggleClass("flipped-btc");
    //   console.log("jala");
    // });

    // $(".container-fomr-ltc ").on("click", function() {
    //   $(".card-ltc").toggleClass("flipped-ltc");
    //   console.log("jala");
    // });

    // $(".container-fomr-eth").on("click", function() {
    //   $(".card-eth").toggleClass("flipped-eth");
    //   console.log("jala");
    // });
    // $(".container-fomr-xrp").on("click", function() {
    //   $(".card-xrp").toggleClass("flipped-xrp");
    //   console.log("jala");
    // });
    // $("#xrp").on("click", function() {
    //   $(".card").toggleClass("flipped");
    //   console.log("jala");
    // });
    const coins = [
      {
        name: 'TWC',
        resurce: logoTwin
      },
      {
        name: 'MXN',
        resurce: logoMxn
      },
      {
        name: 'BTN',
        resurce: logoBtc
      },
      {
        name: 'ETH',
        resurce: logoEth
      },
      {
        name: 'XRP',
        resurce: logoXrp
      }
    ]
    console.log('.........',coins);
    this.setState({coins:coins})

    const userId = localStorage.getItem("userId");
    fetch(Constants.APIURLBASE + `api/v1/orders/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
        console.log("ordenes por usuario", data);
      })
      .catch(error => console.log(error));
  }
  componentWillMount() {
    const roleId = localStorage.getItem("roleId");
    const userId = localStorage.getItem("userId");
    const recollectorId = localStorage.getItem("recollectorId");
    // console.log(
    //   "roleId:",
    //   roleId,
    //   "userId:",
    //   userId,
    //   "recollectorId:",
    //   recollectorId
    // );

    fetch(Constants.APIURLBASE + `api/v1/balances/${userId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ balance: data });
        console.log(data);
        this.setState({
          mxn: data.mxn,
          twc: data.twc,
          btc: data.btc,
          ltc: data.ltc,
          eth: data.eth,
          xrp: data.xrp
        });
        console.log('data: ', data);
        console.log('balanceInPesos: ', data.mxn);
        this.setState({balanceInPesos: data.mxn},() => {});
        this.setState({selectedCurrency: 'TWC'},() => {});
        this.setState({selectedCurrencyBalance: data.twc},() => {});
        localStorage.setItem("datas", JSON.stringify(data));
      })
      .catch(error => console.log(error));

    fetch(Constants.APIURLBASE + "api/v1/coins")
      .then(response => response.json())
      .then(data => {
        console.log(data.coins);
        this.setState({ data: data.coins });
        data.coins.map(item => {
          //   console.log(item);

          this.setState({ valueX: item.symbol });
          switch (item.symbol) {
            case "ETH":
              {
                this.setState({
                  btcQuote: item.quote.USD.percent_change_24h
                });
              }
              break;
            case "BTC":
              {
                this.setState({
                  ethQuote: item.quote.USD.percent_change_24h,
                });
              }
              break;
            case "XRP":
              {
                this.setState({
                  xrpQuote: item.quote.USD.percent_change_24h
                });
              }
              break;
            case "LTC": {
              this.setState({
                ltcQuote: item.quote.USD.percent_change_24h
              });
            }
            default:
          }
        });
      })
      .catch(error => console.log(error));
  }
  handlePrice(event) {
    this.setState({ price: event.target.value });
  }
  handleQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  handletype(event) {
    this.setState({ type: event.target.value });
  }
  handlePriceSell(event) {
    this.setState({ priceSell: event.target.value });
  }
  handleQuantitySell(event) {
    this.setState({ quantitySell: event.target.value });
  }

  handletypeSell(event) {
    this.setState({ typeSell: event.target.value });
  }
  setBuyCard(event) {
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    fetch(Constants.APIURLBASE + "/api/v1/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        type: "BUY",
        amount: this.state.quantity,
        market: "MXN/" + this.state.valueChange
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      window.location.reload();
    })
    .catch(error => console.log(error));
  }
  setSellCard(event) {
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    fetch(Constants.APIURLBASE + "/api/v1/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        type: "SELL",
        amount: this.state.quantity,
        market: "MXN/" + this.state.valueChange
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      window.location.reload();
    })
    .catch(error => console.log(error));
  }
  returnColorBtc() {
    if (Math.sign(this.state.ltcQuote) == -1) {
      return (
        <Label className="color-balance-negative ">
          {" "}
          {this.state.btcQuote.toFixed(4)}{" "}
        </Label>
      );
    } else {
      return (
        <Label className="color-balance-positive ">
          {this.state.btcQuote}{" "}
        </Label>
      );
    }
  }
  returnColorXrp() {
    if (Math.sign(this.state.ltcQuote) == -1) {
      return (
        <Label className="color-balance-negative ">
          {this.state.xrpQuote.toFixed(4)}
        </Label>
      );
    } else {
      return (
        <Label className="color-balance-positive ">
          {" "}
          {this.state.xrpQuote}{" "}
        </Label>
      );
    }
  }
  returnColorLtc() {
    if (Math.sign(this.state.ltcQuote) == -1) {
      return (
        <Label className="color-balance-negative ">
          {" "}
          {this.state.ltcQuote.toFixed(4)}{" "}
        </Label>
      );
    } else {
      return (
        <Label className="color-balance-positive ">
          {" "}
          {this.state.ltcQuote}{" "}
        </Label>
      );
    }
  }
  returnColorEth() {
    if (Math.sign(this.state.ltcQuote) == -1) {
      return (
        <Label className="color-balance-positive ">
          {" "}
          {this.state.ethQuote.toFixed(4)}{" "}
        </Label>
      );
    } else {
      return (
        <Label className="color-balance-negative ">
          {" "}
          {this.state.ethQuote}
        </Label>
      );
    }
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onClickIconBtc() {
    this.setState({
      valueChange: "BTC",
      classLabel: "title-card-btc",
      colors: ["#ffd340"]
    });
    var colores =this.state.colors;
    localStorage.setItem("color", JSON.stringify(colores));
    console.log(this.state.colors);
  }
  onClickIconMxn() {
    this.setState({
      valueChange: "MXN",
      classLabel: "title-card-mxn",
      colors: ["#4ebc42"]
    });
    var colores =this.state.colors;
    localStorage.setItem("color", JSON.stringify(colores));
    console.log(this.state.colors);
  }
  onClickIconXrp() {
    this.setState({
      valueChange: "XRP",
      classLabel: "title-card-xrp",
      colors: ["#1a97ff"]
    }); 
    var colores =this.state.colors;
    localStorage.setItem("color", JSON.stringify(colores));
    console.log(this.state.colors);
  }
  onClickIconEth() {
    this.setState({
      valueChange: "ETH",
      classLabel: "title-card-eth",
      colors: ["#a25bff"]
    });
    var colores =this.state.colors;
    localStorage.setItem("color", JSON.stringify(colores));
    console.log(this.state.colors);
  }
  onClickIconltc() {
    this.setState({
      valueChange: "LTC",
      classLabel: "title-card-ltc",
      colors: ["#2ccdc5"]
    }); 
    var colores =this.state.colors;
    localStorage.setItem("color", JSON.stringify(colores));
    console.log(this.state.colors);
  }
  onClickIconTwc() {
    this.setState({
      valueChange: "TWC",
      classLabel: "title-card-twc",
      colors: ["#20a8d8"]
    });
    var colores =this.state.colors;
    localStorage.setItem("color", JSON.stringify(colores));
  }

  setDropdownOpen() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  changefilt(item) {}

  renderFilter() {
    var selVal = "SELL";
    return (
      <div className="main-container-filter">
        <Label
          className="button-styles"
          onClick={() => this.setState({ filterVal: !this.state.filterVal })}
        >
          Filtro
        </Label>
        {this.state.filterVal == true ? (
          <div className="container-filter">
            <Label className="style-input" check>
              <Input
                type="checkbox"
                name="radio1"
                value={this.state.isGoingOrd}
                onChange={this.handleIsGoing}
                className="space-input"
              />{" "}
              Or´s Activas
            </Label>
            <Label className="style-input" check>
              <Input
                type="checkbox"
                name="radio2"
                className="space-input"
                value={this.state.isGoindTop}
                onChange={this.handleIsGoingBuy}
              />{" "}
              Top 10 Ventas
            </Label>
            <Label className="style-input" check>
              <Input
                type="checkbox"
                name="radio3"
                className="space-input"
                value={this.state.isGoinSell}
                onChange={this.handleIsGoingSell}
              />{" "}
              Top 10 Compras
            </Label>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  render() {
    //  if(true ){

      if (this.state.roleIdUserLogged == 1 || this.state.roleIdUserLogged == 2) {
      return (
        <div className="animated fadeIn">
          <Row className = "justify-content-md-center">
            <Col md="auto">
              <h1 className="title-h1 d-md-down-none">{Constants.TITLEAPP}!</h1>
              <h4 className="title-h1 d-lg-none margin-top-title-mobile">{Constants.TITLEAPP}!</h4>
              <br />

              <div className="row d-md-down-none">
                <div className="col-sm-12">
                  <h6 className="title-h6 float-right">
                    <div className='div_container'>
                      <div className='div_left'>
                        Total en {this.state.selectedCurrency}
                      </div>
                      <div className='div_right'>
                        { (this.state && this.state.selectedCurrencyBalance) ? this.state.selectedCurrencyBalance : null }
                      </div>
                    </div>
                  </h6>
                  <br />
                  <h6 className="title-h6 float-right">
                    <div className='div_container'>
                      <div className='div_left'>
                        Total en MXN
                      </div>
                      <div className='div_right'>
                        { (this.state && this.state.balanceInPesos) ? this.state.balanceInPesos : null }
                      </div>
                    </div>
                  </h6>
                </div>
              </div>

              <div className="row margin-top-balance-mobile d-lg-none">
                <div className="col-sm-12">
                  <h6 className="title-h6 float-right">
                    <div className='div_container'>
                      <div className='div_left'>
                        Total en {this.state.selectedCurrency}
                      </div>
                      <div className='div_right'>
                        { (this.state && this.state.selectedCurrencyBalance) ? this.state.selectedCurrencyBalance : null }
                      </div>
                    </div>
                  </h6>
                  <br />
                  <h6 className="title-h6 float-right">
                    <div className='div_container'>
                      <div className='div_left'>
                        Total en MXN
                      </div>
                      <div className='div_right'>
                        { (this.state && this.state.balanceInPesos) ? this.state.balanceInPesos : null }
                      </div>
                    </div>
                  </h6>
                </div>
              </div>

              <div className="row-edit">
                <div className="col-12 col-md-6 col-lg-7">

                  <div className="main-container-dash-cards">
                    <div className="container-Dashboard-cards">
                        <div class="row justify-content-center">
                          {this.state.coins.map((data) => {
                            return(              
                            <div class=" col-6 col-md-6 col-lg-4 col-xl-2 logosTwin" >
         
                                  <div style={{borderRadius: '4px'}}
                                      id="twc"
                                      onClick={this.onClickIconTwc.bind(this)}>
                                    <div  style={{width:'100%',height:'100%',boxShadow: '0 6px 16px black',
    cursor: 'pointer',
    padding: '10px'}}>
                                      <div className="front" style={{width:'100%',height:'100%'}}>
                                        <img
                                          src={data.resurce}
                                          style={{ width: "100%",margin:'auto' }} />
                                        <div className="text-center" style={{color:'white',marginTop:10}}>
                                          {data.name}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
 
                              </div>
                          )
                          })}
                          {/* <div class="col-sm-6 col-md-2">
                            <div className="container-fomr-twc"
                                id="twc"
                                onClick={this.onClickIconTwc.bind(this)}>
                              <div className="card-twc">
                                <div className="front">
                                  <img
                                    src={logoTwin}
                                    style={{ width: "82px" }} />
                                  <Label className="label-style-card-dash">
                                    TWC
                                  </Label>
                                </div>
                                <div className="back">
                                  <Label className="text-align-top">TWC</Label>
                                  <Label>Balance: {this.state.twc}</Label>
                                  <Label className="text-align-bot">+2.3</Label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-sm-6 col-md-2">
                            <div className="d-lg-none">&nbsp;</div>
                            <div className="container-fomr-mxn"
                                onClick={this.onClickIconMxn.bind(this)}>
                              <div className="card-mxn">
                                <div className="front">
                                  <img
                                    src={logoMxn}
                                    style={{ width: "72px" }} />
                                  <Label className="label-style-card-dash">
                                    MXN
                                  </Label>
                                </div>
                                <div className="back">
                                  <Label className="text-align-top">MXN</Label>
                                  <Label>Balance: {this.state.mxn}</Label>
                                  <Label className="text-align-bot">+2.3</Label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-sm-6 col-md-2">
                            <div className="d-lg-none">&nbsp;</div>
                            <div className="container-fomr-btc"
                                id="btc"
                                onClick={this.onClickIconBtc.bind(this)}>
                              <div className="card-btc">
                                <div className="front">
                                  <img
                                    src={logoBtc}
                                    style={{ width: "82px" }} />
                                  <Label>BTC</Label>
                                </div>
                                <div className="back">
                                  <Label className="text-align-top">BTC</Label>
                                  <Label>Balance: {this.state.btc}</Label>
                                  <Label className="text-align-bot">
                                    {this.state.valueX != "BTC"
                                      ? this.returnColorBtc()
                                      : "n"}
                                  </Label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-sm-6 col-md-2">
                            <div className="d-lg-none">&nbsp;</div>
                            <div className="container-fomr-ltc"
                              id="ltc"
                              onClick={this.onClickIconltc.bind(this)}>
                              <div className="card-ltc">
                                <div className="front">
                                  <img
                                    src={logoLtc}
                                    style={{ width: "70px" }} />
                                  <Label className="label-style-card-dash">
                                    LTC
                                  </Label>
                                </div>
                                <div className="back">
                                  <Label className="text-align-top">LTC</Label>
                                  <Label>Balance: {this.state.ltc}</Label>
                                  <Label className="text-align-bot">
                                    {this.state.valueX != "LTC"
                                      ? this.returnColorLtc()
                                      : "n"}
                                  </Label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-sm-6 col-md-2">
                            <div className="d-lg-none">&nbsp;</div>
                            <div className="container-fomr-eth"
                              id="eth"
                              onClick={this.onClickIconEth.bind(this)} >
                              <div className="card-eth">
                                <div className="front">
                                  <img
                                    src={logoEth}
                                    style={{ width: "85px" }} />
                                  <Label>ETH</Label>
                                </div>
                                <div className="back">
                                  <Label className="text-align-top">ETH</Label>
                                  <Label>Balance: {this.state.eth}</Label>
                                  <Label className="text-align-bot">
                                    {this.state.valueX != "ETH"
                                      ? this.returnColorEth()
                                      : "n"}
                                  </Label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-sm-6 col-md-2">
                            <div className="d-lg-none">&nbsp;</div>
                            <div className="container-fomr-xrp"
                                id="xrp"
                                onClick={this.onClickIconXrp.bind(this)}>
                              <div className="card-xrp">
                                <div className="front">
                                  <img
                                      src={logoXrp}
                                      style={{ width: "68px" }} />
                                  <Label className="label-style-card-dash">
                                    XRP
                                  </Label>
                                </div>
                                <div className="back">
                                  <Label className="text-align-top">XRP</Label>
                                  <Label>Balance: {this.state.xrp}</Label>
                                  <Label className="text-align-bot">
                                    {this.state.valueX != "XRP"
                                      ? this.returnColorXrp()
                                      : "n"}
                                  </Label>
                                </div>
                              </div>
                            </div>
                          </div> */}

                        </div>
              

                    </div> 
                    <div className="container-map container-Fluid ">
                      <Chart color={this.state.colors} value={this.state.valueChange} />
                    </div>

                  </div>
                  
                </div>
                

                <div className="container-right-card col-12 col-md-6 col-lg-5">
                  <div className="col-12" style={{paddingLeft:0, paddingRight:0,}}>
                    <div className="background-cardleft">

                      <Container>
                        <Row>
                          <div class="col-md-6" style={{paddingLeft:5, paddingRight:5,}}>
                            <div className="style-container-card">
                              <div className="container" >
                                <Form
                                  className="class-form"
                                  onSubmit={this.setBuyCard}>
                                  <Label className={this.state.classLabel}>
                                    Comprar {this.state.valueChange}
                                  </Label>
                                  {/* <Label>Precio</Label>
                                <Input
                                    className="space-input"
                                    placeholder="Ingresa Monto"
                                    type="number"
                                    value={this.state.price}
                                    onChange={this.handlePrice}
                                    
                                  ></Input> */}
                                  <Label>Cantidad</Label>
                                  <Input
                                    className="space-input"
                                    placeholder="Ingresa cantidad"
                                    type="number"
                                    value={this.state.quantity}
                                    onChange={this.handleQuantity}
                                    required
                                  ></Input>
                                  <Label>Mercado</Label>
                                  <Input
                                    disabled
                                    className="space-input"
                                    type="text"
                                    placeholder={"MXN " + this.state.valueChange}
                                    value={this.state.type}
                                    onChange={this.handletype}
                                    onkeypress="return /[a-z]/i.test(event.key)"
                                  ></Input>
                                  <br />
                                  <div className="button-container">
                                    <Button className="btn-container bg-success">
                                      {" "}
                                      Comprar{" "}
                                    </Button>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6" style={{paddingLeft:5, paddingRight:5,}}>
                            <div className="style-container-card">
                              <div className="container" >
                                <Form
                                  className="class-form "
                                  onSubmit={this.setSellCard}>
                                  <Label className={this.state.classLabel}>
                                    Vender {this.state.valueChange}
                                  </Label>
                                  {/* <Label>Precio</Label>
                                  <Input
                                    className="space-input"
                                    placeholder="Ingresa Monto"
                                    type="number"
                                    value={this.state.priceSell}
                                    onChange={this.handlePriceSell}
                                    required
                                  ></Input> */}
                                  <Label>Cantidad</Label>
                                  <Input
                                    className="space-input"
                                    placeholder="Ingresa cantidad"
                                    type="number"
                                    value={this.state.quantitySell}
                                    onChange={this.handleQuantitySell}
                                    required
                                  ></Input>
                                  <Label>Mercado</Label>
                                  <Input
                                    className="space-input"
                                    type="text"
                                    placeholder={"MXN/ " + this.state.valueChange}
                                    value={this.state.typeSell}
                                    onChange={this.handletypeSell}
                                    disabled
                                  ></Input>
                                  <br />
                                  <div className="button-container">
                                    <Button className="btn-container bg-danger">
                                      {" "}
                                      Vender{" "}
                                    </Button>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                        </Row>
                      </Container>
                    </div>
                  </div>

                  <div> {this.renderFilter()}</div>
                  <TableDashboar></TableDashboar>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Dashboard;
