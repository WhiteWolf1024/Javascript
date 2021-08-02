import { render } from '@testing-library/react';
import HomePage from './index';

import { Provider } from "react-redux";
import store from "../../store";

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('HomePage tests', () => {
    it('HomePage renders without craching', () => {
        const homepage = render(<Provider store={store}><HomePage /></Provider>);
        expect(homepage).toMatchSnapshot();
    });
    it('Explore button redirect correctly', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const homepage = shallow(<Provider store={store}><HomePage/></Provider>);
        setTimeout(() => {
            const explore = homepage.find('#explore_pools');
            explore.simulate('click');
            expect(window.location.pathname).toEqual('/pool_list');
        }, 100);        
    });
})

