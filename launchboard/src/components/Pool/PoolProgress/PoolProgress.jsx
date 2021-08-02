import "../Main.css";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CallReceived, ImportantDevices } from "@material-ui/icons";
import { MakeAmountStyle } from '../../../utils/helper';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 27,
    zIndex:1,
    // width: '92vw',
    margin: '4vw 4vw 0 4vw',
    [theme.breakpoints.down('md')]: {
      margin: '24px 24px 0 24px',
    },
    [theme.breakpoints.down('lg')]: {
      margin: '24px 24px 0 24px',
    },
    [theme.breakpoints.down('xl')]: {
      margin: '24px 24px 0 24px',
    },
  },
  colorPrimary: {
    backgroundColor: '#EBEBEB',
  },
  bar: {
    height: 20,
    borderRadius: 27,
    backgroundColor: '#0377A8',
  },
}))(LinearProgress);

const PoolProgress = (props) => {  
  const { stakes, staked, commits, commited, min, max, commit_accepted } = props;

  var responsive = window.matchMedia("(min-width: 960px)").matches;

  return (
    <>
      <div className="stake-info-body">
        <div className="stake-info-list">
          <div 
            className="stake-info-commit-amount" 
            id="stake-info-commits" 
            style={{color:`${commit_accepted==true?'#D79413':'lightgray'}`}}>
              {MakeAmountStyle(commits)}
          </div>
          <div 
            className="stake-info-state"
            style={{color:`${commit_accepted==true?'black':'lightgray'}`}}>
              COMMITS
          </div>
        </div>        
        <div className="stake-info-list">
          <div 
            className="stake-info-commit-amount" 
            id="stake-info-commits" 
            style={{color:`${commit_accepted==true?'#D79413':'lightgray'}`}}>
              ${MakeAmountStyle(commited)}
          </div>
          <div 
            className="stake-info-state"
            style={{color:`${commit_accepted==true?'black':'lightgray'}`}}>
              COMMITED
          </div>
        </div>
        <div className="stake-info-list">
          <div 
            className="stake-info-amount" 
            id="stake-info-stakes">
              {MakeAmountStyle(stakes)}
          </div>
          <div className="stake-info-state">STAKES</div>
        </div>
        <div className="stake-info-list">
          <div 
            className="stake-info-amount" 
            id="stake-info-staked">
              ${MakeAmountStyle(staked)}
          </div>
          <div className="stake-info-state">STAKED</div>
        </div>
      </div>
      <BorderLinearProgress 
        variant="determinate" 
        value={staked==0?0:((parseFloat(staked)/parseFloat(max)*100)>100?100:(parseFloat(staked)/parseFloat(max)*100))} 
        id="stake-info-progress"/>
      {responsive && <div 
        className="progress-info-commit-bar"
        style={{
          width:`calc(847px * ${parseFloat(parseFloat(commited)/parseFloat(max)*100)>100?100:(parseFloat(commited)/parseFloat(max)*100)} / 100)`}}
          />}
      {!responsive && <div 
        className="progress-info-commit-bar"
        style={{
          width:`calc(92vw * ${parseFloat(parseFloat(commited)/parseFloat(max)*100)>100?100:(parseFloat(commited)/parseFloat(max)*100)} / 100)`}}
          />}
      <div className="progress-info-body">
        <div style={{
          marginLeft:`calc(${parseFloat(min)/parseFloat(max)*100}%)`,
          marginRight:5,
          width:`calc(${100-parseFloat(min)/parseFloat(max)*100}%)`,
          borderTop: '1px solid gray'}}
        />
      </div>
      
      <div className="progress-info-body">
        <div 
          className="progress-info-min" 
          id="stake-info-min" 
          style={{
            marginLeft:`calc(${parseFloat(min)/parseFloat(max)*100}%)`,
            color:`${commit_accepted==true?(parseInt(commited)>parseInt(min)?'#D79413':'#006EAA'):'gray'}`
          }}>
            ${MakeAmountStyle(min)} MIN
        </div>
        <div 
          className="progress-info-max" 
          id="stake-info-max"
          style={{
            color:`${parseInt(commited)>parseInt(max)?'#D79413':(parseInt(staked)>parseInt(max)?'#006EAA':'gray')}`
          }}>
            ${MakeAmountStyle(max)} MAX
        </div>
      </div>
    </>
  );
};

export default PoolProgress;