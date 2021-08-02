import { render } from '@testing-library/react';
import StakeList from './StakeList';

import { Provider } from "react-redux";
import store from "../../../store";

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Stake List Component tests', () => {
    it('Position is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const stakelist = shallow(<Provider store={store}><StakeList/></Provider>);
        setTimeout(() => {
            expect(stakelist.find("#stake-list-info-position").textContent.length).not.toBe(0);
        }, 1000);        
    });
    it('Stake amount is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const stakelist = shallow(<Provider store={store}><StakeList/></Provider>);
        setTimeout(() => {
            expect(stakelist.find("#stake-list-info-amount").textContent.length).not.toBe(0);
        }, 1000);        
    });
})