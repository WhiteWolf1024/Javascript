import { render } from '@testing-library/react';
import Pool from './index';
import { Provider } from "react-redux";
import store from "../../store";

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('PoolDetailPage tests', () => {
    it('PoolDetailPage renders without craching', () => {
        const pooldetailpage = render(<Provider store={store}><Pool /></Provider>);
        expect(pooldetailpage).toMatchSnapshot();
    });
    it('Connect Wallet button click shows dialog', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const pooldetailpage = shallow(<Provider store={store}><Pool/></Provider>);
        setTimeout(async() => {
            const button = pooldetailpage.find('#connect-wallet-button');
            button.simulate('click');
            expect(pooldetailpage.find('#connect-wallet-modal-dialog').prop('isOpen')).toBe(true);
        }, 1000);  
    });
    it('Connect Metamask button click shows correct info', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const pooldetailpage = shallow(<Provider store={store}><Pool/></Provider>);
        setTimeout(async() => {
            const button = pooldetailpage.find('#metamask-connect-button');
            button.simulate('click');
            expect(pooldetailpage.find('#connect-wallet-modal-dialog').prop('isOpen')).toBe(false);
            expect(pooldetailpqt3.find('#stake-form-connect-wallet-name').textContent).toEqual('Metamask Wallet');
        }, 1000);  
    });
    it('Connect Coinbase button click shows correct info', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const pooldetailpage = shallow(<Provider store={store}><Pool/></Provider>);
        setTimeout(async() => {
            const button = pooldetailpage.find('#coinbase-connect-button');
            button.simulate('click');
            expect(pooldetailpage.find('#connect-wallet-modal-dialog').prop('isOpen')).toBe(false);
            expect(pooldetailpqt3.find('#stake-form-connect-wallet-name').textContent).toEqual('Coinbase Wallet');
        }, 1000);  
    });
    it('Connect Another button click shows correct info', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const pooldetailpage = shallow(<Provider store={store}><Pool/></Provider>);
        setTimeout(async() => {
            const button = pooldetailpage.find('#another-connect-button');
            button.simulate('click');
            expect(pooldetailpage.find('#connect-wallet-modal-dialog').prop('isOpen')).toBe(false);
            expect(pooldetailpqt3.find('#stake-form-connect-wallet-name').textContent).toEqual('Another Wallet');
        }, 1000);  
    });
    it('Email validation is working correctly in the Stake Form Component', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const pooldetailpage = shallow(<Provider store={store}><Pool/></Provider>);
        setTimeout(async() => {
            const email = pooldetailpage.find('#email');
            email.simulate('change', { target: { value: 'a' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(true);
            email.simulate('change', { target: { value: 'a@a' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(true);
            email.simulate('change', { target: { value: 'a.a' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(true);
            email.simulate('change', { target: { value: 'a@a.' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(true);
            email.simulate('change', { target: { value: '@a.a' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(true);
            email.simulate('change', { target: { value: 'a@a.a' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(false);
        }, 1000);  
    })
    it('Amount validation is working correctly in the Stake Form Component', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const pooldetailpage = shallow(<Provider store={store}><Pool/></Provider>);
        setTimeout(async() => {
            const amount = pooldetailpage.find('#amount');
            amount.simulate('change', { target: { value: 'a' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(true);
            amount.simulate('change', { target: { value: 'a1' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(true);
            amount.simulate('change', { target: { value: '1a' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(true);
            amount.simulate('change', { target: { value: '1.a' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(true);
            amount.simulate('change', { target: { value: '12' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(false);
            amount.simulate('change', { target: { value: '12.3' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(false);
            amount.simulate('change', { target: { value: '.3' } });
            expect(pooldetailpage.find('#connect-wallet-butto').prop('disabled')).toBe(false);
        }, 1000);  
    })
})

