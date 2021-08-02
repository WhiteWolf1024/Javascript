import "./Home.css";
import React, { useEffect, useMemo, useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import { STAKING_CONTRACT_ADDR, ERC20_ADDR, injected } from '../../constants';
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Header from "../../components/Container/Header/Header";
import Footer from "../../components/Container/Footer/Footer";
import { useHistory } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import ConnectWalletModal from "../../components/Pool/ConnectWalletModal/ConnectWalletModal";

import { MakeAmountStyle, setItem, getItem } from '../../utils/helper';
import { setAddress } from "../../store/ducks/wallet";
import { 
  setId,
  setStakes,
  setStaked,
  setTotalStaked,
  setDaysLeft,
  setMin,
  setMax,
  setName,
  setExpired,
  setBalance,
  setCommited,
  setCommits,
  setPoolStatus,
  setContent,
 } from "../../store/ducks/display";
import store from '../../store';

const contents = [
  {
    title: '1. Discover great projects',
    content: 'Tempor sunt dolore incididunt amet. Sunt sunt sint mollit incididunt nulla officia ut aliquip magna. Qui duis ea ut aliqua cupidatat exercitation in.'
  },
  {
    title: '2. Stake your risk-free claim',
    content: 'Tempor sunt dolore incididunt amet. Sunt sunt sint mollit incididunt nulla officia ut aliquip magna. Qui duis ea ut aliqua cupidatat exercitation in.'
  },
  {
    title: '3. Get an offer and commit',
    content: 'Tempor sunt dolore incididunt amet. Sunt sunt sint mollit incididunt nulla officia ut aliquip magna. Qui duis ea ut aliqua cupidatat exercitation in.'
  }
]

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { active, activate, account, chainId } = useWeb3React();
  const [open, setOpen] = React.useState(false);
  const [wallet, setWallet] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [count, setCount] = useState(0);
  var responsive = window.matchMedia("(min-width: 960px)").matches;

  useEffect(()=>{
    dispatch(setId(getItem('id')));
    dispatch(setStakes(getItem('stakes')));
    dispatch(setStaked(getItem('staked')));
    dispatch(setTotalStaked(getItem('totalstaked')));
    dispatch(setDaysLeft(getItem('daysLeft')));
    dispatch(setMin(getItem('min')));
    dispatch(setMax(getItem('max')));
    dispatch(setName(getItem('title')));
    dispatch(setExpired(getItem('expired')));
    dispatch(setBalance(getItem('balance')));    
    dispatch(setCommited(getItem('commited')));
    dispatch(setCommits(getItem('commits')));
    dispatch(setPoolStatus(getItem('pool_status')));
    dispatch(setContent(getItem('content')));

    setWallet(getItem('wallet'))

    if(getItem('wallet')!=null)
      activate(injected);

    setCount(count+1);
  },[])

  useEffect(()=>{
    if(!active){
      setItem('wallet', 0)
    }
    if(active){      
      setItem('wallet', wallet)
    }
  }, [active])

  useEffect(() => {
    if (!active) {
      return;
    }
    console.log("here")
    setAddress(account)
  }, [account, active, count, chainId]);

  const gotoPoolList = () => {
    history.push('pool_list');
  }
  const handleClose = () => {
    setOpen(false);
  };

  const connect = () => {
    setOpen(true);
  }

  const handleSelect = (id) => {

    if(id==1){ // Metamask connection
      if (!window.ethereum || typeof window.ethereum.isMetaMask === "undefined"){
        alert("MetaMask is not installed. Please install MetaMask and try again.");
        return;
      }
      // if(chainId != '42') {
      //   alert('Your metamask is not connected to correct network. Please connect to Kovan testnet.');
      //   return;
      // }
      // if(chainId != '1') {
      //   alert('Your metamask is not connected to correct network. Please connect to Ethereum Main Network.');
      //   return;
      // }
      activate(injected)
      setItem('wallet', id)
      setWallet(id);
    }
  }

  return (
    <div className="blank">
      <div className="home-body">
        <Header is_home={false} connect={connect} is_connected={!active || wallet==0} address={address}/>
        <div>
          <div className="home-background-title">
            Test the waters before you dive in
          </div>
          <div className="home-background-content">
            Express interest in emerging DeFi projects, risk-free
          </div>
        </div>
        <div className="home-background-button-body">
          <Button id="explore_pools" className="home-background-button" onClick={gotoPoolList}>
            EXPLORE POOLS
          </Button>
        </div>

        <div className="home-background">
        </div>
        <div className="home-background-left"></div>

        <div className="content">
          <div className="content-title">
            <div>
              How it works
            </div>
          </div>
          <Grid container spacing={0}>
            {
              contents.map((data, index)=>(
                <Grid item xs={12} sm={12} md={4}>
                  <div className="content-sub" key={index}>
                    <div className="content-subtitle">
                      {data.title}
                    </div>
                    <div className="content-subcontent">
                      {data.content}
                    </div>
                  </div>
                </Grid>
              ))
            }   
          </Grid>
               
          {!responsive && <div className="content-endcontent">
            Staking reserves your place for a future offering on this project. 
            <br/><br/>
            While staked, your funds earn interest at market rates and you may withdraw them at any time, risk-free.
            <br/><br/>
            If the project sponsor creates an offer, you will be contacted and given the option to make a firm commitment.
          </div>}
        </div>
        <Footer/>
        <ConnectWalletModal open={open} handleClose={handleClose} handleSelect={handleSelect}></ConnectWalletModal>
      </div>
    </div>
  );
};

export default Home;
