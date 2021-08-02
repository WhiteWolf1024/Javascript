import React, { useEffect, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "./PoolList.css";
import { useDispatch } from "react-redux";
import Header from "../../components/Container/Header/Header"
import otocoLogo from "../../assets/img/Otoco-logo.png";
import anotherLogo from "../../assets/img/another-pool.png";
import loadingImg from "../../assets/img/loading.gif";
import PoolItem from "../../components/Pool/PoolItem/PoolItem"
import Grid from "@material-ui/core/Grid";
import ConnectWalletModal from "../../components/Pool/ConnectWalletModal/ConnectWalletModal"

import poolData from "../../utils/poolData.json";
import Footer from "../../components/Container/Footer/Footer";

import { useWeb3React } from "@web3-react/core";
import { STAKING_CONTRACT_TRACKER_ADDR, STAKE_VAULT_ADDR, ERC20_ADDR, injected } from '../../constants';

import LAUNCHPOOLTRACKER_ABI from '../../constants/abis/launchpooltracker.json';
import STAKEVAULT_ABI from '../../constants/abis/stakevault.json';
import { ethers } from 'ethers';
import { setAddress } from "../../store/ducks/wallet";

import { MakeAmountStyle, setItem, getItem } from '../../utils/helper';

function useLaunchPoolTrackerContract() {
  const { library, active } = useWeb3React();
  return useMemo(() => {
      if (!active) {
        return null;
      }

      return new ethers.Contract(STAKING_CONTRACT_TRACKER_ADDR, LAUNCHPOOLTRACKER_ABI, library.getSigner());
  }, [library, active]);
}

function useStakeVaultContract() {
  const { library, active } = useWeb3React();
  return useMemo(() => {
      if (!active) {
        return null;
      }

      return new ethers.Contract(STAKE_VAULT_ADDR, STAKEVAULT_ABI, library.getSigner());
  }, [library, active]);
}

function useStakeVaultData(stakeVault) {
  const [stakeVaultData, setStakeVaultData] = useState({});

  const _fetchStakevaultData = async () => {
    if (!stakeVault) {
      return {
        totalStaked: 0
      }
    }
    
    const totalStaked = await stakeVault.totalDeposited().toString();

    return { totalStaked };
  }

  useEffect(() => {
    _fetchStakevaultData().then(setStakeVaultData);
  }, [stakeVault]);

  return stakeVaultData
}

function useLaunchPoolId(launchPoolTracker) {
  const [poolId, setPoolId] = useState(0);

  const _fetchPoolId = async () => {
    if(!launchPoolTracker)  return 0;

    console.log(launchPoolTracker)

    const poolIds = await launchPoolTracker.getPoolIds();
    console.log("HHHHH")
    console.log(poolIds)
    const poolId = poolIds[0];
    // const nextId = await launchPoolTracker.poolIds(1);
    // console.log(nextId)
    return poolId;
  }

  useEffect(()=>{
    _fetchPoolId().then(setPoolId);
  }, [launchPoolTracker])

  return poolId;
}

function useLaunchPoolData(launchPoolTracker, launchPoolId) {
  const [poolData, setPoolData] = useState({});

  const _fetchPoolData = async () => {
    if (!launchPoolTracker || launchPoolId == 0) {
      return [];
    }
    const launchPool = await launchPoolTracker.poolsById(launchPoolId);
    console.log("launchPool")
    console.log(launchPool)
    const name = await launchPool.name;
    const stage = (await launchPool.stage).toString();
    var status;
    if(stage == 0) status = 1;
    if(stage == 1) status = 2;
    if(stage == 2) status = 3;
    if(stage == 3) status = 3;
    const maxCommitment = (await launchPool.offer.bounds.maximum).toString();
    const minCommitment = (await launchPool.offer.bounds.minimum).toString();
    const stakeAmount = (await launchPool.totalStakeAmount).toString();
    const commitAmount = (await launchPool.totalCommitAmount).toString();
    const stakeCount = (await launchPool.stakeCount).toString();
    const commitCount = (await launchPool.commitCount).toString();
    const url = await launchPool.offer.url;
    const _endTime = parseInt(await launchPool.poolExpiry.startTime);
    const today = new Date();
    const todaytime = today.getTime()/1000;
    const duration = parseInt(await launchPool.poolExpiry.duration);
    const diffTime = Math.abs(_endTime + duration - todaytime);
    console.log(_endTime)
    console.log(todaytime);
    console.log(duration)
    console.log(diffTime)
    let daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    let expired = false;    
    if(_endTime + duration - todaytime < 0){
      daysLeft = daysLeft+" days Expired";
      expired = true;
    }

    return { name, maxCommitment, minCommitment, commitAmount, url, daysLeft, expired, stakeAmount, stakeCount, commitCount, status };
  }

  useEffect(() => {
    _fetchPoolData().then(setPoolData);
  }, [launchPoolTracker, launchPoolId]);

  return poolData
}

const PoolList = () => {
  const dispatch = useDispatch();

  const { active, activate, account } = useWeb3React();

  const launchPoolTracker = useLaunchPoolTrackerContract();
  const stakeVault = useStakeVaultContract();
  const launchPoolId = useLaunchPoolId(launchPoolTracker)
  const launchPoolData = useLaunchPoolData(launchPoolTracker, launchPoolId);
  const stakeVaultData = useStakeVaultData(stakeVault);
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [totalStakedAmount, setTotalStakeAmount] = useState(0.0);
  const [totalCommitAmount, setTotalCommitAmount] = useState(0.0);
  const [stakeCount, setStakeCount] = useState(0);
  const [commitCount, setCommitCount] = useState(0);
  const [myStakeAmount, setMyStakeAmount] = useState(0.0);

  const [expired, setExpired] = useState(false);

  const [address, setAddress] = React.useState("");

  const [loading, setLoading] = useState(true)
  const [wallet, setWallet] = React.useState(0);

  const [tab, setTab] = React.useState(0);
  const [responsive, setResponsive] = useState(false);

  useEffect(()=>{

    if(getItem('tab') == null)
      setTab(1);
    else
      setTab(getItem('tab'));

    setWallet(getItem('wallet'))
    console.log(getItem('wallet'))
    setResponsive(window.matchMedia("(min-width: 1440px)").matches);

    if(getItem('wallet')!=null)
      activate(injected);

    setCount(count+1)
    console.log(window.matchMedia("(min-width: 1440px)").matches)
  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    setItem('tab', newValue);
  };

  useEffect(()=>{
    if(!active){
      setItem('wallet', 0)
    }
    if(active){
      setItem('wallet', wallet)
    }
  }, [active])


  const setTotalCount = async () => {
    let queryFilter = launchPoolTracker.filters.Staked(launchPoolId, null, null, null, null);
    const accountStakes = await launchPoolTracker.queryFilter(queryFilter);
    console.log(accountStakes)
    setStakeCount(accountStakes.length)
    queryFilter = launchPoolTracker.filters.Committed(launchPoolId, null, null);
    const accountCommits = await launchPoolTracker.queryFilter(queryFilter);
    console.log(accountCommits)
    setCommitCount(accountCommits.length)
  }

  useEffect(() => {
    if (!active) {
      return;
    }
    
    setTotalCount();
    setAddress(account);
    _fetchStakedAmount()
    // setCount(count+1)

  }, [account, active, count]);

  const _fetchStakedAmount = async () => {
    setTotalStakeAmount(await launchPoolData.stakeAmount);
    setTotalCommitAmount(await launchPoolData.commitAmount);
    setMyStakeAmount((await launchPoolTracker.stakesOf(launchPoolId, account)).toString());
    setTotalCount();
  }

  useEffect(()=>{
    if(!active)
      return false;
    if(launchPoolData.name && launchPoolData.name.length>0)
      setLoading(false)
    setExpired(launchPoolData.expired);
  }, [launchPoolData])

  useEffect(()=>{
    if(!active)
      return false;
    // if(stakeVaultData.totalStaked!=0) 
    //   setLoading(false);    
  }, [stakeVaultData])

  useEffect(() => {
    if (!active) {
      return false;
    }

    _fetchStakedAmount();
  }, [active]);

  const connect = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (id) => {

    if(id==1){ // Metamask connection
      if (!window.ethereum || typeof window.ethereum.isMetaMask === "undefined"){
        alert("MetaMask is not installed. Please install MetaMask and try again.");
        return;
      }
      activate(injected);
      setItem('wallet', id)
      setWallet(id);
    }
  }

  return (
    <div className="blank">
      <div className="pool-list-body">
        <Header is_home={true} connect={connect} is_connected={!active || wallet==0} address={address}/>  
        {(!active && getItem('wallet') == 0) && 
          <div style={{width:'100vw', height:'70vh'}}>
          </div>
        }
        {(active || getItem('wallet')!=0) &&
        <div>
          {!responsive && 
            <h1 style={{margin: '20px 20px 20px 20px'}}>Open pools</h1>
          }
          <div className="pool-list-content">
            <Paper square className="pool-list-tab-body">
              <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
                centered
                inkBarStyle={{background: '#0081ED'}}
              >
                {responsive && <Tab label="UPCOMING POOLS" className="pool-list-tab-panel"/>}
                {!responsive && <Tab label="UPCOMING" className="pool-list-tab-panel"/>}
                {responsive &&<Tab label="OPEN POOLS" className="pool-list-tab-panel"/>}
                {!responsive &&<Tab label="OPEN" className="pool-list-tab-panel"/>}
                {responsive &&<Tab label="CLOSED POOLS" className="pool-list-tab-panel"/>}
                {!responsive &&<Tab label="CLOSED" className="pool-list-tab-panel"/>}
              </Tabs>
            </Paper>  
            <div className="pool-list-header-body">
              {responsive && tab==0 && <h1 className="pool-list-header-content">Get in line early for the best offer<br/> from the founders</h1>}
              {!responsive && tab==0 && <h2 className="pool-list-header-content">Get in line early for the best offer<br/> from the founders</h2>}
              {responsive && tab==1 && <h1 className="pool-list-header-content">Reserve your place for a future offering <br/>
  on a DeFi project</h1>}
              {!responsive && tab==1 && <h2 className="pool-list-header-content">Reserve your place for a future offering <br/>
  on a DeFi project</h2>}
              {responsive && tab==2 && <h1 className="pool-list-header-content">Closed pools for reference. <br/>
  Some are successful, some are not.</h1>}
              {!responsive && tab==2 && <h2 className="pool-list-header-content">Closed pools for reference. <br/>
  Some are successful, some are not.</h2>}
            </div>
            {!loading &&
            <Grid container spacing={0} className="pool-list-content-body">

              {/* UPCOMING POOLS */}
              {tab==0 && poolData.map((data, index)=>{
                if(data.pool_status == 0)
                  return (<Grid item xs={12} sm={6} md={4} key={index}>
                    <PoolItem 
                      title={data.title} 
                      content={data.content}
                      daysLeft={data.daysLeft}
                      stakes="0"
                      totalstaked="0"
                      staked = "0"
                      expired = {false}
                      commited="0"
                      commits="0"
                      id={data.id}
                      min="0"
                      max="0"

                      pool_status={data.pool_status} // 0: upcoming 1: new 2: commits 3: commits, new 4: closed
                    />
                  </Grid>);
              })}
              {/* OPEN POOLS */}
                 
              {tab== 1 &&                 
                <Grid item xs={12} sm={6} md={4} key={0}>
                  <PoolItem 
                    title={launchPoolData.name} 
                    content={"Compliant corporate structures “in-a-box” for DeFi"} 
                    stakes={launchPoolData.stakeCount}
                    totalstaked={launchPoolData.stakeAmount}
                    staked = {myStakeAmount}
                    expired = {launchPoolData.expired}
                    // daysLeft={launchPoolData.endTime}
                    daysLeft={launchPoolData.daysLeft}
                    commited={launchPoolData.commitAmount}
                    commits={launchPoolData.commitCount}
                    id="1" 
                    min={launchPoolData.minCommitment}
                    max={launchPoolData.maxCommitment}
                    pool_status={launchPoolData.status}
                    url={launchPoolData.url}
                  />
                </Grid>
              }
              {/* {tab==1 && poolData.map((data, index)=>{

                if(data.pool_status == 1 || data.pool_status == 2 || data.pool_status == 3)
                  return (<Grid item xs={12} sm={6} md={4} key={index}>
                    <PoolItem 
                      title={data.title} 
                      content={data.content}
                      stakes={data.stakes}
                      totalstaked={data.totalstaked}
                      staked = {data.staked}
                      expired = {data.expired}
                      daysLeft={data.daysLeft}
                      commited={data.commited}
                      commits={data.commits}
                      id={data.id}
                      min={data.min}
                      max={data.max}
                      stake_position={data.stake_position}
                      stake_token={data.stake_token}
                      commit_position={data.commit_position}
                      my_commited={data.my_commited}
                      commit_token={data.commit_token}
                      pool_status={data.pool_status} // 0: upcoming 1: new 2: commits 3: commits, new 4: closed
                    />
                  </Grid>);
              })} */}
                 
              {/* CLOSED POOLS */}
              {tab==2 && poolData.map((data, index)=>{
                if(data.pool_status == 4)
                  return (<Grid item xs={12} sm={6} md={4} key={index}>
                    <PoolItem 
                      title={data.title} 
                      content={data.content}
                      stakes={data.stakes}
                      totalstaked={data.totalstaked}
                      staked = {data.staked}
                      expired = {data.expired}
                      daysLeft={data.daysLeft}
                      commited={data.commited}
                      commits={data.commits}
                      id={data.id}
                      min={data.min}
                      max={data.max}
                      stake_position={data.stake_position}
                      stake_token={data.stake_token}
                      commit_position={data.commit_position}
                      my_commited={data.my_commited}
                      commit_token={data.commit_token}

                      pool_status={data.pool_status} // 0: upcoming 1: new 2: commits 3: commits, new 4: closed
                    />
                  </Grid>);
              })}
            </Grid>
            }
            {loading &&
              <div>
                <img className="loading2" src={loadingImg}></img>
              </div>
            }

              {/* <Grid item xs={12} sm={6} md={4}>
                <PoolItem 
                  logo={anotherLogo} 
                  title="Otoco.io" 
                  content="Automated Company Assembly on Blockchain" 
                  stakes="26"
                  totalstaked="231000"
                  staked = "2000"
                  expired = {false}
                  daysLeft="4"
                  commited="73000"
                  commits="7"
                  id="2" 
                  min="100000"
                  max="500000"
                  stake_position="14"
                  stake_token="1"
                  commit_position="6"
                  my_commited="30"
                  commit_token="1"
                  pool_status={0} // 0: upcoming 1: new 2: commits 3: commits, new 4: closed
                />
              </Grid> */}
            </Grid>
            {/* } */}
            {/* {loading &&
              <div>
                <img className="loading" src={loadingImg}></img>
              </div>
            } */}
          </div>
        </div>  
        }
        
        <Footer/> 
        <ConnectWalletModal open={open} handleClose={handleClose} handleSelect={handleSelect}></ConnectWalletModal>
      </div>
    </div>
    
  );
};

export default PoolList;
