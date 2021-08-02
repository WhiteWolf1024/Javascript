import { render } from '@testing-library/react';
import PoolList from './index';
import { Provider } from "react-redux";
import store from "../../store";

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('PoolListPage tests', () => {
    it('PoolListPage renders without craching', () => {
        const poollistpage = render(<Provider store={store}><PoolList /></Provider>); 
        expect(poollistpage).toMatchSnapshot();
    });
    it('Detail button redirect correctly', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const poollistpage = shallow(<Provider store={store}><PoolList/></Provider>);
        setTimeout(async() => {
            const detail = poollistpage.find('.pool-item-detail-button');
            detail.simulate('click');
            expect(window.location.pathname).toEqual('/pool');
        }, 1000);        
    });
    it('logo redirect correctly', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const poollistpage = shallow(<Provider store={store}><PoolList/></Provider>);
        setTimeout(() => {
            const logo = poollistpage.find('.land-logo');
            logo.simulate('click');
            expect(window.location.pathname).toEqual('/');
        }, 1000);        
    });
})

