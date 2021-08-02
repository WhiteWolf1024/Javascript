import { render } from '@testing-library/react';
import PoolProgress from './PoolProgress';

import { Provider } from "react-redux";
import store from "../../../store";

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Pool Progress Component tests', () => {
    it('Stakes amount is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const poolprogress = shallow(<Provider store={store}><PoolProgress/></Provider>);
        setTimeout(() => {
            expect(poolprogress.find("#stake-info-stakes").textContent.length).not.toBe(0);
        }, 1000);        
    });
    it('Staked amount is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const poolprogress = shallow(<Provider store={store}><PoolProgress/></Provider>);
        setTimeout(() => {
            expect(poolprogress.find("#stake-info-stakeds").textContent.length).not.toBe(0);
        }, 1000);        
    });
    it('Days Left is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const poolprogress = shallow(<Provider store={store}><PoolProgress/></Provider>);
        setTimeout(() => {
            expect(poolprogress.find("#stake-info-daysleft").textContent.length).not.toBe(0);
        }, 1000);        
    });
    it('Progress value is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const poolprogress = shallow(<Provider store={store}><PoolProgress/></Provider>);
        setTimeout(() => {
            expect(poolprogress.find("#stake-info-progress").value).not.toBe(0);
        }, 1000);        
    });
    it('Min commitment value is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const poolprogress = shallow(<Provider store={store}><PoolProgress/></Provider>);
        setTimeout(() => {
            expect(poolprogress.find("#stake-info-min").textContent.length).not.toBe(4);
        }, 1000);        
    });
    it('Max commitment value is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const poolprogress = shallow(<Provider store={store}><PoolProgress/></Provider>);
        setTimeout(() => {      
            expect(poolprogress.find("#stake-info-max").textContent.length).not.toBe(4);
        }, 1000);        
    });
})