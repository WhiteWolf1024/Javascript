import React, { useState, useEffect, useMemo } from 'react';
import "./Pool.css";
import { useDispatch } from "react-redux";
import { 
  Divider
 } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import Header from "../../components/Container/Header/Header"
import PoolTitle from "../../components/Pool/PoolTitle/PoolTitle"
import SharePool from "../../components/Pool/SharePool/SharePool"
import PoolProgress from "../../components/Pool/PoolProgress/PoolProgress"
import ConnectWallet from "../../components/Pool/ConnectWallet/ConnectWallet"
import StakeList from "../../components/Pool/StakeList/StakeList"
import StakeForm from "../../components/Pool/StakeForm/StakeForm"
import ConnectWalletModal from "../../components/Pool/ConnectWalletModal/ConnectWalletModal"
import Congratulation from "../../components/Pool/Congratulation/Congratulation"
import CommitedStake from "../../components/Pool/CommitedStake/CommitedStake"

import daiLogo from "../../assets/img/dai-logo.png";
import usdcLogo from "../../assets/img/usdc-logo.png";
import ethLogo from "../../assets/img/eth-logo.png";
import loadingImg from "../../assets/img/loading.gif";

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
  setUrl,
  setMyCommited,
 } from "../../store/ducks/display";
import store from '../../store';

import { useWeb3React } from "@web3-react/core";
import { BLOCK_CONFIRMATION_THRESHOLD, STAKING_CONTRACT_TRACKER_ADDR, ERC20_ADDR, USDC_ADDR, DAI_ADDR, injected } from '../../constants';
import LAUNCHPOOLTRACKER_ABI from '../../constants/abis/launchpooltracker.json';
import ERC20_ABI from '../../constants/abis/erc20.json';
import { ethers } from 'ethers';

import { getAccountStakes, getAllStakes } from '../../utils/contract';
import { MakeAmountStyle } from '../../utils/helper';
import { setItem, getItem } from '../../utils/helper';

function useErc20Contract() {
  const { library, active } = useWeb3React();
  return useMemo(() => {
      if (!active) {
        return null;
      }

      return new ethers.Contract(ERC20_ADDR, ERC20_ABI, library.getSigner());
  }, [library, active]);
}

function useLaunchPoolTrackerContract() {
  const { library, active } = useWeb3React();
  return useMemo(() => {
      if (!active) {
        return null;
      }

      return new ethers.Contract(STAKING_CONTRACT_TRACKER_ADDR, LAUNCHPOOLTRACKER_ABI, library.getSigner());
  }, [library, active]);
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

function useLaunchPool(launchPoolTracker, launchPoolId) {
  const [pool, setPool] = useState(null);

  const _fetchPool = async () => {
    if (!launchPoolTracker || launchPoolId == 0) {
      return [];
    }
    const launchPool = await launchPoolTracker.poolsById(launchPoolId);
    console.log("launchPool")
    console.log(launchPool)
    return launchPool;
  }

  useEffect(() => {
    _fetchPool().then(setPool);
  }, [launchPoolTracker, launchPoolId]);

  return pool
}

const Pool = () => {
  const dispatch = useDispatch();

  const erc20 = useErc20Contract();
  const launchPoolTracker = useLaunchPoolTrackerContract();
  const launchPoolId = useLaunchPoolId(launchPoolTracker);
  const launchPool = useLaunchPool(launchPoolTracker, launchPoolId)

  const [open, setOpen] = React.useState(false);
  const [wallet, setWallet] = React.useState(0);

  const [delay, setDelay] = React.useState(false);

  const [poolStaked, setPoolStaked] = React.useState(0);
  const [stakeAmount, setStakeAmount] = React.useState(0);
  const [crypto, setCrypto] = React.useState(2);

  const { active, account, chainId, library, activate } = useWeb3React();
  const [ethBalance, setEthBalance] = useState(0.0);
  const [tokenBalance, setTokenBalance] = useState(0.0);


  const [stakeAllList, setStakeAllList] = useState([]);
  const [stakeAccountList, setStakeAccountList] = useState([]);
  
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0)

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
    dispatch(setCommited(getItem('my_commited')));
    dispatch(setCommited(getItem('url')));

    dispatch(setCommits(getItem('commits')));
    dispatch(setPoolStatus(getItem('pool_status')));
    dispatch(setContent(getItem('content')));

    if(getItem('wallet')!=null)
      activate(injected);

    setWallet(getItem('wallet'))

    console.log("here "+getItem('wallet'))
    console.log(loading)

    setCount(count+1);
  },[])

  // useEffect(()=>{
  //   if(!active){
  //     setItem('wallet', 0)
  //   }
  //   if(active){
  //     setItem('wallet', wallet)
  //   }
  // }, [active])

  useEffect(() => {
    if (!active) {
      return;
    }
    console.log("here")
    
    setAddress(account);

    _fetchTokenBalance();
    _fetchStakeList();
    _getBalance().then((bal) => setEthBalance(bal.toString()));
  }, [account, active, chainId, library, count]);

  const _getBalance = async () => {
    const ans = await library.getBalance(account);
    return ans;
  }

  const _fetchTokenBalance = async () => {

    _getBalance().then((bal) => {
      setEthBalance(bal.toString());
      setItem('eth_balance', bal.toString())
    });
    const b = await erc20.balanceOf(account);      
    console.log(b);
    dispatch(setBalance(b.toString()));
    setItem('balance', b.toString());
    setTokenBalance(b.toString())

  }

  const _fetchStakeList = async () => { 
    const allList = await getAllStakes(launchPoolTracker, launchPoolId);
    console.log("allLists")
    console.log(allList)
    const thisList = await getAccountStakes(account, launchPoolTracker, launchPoolId);
    console.log("thisList")
    console.log(thisList)
    setStakeAllList(allList);
    setStakeAccountList(thisList);
    setCount(count+1)
  }
  
  const _fetchStakedAmount = async () => {
    var staked = (await launchPoolTracker.stakesOf(launchPoolId, account)).toString();
    var total_staked = 'XX.X';
    console.log(staked)
    console.log(total_staked)

    dispatch(setAddress(account));
    dispatch(setStaked(MakeAmountStyle(staked)));
    dispatch(setTotalStaked(MakeAmountStyle(total_staked)));
    setItem('staked', MakeAmountStyle(staked))
    setItem('totalStaked', MakeAmountStyle(total_staked));
    setCount(count+1)

  }

  const _fetchStakeCount = async () => {
    var stakeCount = (await launchPoolTracker.poolStakeCount(launchPoolId)).toString();
    console.log(stakeCount);
    dispatch(setStakes(MakeAmountStyle(stakeCount)));
    setItem('stakes', MakeAmountStyle(stakeCount));
  }

  const _mintTokens = async () => {
    if (!active) {
      return;
    }

    try {
      const txReceipt = await erc20.mint(account, ethers.utils.parseUnits("20").toString(), { nonce: 0});
      await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);
      await _fetchTokenBalance()
    } catch (ex) {
      console.log('tx', ex.transaction);
      console.log('tx', ex);
    }
  }

  const _stakeToken = async (value) => {

    if (!active) {
      return;
    }

    try {
      setLoading(true)
      const amount = ethers.utils.parseUnits(stakeAmount);
      var addr;
      console.log(crypto)
      if(crypto == 2)        addr = ERC20_ADDR;
      if(crypto == 3)       addr = USDC_ADDR;
      if(crypto == 1)        addr = DAI_ADDR;
      console.log(addr)

      let txReceipt = await erc20.approve(launchPoolTracker.address, amount);
      await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);
      txReceipt = await launchPoolTracker.stake(launchPoolId, addr, amount);

      await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);

      console.log("XXXXXX")
      await _fetchTokenBalance(); 
      await _fetchStakedAmount();
      await _fetchStakeCount();
      await _fetchStakeList();

      setLoading(false)

      setPoolStaked(value)
      setDelay(true);
      setTimeout(()=>{setDelay(false)}, 5000);
    } catch (ex) {
      setLoading(false)
      console.log('tx', ex.transaction);
      console.log('tx', ex);
    }
  }

  const unstake = async (stake_id) => {
    if (!active) {
      return;
    }

    try {      
      setLoading(true)
      let txReceipt = await launchPoolTracker.unstake(launchPoolId, parseInt(stake_id));
      await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);

      await _fetchTokenBalance(); 
      await _fetchStakedAmount();
      await _fetchStakeCount();
      await _fetchStakeList();

      // setPoolStaked(0);
      // setWallet(0);
      
      setLoading(false)
    } catch (ex) {
      setLoading(false)
      console.log('tx', ex.transaction);
      console.log('tx', ex);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

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
      // if (typeof window.ethereum.isMetaMask !== "undefined") {        
      //   activate(injected);
      // }
      activate(injected);
      setItem('wallet', id)
      setWallet(id);
    }
  }

  return (
    <>
      <div className="blank">
        <div className="pool-detail-body">
          <Header is_home={true} connect={connect} is_connected={!active || (wallet==0 && poolStaked==0)} address={address}/>
    
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} md={6}>
              <PoolTitle id={store.getState().display.id} content={store.getState().display.content}/>
              <div className="pool-divider">
                <Divider/>
              </div>
              <SharePool url={store.getState().display.url}/>
              <div className="pool-divider">
                <Divider/>
              </div>
              <div className="pool-detail-progress">
                <PoolProgress 
                  stakes={store.getState().display.stakes} 
                  staked={store.getState().display.totalstaked} 
                  daysLeft={store.getState().display.daysLeft} 
                  // progress={store.getState().display.progress} 
                  min={store.getState().display.min} 
                  max={store.getState().display.max}
                  commited={store.getState().display.commited}
                  commits={store.getState().display.commits}
                  commit_accepted={store.getState().display.pool_status==2 || store.getState().display.pool_status==3}
                />
              </div>
              <div className="pool-divider">
                <Divider/>
              </div>
              <div className="risk-free">📖 How risk-free staking works</div>
              {/* {(!active || (wallet==0 && poolStaked==0)) &&
                <ConnectWallet 
                  connect={connect} 
                  position="33"
                  staked={store.getState().display.staked}
                />
              } */}
              {active && 
                <div>
                  {poolStaked!=0 && !loading && delay && <Congratulation/>}
                  {wallet!=0 && !loading &&
                    <StakeForm 
                      wallet={wallet} 
                      address={account}
                      balance_eth={ethers.utils.formatEther(ethBalance)} 
                      balance_abc={MakeAmountStyle(tokenBalance, true)} 
                      _mintTokens={_mintTokens} 
                      staked={store.getState().display.staked}
                      setPoolStaked={_stakeToken} 
                      setStakeAmount={setStakeAmount} 
                      position={parseInt(store.getState().display.stakes)+1}
                      crypto={crypto}
                      setCrypto={setCrypto}
                    />
                  }          
                  {loading &&
                    <div>
                      <img className="loading1" src={loadingImg}></img>
                    </div>
                  }
                </div>
              }
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              {active && 
                <div>
                  {wallet!=0 && <h2 className="stake-list-title">Your Stakes</h2>}
                  {wallet!=0 && <div className="stake-list-body">
                    {!stakeAccountList &&
                      <div>
                        <img className="loading1" src={loadingImg}></img>
                      </div>
                    }
                    {wallet!=0 && stakeAccountList && stakeAccountList.map((row, i) => (
                      <CommitedStake 
                        position_number={row.stakeId} 
                        stake_amount={MakeAmountStyle(row.amount, true)} 
                        logo={row.token==ERC20_ADDR?ethLogo:(row.token==DAI_ADDR?daiLogo:(row.token==USDC_ADDR?usdcLogo:''))}
                        unstake={unstake} 
                        key={row.stakeId}
                      />
                    ))}
                  </div>
                  }
                  <h2 className="stake-list-title">All Stakes</h2>     
                  <div className="stake-list-body">
                    {!stakeAllList &&
                      <div>
                        <img className="loading1" src={loadingImg}></img>
                      </div>
                    }
                    {stakeAllList && stakeAllList.map((row, i) => (
                      <StakeList 
                        position_number={row.stakeId} 
                        stake_amount={MakeAmountStyle(row.amount, true)} 
                        logo={row.token==ERC20_ADDR?ethLogo:(row.token==DAI_ADDR?daiLogo:(row.token==USDC_ADDR?usdcLogo:''))} 
                        key={row.stakeId}
                      />
                    ))}
                  </div>
                </div>
              }              
            </Grid>
          </Grid>
          
          <ConnectWalletModal open={open} handleClose={handleClose} handleSelect={handleSelect}></ConnectWalletModal>
        </div>
        
      </div>
    </>
    
  );
};

export default Pool;
