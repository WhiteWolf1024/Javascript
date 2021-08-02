import "../Main.css";

const CommitedStake = (props) => {  
  const { position_number, stake_amount, logo, unstake } = props;
  return (
    <>
      <div className="commited-stake-info-body">
        <div className="commited-stake-info-top">
          <div className="stake-list-info-position">        
            <div className="stake-list-info-positive-state">POSITION</div>  
            <div className="commited-stake-info-positive-amount" id="commited-stake-info-position">{position_number}</div>
          </div>
          <div className="stake-list-info-stake">    
            <div className="stake-list-info-stake-state">STAKE</div>  
            <div className="commited-stake-info-stake-amount" id="commited-stake-info-staked">
              {stake_amount}
            </div>          
          </div>
          <div className="stake-list-blank">          
            <img className="stake-list-logo-img" src={logo}></img>
          </div>
        </div>
        <a className="commited-stake-unstake" onClick={()=>{unstake(position_number)}}>Unstake</a>
      </div>
    </>
  );
};

export default CommitedStake;