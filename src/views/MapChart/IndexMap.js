import React, { Component, useState } from "react";
import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";


function App() {
    const [content, setContent] = useState("");
    return (
      <div>
        <MapChart setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </div>
    );
  }
  

class IndexMap extends Component {
   


  render() {
    return (
      <div>
        <App />
       
      </div>
    );
  }
}

export default IndexMap;
