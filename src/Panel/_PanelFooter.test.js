import { mount } from 'enzyme';
import PanelFooter from './_PanelFooter';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<PanelFooter />', () => {
    const panelFooter = (
        <PanelFooter>Panel Footer</PanelFooter>
    );

    test('create panel footer', () => {
        // create panel footer
        let component = renderer.create(panelFooter);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the PanelFooter component', () => {
            const element = mount(<PanelFooter data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
