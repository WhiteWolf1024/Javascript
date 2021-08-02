import "../Main.css";
import React, { useEffect, useMemo, useState } from 'react';
import PoolProgress from "../PoolProgress/PoolProgress";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { 
  setId,
  setStakes,
  setStaked,
  setTotalStaked,
  setDaysLeft,
  setCommited,
  setCommits,
  setMin,
  setMax,
  setName,
  setExpired,
  setPoolStatus,
  setUrl,
  setMyCommited,
  setContent,
 } from "../../../store/ducks/display";
 import otocoLogo from "../../../assets/img/Otoco-logo.png";
 import kattanaLogo from "../../../assets/img/Kattana-logo.png";
 import genesisLogo from "../../../assets/img/Genesis-logo.png";
 import daiLogo from "../../../assets/img/dai-logo.png";
 import usdcLogo from "../../../assets/img/usdc-logo.png";
 import ethLogo from "../../../assets/img/eth-logo.png";

 import { MakeAmountStyle } from '../../../utils/helper';

import store from '../../../store';
import { setItem } from '../../../utils/helper';

const PoolItem = (props) => {  
  const dispatch = useDispatch();
  const history = useHistory();
  const { title, content, stakes, staked, totalstaked, daysLeft, my_commited, commited, pool_status, commits, id, min, max, expired, url } = props;
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [color, setColor] = useState('white');
  const [borderColor, setBorderColor] = useState('black');

  useEffect(()=>{
    if(pool_status > 0 && daysLeft < 5)  {
      setBackgroundColor('white');
      setColor('#FF4000');
      setBorderColor('#FFECE6');
    }
    if(pool_status > 0 && daysLeft >= 5){
      setBackgroundColor('white');
      setColor('black');
      setBorderColor('lightgray')
    }
    if(pool_status == 0 && daysLeft < 5) {
      setBackgroundColor('#E6F7FF');
      setColor('#00B1ED');
      setBorderColor('white');
    }
    if(pool_status == 0 && daysLeft >= 5) {
      setBackgroundColor('white');
      setColor('#00B1ED');
      setBorderColor('white');
    }
    
  },[])

  const gotoDetail = () => {
    if(pool_status == 0 || pool_status == 4) 
      return;
    console.log(expired)
    dispatch(setId(id));
    dispatch(setContent(content));
    dispatch(setStakes(stakes));
    dispatch(setStaked(staked));
    dispatch(setTotalStaked(totalstaked));
    dispatch(setDaysLeft(daysLeft));
    dispatch(setMin(min));
    dispatch(setMax(max));
    dispatch(setName(title));
    dispatch(setExpired(expired));
    dispatch(setPoolStatus(pool_status));
    dispatch(setCommited(commited));
    dispatch(setMyCommited(my_commited));
    dispatch(setCommits(commits));
    dispatch(setUrl(url));
    setItem('id', id);
    setItem('content', content);
    setItem('stakes', stakes);
    setItem('staked', staked);
    setItem('totalstaked', totalstaked);
    setItem('daysLeft', daysLeft);
    setItem('min', min);
    setItem('max', max);
    setItem('title', title);
    setItem('expired', expired);
    setItem('pool_status', pool_status);
    setItem('commited', commited);
    setItem('my_commited', my_commited);
    setItem('commits', commits);
    setItem('url', url);
    history.push('pool')
  }

  return (
    <>
      <div className="pool-item-info-body" onClick={gotoDetail}>
        <div className="progress-info-body">
          {pool_status!=4 && <div 
            className="pool-item-days-left" 
            id="pool-item-days-left"
            style={{
              backgroundColor:`${backgroundColor}`,
              color:`${color}`,
              borderColor:`${borderColor}`,
              border:'solid',
              borderWidth:'thin'}}>
              in {daysLeft} day{daysLeft==1?'':'s'} {pool_status>0?'left':''}
          </div>
          }
          {pool_status==4 && <div
            className="pool-item-days-left"
            id="pool-item-days-left">
            </div>
          }
          {pool_status==1 && <div 
            className="pool-item-status-new" 
            id="pool-item-status-new">
              NEW
          </div>
          }
          {pool_status==2 && <div 
            className="pool-item-status-commits"
            id="pool-item-status-commits">
              COMMITS
          </div>
          }
          {pool_status==3 && 
          <div style={{display:'flex'}}>
            <div 
              className="pool-item-status-commits"
              id="pool-item-status-commits"
              style={{marginRight:10}}>
                COMMITS
            </div>
            <div 
              className="pool-item-status-new"
              id="pool-item-status-new">
                NEW
            </div>
            </div>
          }
          {pool_status==4 && <div 
            className="pool-item-status-closed"
            id="pool-item-status-closed">
              CLOSED
          </div>
          }
        </div>
        <div className="pool-item-body">
            <img className="pool-item-logo" src={id==1?otocoLogo:(id==2?kattanaLogo:(id==3?genesisLogo:""))}></img>
            <div>
                <div className="pool-item-title" id="pool-item-title">{title}</div>
                <div className="pool-item-content" id="pool-item-content">{content}</div>
            </div>
        </div>
        {pool_status != 0 && <div>
          <PoolProgress 
            stakes={stakes} 
            staked={totalstaked} 
            commited={commited} 
            commits={commits}
            min={min} 
            max={max}
            commit_accepted={pool_status==2 || pool_status==3}
          />
          {/* {my_commited==0 && staked!=0 && <div className="my-stake-list-info-body">
            <div className="stake-list-info-top">
              <div className="my-stake-list-info-position">        
                <div className="my-stake-list-info-positive-amount" id="my-stake-list-info-position">{stake_position}</div>
                <div className="my-stake-list-info-positive-state">MY POSITION</div>  
              </div>
              <div className="my-stake-list-info-stake">    
                <div className="my-stake-list-info-stake-amount" id="my-stake-list-info-amount">
                  ${MakeAmountStyle(staked)}
                </div>          
                <div className="my-stake-list-info-stake-state">MY STAKE</div>  
              </div>
              <div className="my-stake-list-blank">          
                <img className="my-stake-logo-img" src={daiLogo}></img>
              </div>
            </div>
          </div>}
          {my_commited!=0 && <div className="my-commit-list-info-body">
            <div className="stake-list-info-top">
              <div className="my-stake-list-info-position">        
                <div className="my-stake-list-info-positive-amount" id="my-stake-list-info-position">{commit_position}</div>
                <div className="my-stake-list-info-positive-state">MY POSITION</div>  
              </div>
              <div className="my-stake-list-info-stake">    
                <div className="my-stake-list-info-stake-amount" id="my-stake-list-info-amount">
                  ${MakeAmountStyle(commited)}
                </div>          
                <div className="my-stake-list-info-stake-state">MY COMMIT</div>  
              </div>
              <div className="my-stake-list-blank">          
                <img className="my-stake-logo-img" src={daiLogo}></img>
              </div>
            </div>
          </div>
          } */}
        </div>}        
      </div>
    </>
  );
};

export default PoolItem;