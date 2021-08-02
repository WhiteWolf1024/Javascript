import { render } from '@testing-library/react';
import ConnectWallet from './ConnectWallet';

import { Provider } from "react-redux";
import store from "../../../store";

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Connect Wallet Component tests', () => {
    it('Position is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const connectwallet = shallow(<Provider store={store}><ConnectWallet/></Provider>);
        setTimeout(() => {
            expect(connectwallet.find("#connect-wallet-info-position").textContent.length).not.toBe(0);
        }, 1000);        
    });
    it('Stake amount is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const connectwallet = shallow(<Provider store={store}><ConnectWallet/></Provider>);
        setTimeout(() => {
            expect(connectwallet.find("#connect-wallet-info-staked").textContent.length).not.toBe(0);
        }, 1000);        
    });
})