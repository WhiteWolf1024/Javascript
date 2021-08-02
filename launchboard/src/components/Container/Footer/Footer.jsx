import "../Main.css";
import logo from "../../../assets/img/land-logo.png";
import desktop_logo from "../../../assets/img/desktop-logo.png";
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

const Footer = () => {  
  const history = useHistory();
  var responsive = window.matchMedia("(min-width: 960px)").matches;

  const gotoPoolList = () => {
    history.push('pool_list');
  }

  return (
    <>
      <div className="footer-body">
        <div className="footer-risk-button-body">
          <Button id="footer-risk-free-button" className="home-foreground-button">
            How risk-free staking works?
          </Button>
        </div>
        <div className="footer-explore-button-body">
          <Button id="footer-explore-pools-button" className="home-background-button" onClick={()=>{gotoPoolList()}}>
            EXPLORER POOLS
          </Button>
        </div>
      </div>
      {responsive && <div className="footer-license-body">
        <div className="footer-license-left-body">
          <img className="land-logo" src={logo}></img>
          <div className="footer-license-content">
            LaunchPools is a Maxos.Studio venture. Copyright © 2020 MAXOS, LLC
          </div>
        </div>
        <div className="footer-license-right-body">
          <a className="footer-license-privacy-button">
            Privacy Policy & Terms of Use
          </a>
        </div>
      </div>
      }
      {!responsive && <div>
        <div className="footer-license-body">
          <div className="footer-license-left-body">
            <img className="land-logo" src={logo}></img>
          </div>
          <div className="footer-license-right-body">
            <a className="footer-license-privacy-button">
              Privacy Policy & Terms of Use
            </a>
          </div>
        </div>
        <div className="footer-license-content">
          LaunchPools is a Maxos.Studio venture. Copyright © 2020 MAXOS, LLC
        </div>
      </div>
      }
    </>
  );
};

export default Footer;