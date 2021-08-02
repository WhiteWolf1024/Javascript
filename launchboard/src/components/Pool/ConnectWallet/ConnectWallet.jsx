import "../Main.css";
import zeroImg from "../../../assets/img/zero-img.png";
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { MakeAmountStyle } from '../../../utils/helper';

const MyButton = styled(Button)({
  background: 'linear-gradient(0deg, #0377A8 30%, #4BC9FF 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  width: '-webkit-fill-available',
  fontSize: 18,
  fontWeight: 700,
  fontFamily: 'sans-serif',
  // lineHeight: 22.5,
  textAlign: 'center'
});

const ConnectWallet = (props) => {  
  const { connect, position, staked } = props;
  return (
    <div className="connect-wallet-body">
      <div className="connect-wallet-info-body">
        <div className="connect-wallet-info-top">
          <div className="connect-wallet-info-position">        
            <div className="connect-wallet-info-positive-state">POSITION</div>  
            <div className="connect-wallet-info-positive-amount" id="connect-wallet-info-position">{position}</div>
          </div>
          <div className="connect-wallet-blank">          
          </div>
          <div className="connect-wallet-info-stake">    
            <div className="connect-wallet-info-stake-state">STAKE</div>  
            <div className="connect-wallet-info-stake-amount" id="connect-wallet-info-staked">
              ${MakeAmountStyle(staked)}
            </div>          
          </div>
        </div>
        <div className="connect-wallet-button">
          <MyButton id="connect-wallet-button" onClick={connect}>CONNECT WALLET</MyButton>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;