import "../Main.css";
import React, { useState, useEffect, useMemo } from 'react';
import logo from "../../../assets/img/land-logo.png";
import desktop_logo from "../../../assets/img/desktop-logo.png";
import header_img from "../../../assets/img/header.png";
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import metamaskLogo from "../../../assets/img/metamask-logo.png";
import coinbaseLogo from "../../../assets/img/coinbase-logo.png";
import anotherLogo from "../../../assets/img/another-logo.png";

function convertAddress(addr) {
  return addr.slice(0, 6)+"..."+addr.slice(addr.length-4, addr.length)
}

const Header = (props) => {  
  const { is_home, connect, is_connected, address } = props;
  const history = useHistory();
  const [responsive, setResponsive] = useState(false);

  useEffect(()=>{
    setResponsive(window.matchMedia("(min-width: 1440px)").matches);
    console.log(window.matchMedia("(min-width: 1440px)").matches)
  }, []);

  const gotoHome = () => {
    history.push('/')
  }

  return (
    <>
      <div className="header-body" style={{backgroundImage:`url(${is_home==true?(responsive ? header_img : ''):''})`}}>
        <div className="header-logo-body">
          <a onClick={gotoHome}>
            {responsive && <img className="land-logo" src={desktop_logo}></img>}
            {!responsive && <img className="land-logo" src={logo}></img>}
          </a>    
        </div>   
        {responsive && <div className="header-button-body">
          <Button id="header-connect-wallet-button" className="home-connect-button" onClick={connect}>
            {is_connected && 'CONNECT WALLET'}
            {!is_connected && 
              <div style={{display:'flex'}}>
                <div style={{display:'flex', alignItems:'center', marginRight:'5px'}}>
                  {address && convertAddress(address)}
                </div>
                <div style={{display:'flex', alignItems:'flex-end'}}>
                  <div style={{backgroundColor:'#41BF78',borderRadius:'50px',width:'10px',height:'10px'}}></div>
                </div>
                <img className="connect-wallet-logo-img" src={metamaskLogo}></img>
                </div>}
          </Button>
        </div>}
      </div>
    </>
  );
};

export default Header;