import { mount } from 'enzyme';
import Panel from './Panel';
import PanelHeader from './_PanelHeader.js';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<PanelHeader />', () => {
    const panelHeader = (
        <PanelHeader>
            <Panel.Head
                description='Panel Description'
                title={'Panel Header with Actions'} />
        </PanelHeader>
    );

    test('create panel header', () => {
        // create panel header
        let component = renderer.create(panelHeader);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the PanelHeader component', () => {
            const element = mount(<Panel.Header data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
