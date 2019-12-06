import React from "react";
import "./Header.css";
import Rocket from "../images/rocket.svg";
import Upload from "../images/upload.svg";
import {Link} from 'react-router-dom';

class Header extends React.Component {


  render() {
    const {name, filePath, handleFile} = this.props;
    return (
      <div className="header">
        <Link className="header-logo" to="/" style={{ width: "300px", height: "50px", display: "flex" }}>
          <img src={Rocket} alt="" />
          <p>Power Project</p>
        </Link>
        {/* <div className="header-logo" style={{ width: "300px", height: "50px", display: "flex" }}>
          <img src={Rocket} alt="" />
          <p>Power Project</p>
        </div> */}
        <p className="uppercaseBold">{name ? name.split(".xml")[0] : ""}</p>
        <input ref={inputFile => this.inputFile = inputFile} type="file" accept="text/xml" value={filePath} onChange={ev => handleFile(ev)}
          style={{ display: "none" }}/>
        <button type="button" onClick={()=>this.inputFile.click()}>
          <img src={Upload} alt="" />
          <p>APPLY PROJECT</p>
        </button>
      </div>
    );
  }
}

export default Header;
