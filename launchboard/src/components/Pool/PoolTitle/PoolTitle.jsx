import "../Main.css";
import otocoLogo from "../../../assets/img/Otoco-logo.png";
import anotherLogo from "../../../assets/img/another-pool.png"
import kattanaLogo from "../../../assets/img/Kattana-logo.png";
import genesisLogo from "../../../assets/img/Genesis-logo.png";
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

import store from '../../../store';

const PoolTitle = (props) => {  
  const { id } = props;
  const history = useHistory();
  
  const gotoPoolList = () => {
    history.push('/pool_list')
  }

  return (
    <>
      <div className="otoco-body">
        <div className="pool-list-header">
          <img className="pool-item-logo" src={id==1?otocoLogo:(id==2?kattanaLogo:(id==3?genesisLogo:""))}></img>
          <div>
              <div className="otoco-title">{store.getState().display.name}</div>
              <div className="otoco-content">{store.getState().display.content}</div>
          </div>
        </div>
        <div className="pool-detail-explore-pools">
          <Button id="explore_pools" className="home-connect-button" style={{border: '1px solid #006EAA'}} onClick={gotoPoolList}>
            EXPLORE POOLS
          </Button>
        </div>
      </div>
    </>
  );
};

export default PoolTitle;