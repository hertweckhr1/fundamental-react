import { mount } from 'enzyme';
import PanelHead from './_PanelHead';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Panel />', () => {
    const panelHead = (
        <PanelHead
            description='Panel Description'
            title={'Panel Header with Actions'} />
    );

    test('create panel Head', () => {
        // create panel hed
        let component = renderer.create(panelHead);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the PanelHead component', () => {
            const element = mount(<PanelHead data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
