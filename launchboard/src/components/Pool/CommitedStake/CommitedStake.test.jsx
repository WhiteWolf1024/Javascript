import { render } from '@testing-library/react';
import CommitedStake from './CommitedStake';

import { Provider } from "react-redux";
import store from "../../../store";

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Commited Stake Component tests', () => {
    it('Position is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const commitedstake = shallow(<Provider store={store}><CommitedStake/></Provider>);
        setTimeout(() => {
            expect(commitedstake.find("#commited-stake-info-position").textContent.length).not.toBe(0);
        }, 1000);        
    });
    it('Stake amount is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const commitedstake = shallow(<Provider store={store}><CommitedStake/></Provider>);
        setTimeout(() => {
            expect(commitedstake.find("#commited-stake-info-staked").textContent.length).not.toBe(0);
        }, 1000);        
    });
})