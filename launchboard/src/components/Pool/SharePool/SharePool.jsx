import "../Main.css";
import comLogo from "../../../assets/img/com-logo.png";
import discordLogo from "../../../assets/img/discord-logo.png";
import voteLogo from "../../../assets/img/vote-logo.png";

import Grid from "@material-ui/core/Grid";

const SharePool = (props) => {  
  const { url } = props;
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={12} md={4}>
        <div className="share-list-otoco">
            <img className="share-logo" src={comLogo}></img>
            <a className="share-description">{url}</a>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={4} className="share-list-discord-body">
        <div className="share-list-discord">
            <img className="share-logo" src={discordLogo}></img>
            <a className="share-description">Chat on Discord</a>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <div className="share-list-vote">
            <img className="share-logo" src={voteLogo} style={{width: 10, marginLeft:'5vw', marginRight:28}}></img>
            <a className="share-description">Vote on snapshot</a>
        </div>
      </Grid>
    </Grid>
  );
};

export default SharePool;