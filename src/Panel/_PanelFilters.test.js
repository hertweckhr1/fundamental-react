import { mount } from 'enzyme';
import PanelFilters from './_PanelFilters';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<PanelFilters />', () => {
    const panelFilters = (
        <PanelFilters>
            <div>Panel Filters</div>
            <br />
        </PanelFilters>
    );

    test('create panel filters', () => {
        // create panel filters
        let component = renderer.create(panelFilters);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the PanelFilters component', () => {
            const element = mount(<PanelFilters data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
