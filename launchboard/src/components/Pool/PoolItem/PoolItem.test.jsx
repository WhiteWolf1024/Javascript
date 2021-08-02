import { render } from '@testing-library/react';
import PoolItem from './PoolItem';

import { Provider } from "react-redux";
import store from "../../../store";

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Pool Item Component tests', () => {
    it('Title is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const poolitem = shallow(<Provider store={store}><PoolItem/></Provider>);
        setTimeout(() => {
            expect(poolitem.find("#pool-item-title").textContent.length).not.toBe(0);
        }, 1000);        
    });
    it('Content is correct', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const poolitem = shallow(<Provider store={store}><PoolItem/></Provider>);
        setTimeout(() => {
            expect(poolitem.find("#pool-item-content").textContent.length).not.toBe(0);
        }, 1000);        
    });
})