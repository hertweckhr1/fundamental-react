import { Button } from '../';
import { mount } from 'enzyme';
import PanelActions from './_PanelActions';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<PanelActions />', () => {
    const panelAction = (
        <PanelActions>
            <Button compact glyph='add'>
                        Add New Button
            </Button>
        </PanelActions>
    );

    test('create panel Action', () => {
        // create panel
        let component = renderer.create(panelAction);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the PanelActions component', () => {
            const element = mount(<PanelActions data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
