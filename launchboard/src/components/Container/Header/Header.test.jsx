import { render } from '@testing-library/react';
import Header from './Header';

import { Provider } from "react-redux";
import store from "../../../store";

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Logo Component tests', () => {
    it('Logo Component renders without craching', () => {
        const homepage = render(<Provider store={store}><Header /></Provider>);
        expect(homepage).toMatchSnapshot();
    });
    it('Explore button redirect correctly', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const homepage = shallow(<Provider store={store}><Header/></Provider>);
        setTimeout(() => {
            const explore = homepage.find('.land-logo');
            explore.simulate('click');
            expect(window.location.pathname).toEqual('/');
        }, 100);        
    });
})