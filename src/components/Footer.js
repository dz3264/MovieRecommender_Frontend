import React from 'react';
import '../styles/Component.css';
import logo from "../image/logo.png";
import logor from "../image/logo-r.png";

class Footer extends React.Component{
    render() {
        return <div className="Footer">
            <div>
              <img className = "flogo" id = "footer_logor" width = {200} src = {logor}/>
            </div>
        </div>;
    }

}

export default Footer;
