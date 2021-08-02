import React, { useEffect  } from 'react';
import "../Main.css";
import zeroImg from "../../../assets/img/zero-img.png";
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { 
  Divider,
  TextField,
  Menu
 } from "@material-ui/core";
 import MailOutlineIcon from '@material-ui/icons/MailOutline';

import MenuItem from '@material-ui/core/MenuItem';

import metamaskLogo from "../../../assets/img/metamask-logo.png";
import coinbaseLogo from "../../../assets/img/coinbase-logo.png";
import anotherLogo from "../../../assets/img/another-logo.png";
import greenImg from "../../../assets/img/green-img.png"; 
import daiLogo from "../../../assets/img/dai-logo.png";
import usdcLogo from "../../../assets/img/usdc-logo.png";
import ethLogo from "../../../assets/img/eth-logo.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { MakeAmountStyle } from '../../../utils/helper';

import store from "../../../store";

const MyButton = styled(Button)({
  background: 'linear-gradient(0deg, #0377A8 30%, #4BC9FF 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  width: '100%',
  fontSize: 18,
  fontWeight: 700,
  fontFamily: 'sans-serif',
  // lineHeight: 22.5,
  textAlign: 'center'
});

const StakeForm = (props) => {  
  const { classes, wallet, address, setPoolStaked, staked, position, setStakeAmount, balance_eth, balance_abc, _mintTokens, crypto, setCrypto } = props;

  const [valid, setvalid] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id) => {
    setCrypto(id);
    setAnchorEl(null);
  };

  const emailChange = (email) => {
    setEmail(email)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(amount == null){
      setvalid(false);
      return;
    }
    if(!amount.match(/^-?\d*(\.\d+)?$/)){
      setvalid(false);
      return;
    }
    if(!re.test(String(email).toLowerCase())){
      setvalid(false);
      return;
    }
    if((email == '' || email == null) || (amount == '' || amount == null))
      setvalid(false)
    else
      setvalid(true)
  }

  const amountChange = (value) => {
    var amount = value.replace(/,/g, '');
    setStakeAmount(amount);
    setAmount(amount)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(amount == null){
      setvalid(false);
      return;
    }
    if(!amount.match(/^-?\d*(\.\d+)?$/)){
      setvalid(false);
      return;
    }
    if(!re.test(String(email).toLowerCase())){
      setvalid(false);
      return;
    }
    if((email == '' || email == null) || (amount == '' || amount == null))
      setvalid(false)
    else
      setvalid(true)
  }

  return (
    <>
      <div className="stake-form-body">
        <div className="connect-wallet-info-top">
          <div className="connect-wallet-info-position">        
            <div className="connect-wallet-info-positive-state">POSITION</div>  
            <div className="connect-wallet-info-positive-amount">{position}</div>
          </div>
          <div className="connect-wallet-blank">          
          </div>
          <div className="connect-wallet-info-stake">    
            <div className="connect-wallet-info-stake-state">STAKE</div>  
            <div className="connect-wallet-info-stake-amount">
              ${MakeAmountStyle(staked)}
            </div>          
          </div>
        </div>
        <div className="connect-wallet-address-body">
          Address: <strong className="connect-wallet-address-content">{address}</strong>
        </div>
        <div className="connect-wallet-address-body">
          ETH Balance: <strong className="connect-wallet-address-content">{balance_eth}</strong>
        </div>
        <div className="connect-wallet-address-body">
          MockERC20 Balance: <strong className="connect-wallet-address-content">{balance_abc}</strong>
        </div>
        <div className="connect-wallet-address-body">
          <button onClick={_mintTokens}>Mint 20</button>
        </div>
        <Divider className="stake-form-divider" style={{marginTop:10}}/>
        <div className="stake-form-contact-info-body">
          <MailOutlineIcon className="stake-form-contact-icon"/>
          Contact info
        </div>
        <TextField
          id="email"
          className='stake-form-email-input'
          style={{zIndex:100}}
          margin="normal"
          value={email}
          onChange={(e)=>{emailChange(e.target.value)}}
          placeholder="example@email.com"
          InputProps={{
              className: "stake-form-email-input-color",
          }}
        />
        <div className="stake-form-email-notify">
          You'll be notified if the sponsor makes an offer.
        </div>
        {/* <Divider className="stake-form-divider"/> */}
        {/* <div className="stake-form-connect-wallet">
          <div className="connect-wallet-logo">          
            {wallet==1 && <img className="stake-form-connect-wallet-logo-img" src={metamaskLogo}></img>}
            {wallet==2 && <img className="stake-form-connect-wallet-logo-img" src={coinbaseLogo}></img>}
            {wallet==3 && <img className="stake-form-connect-wallet-logo-img" src={anotherLogo}></img>}
          </div>
          <div className="stake-form-connect-wallet-name" id="stake-form-connect-wallet-name">
            {wallet==1 && 'Metamask Wallet'}
            {wallet==2 && 'Coinbase Wallet'}
            {wallet==3 && 'Another Wallet'}
          </div>
          <img className="stake-form-green-img" src={greenImg}></img>
          
        </div> */}
        <div style={{display:'flex'}}>
          <TextField
            id="amount"
            className='stake-form-email-input'
            style={{width:'60%'}}
            margin="normal"
            value={amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e)=>{amountChange(e.target.value)}}
            placeholder="123,456,789.00"
            InputProps={{
                className: "stake-form-email-input-color",
            }}
          />
          <div
            className='stake-form-crypto-input'
            style={{width:'35%', marginLeft:'5%'}}>
            {crypto==1&&<img className="stake-form-crypto-logo-img" src={daiLogo}></img>}
            {crypto==2&&<img className="stake-form-crypto-logo-img" src={ethLogo}></img>}
            {crypto==3&&<img className="stake-form-crypto-logo-img" src={usdcLogo}></img>}
            <div className="stake-form-crypto-name">
              {crypto==1&&'DAI'}
              {crypto==2&&'ETH'}
              {crypto==3&&'USDC'}
            </div>
            <ExpandMoreIcon onClick={handleClick}/>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={()=>{handleClose(crypto)}}
            >
              <MenuItem onClick={()=>{handleClose(1)}}>
                <img className="stake-form-crypto-logo-img" src={daiLogo}></img>
                <div className="stake-form-crypto-name">DAI</div>
              </MenuItem>
              <MenuItem onClick={()=>{handleClose(2)}}>
                <img className="stake-form-crypto-logo-img" src={ethLogo}></img>
                <div className="stake-form-crypto-name">ETH</div>
              </MenuItem>
              <MenuItem onClick={()=>{handleClose(3)}}>
                <img className="stake-form-crypto-logo-img" src={usdcLogo}></img>
                <div className="stake-form-crypto-name">USDC</div>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="connect-wallet-button">
          {valid&&!store.getState().display.expired&&
            <MyButton 
              id="connect-wallet-button" 
              onClick={()=>{
                setPoolStaked(1);
                setAmount("");}
              }
            >
              CREATE STAKE
            </MyButton>
          }
          {(!valid||store.getState().display.expired)&&
            <MyButton 
              id="connect-wallet-button" 
              className="stake-form-disable-button" 
              disabled
            >
              ADD STAKE
            </MyButton>
          }
        </div>
      </div>
    </>
  );
};

export default StakeForm;