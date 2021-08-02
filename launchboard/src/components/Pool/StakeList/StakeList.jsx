import "../Main.css";

const StakeList = (props) => {  
  const { position_number, stake_amount, logo } = props;
  return (
    <>
      <div className="stake-list-info-body">
        <div className="stake-list-info-top">
          <div className="stake-list-info-position">        
            <div className="stake-list-info-positive-state">POSITION</div>  
            <div className="stake-list-info-positive-amount" id="stake-list-info-position">{position_number}</div>
          </div>
          <div className="stake-list-info-stake">    
            <div className="stake-list-info-stake-state">STAKE</div>  
            <div className="stake-list-info-stake-amount" id="stake-list-info-amount">
              {stake_amount}
            </div>          
          </div>
          <div className="stake-list-blank">          
            <img className="stake-list-logo-img" src={logo}></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakeList;