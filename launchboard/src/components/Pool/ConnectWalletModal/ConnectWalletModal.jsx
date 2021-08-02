import "../Main.css";
import {
  Dialog
} from '@material-ui/core';

import closeIco from "../../../assets/img/close-ico.png";
import metamaskLogo from "../../../assets/img/metamask-logo.png";
import coinbaseLogo from "../../../assets/img/coinbase-logo.png";
import anotherLogo from "../../../assets/img/another-logo.png";

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConnectWalletModal = (props) => {  
  const { open, handleClose, handleSelect } = props;

  const selectWallet = (id) => {
    handleClose();
    handleSelect(id)
  }

  return (
    <Dialog
        id="connect-wallet-modal-dialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        PaperProps={{
          style: {
            margin: 0,
            bottom: 0,
            position: 'absolute',
            borderRadius: 15,
            maxWidth: '960px',
            width: '100%',
          },
        }}
      >
        <DialogTitle className="connect-dialog-title" id="draggable-dialog-title">
          Connect Wallet
          <img src={closeIco} className="connect-dialog-close" onClick={handleClose}/>
        </DialogTitle>
        <DialogContent>
            <div className="connect-wallet-list" id="metamask-connect-button" onClick={()=>{selectWallet(1)}}>    
                <div className="connect-wallet-name">Metamask</div>  
                <div className="connect-wallet-logo">          
                  <img className="connect-wallet-logo-img" src={metamaskLogo}></img>
                </div>
            </div>
            <div className="connect-wallet-list" id="coinbase-connect-button" onClick={()=>{selectWallet(2)}}>    
                <div className="connect-wallet-name">Coinbase Wallet</div>  
                <div className="connect-wallet-logo">          
                  <img className="connect-wallet-logo-img" src={coinbaseLogo}></img>
                </div>
            </div>
            <div className="connect-wallet-list" id="another-connect-button" onClick={()=>{selectWallet(3)}}>    
                <div className="connect-wallet-name">Another one</div>  
                <div className="connect-wallet-logo">          
                  <img className="connect-wallet-logo-img" src={anotherLogo}></img>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
  );
};

export default ConnectWalletModal;