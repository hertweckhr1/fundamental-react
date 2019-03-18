import { mount } from 'enzyme';
import Panel from './Panel';
import PanelGrid from './PanelGrid';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<PanelGrid />', () => {
    const panelGrid = (
        <PanelGrid className='blue'>
            <Panel colSpan={2}>
                <Panel.Head title={'Panel Header with Actions'} />
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Head description='Panel Description' />
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Head />
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
        </PanelGrid>
    );

    const panelGridNoGap = (
        <PanelGrid nogap>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
        </PanelGrid>
    );

    const panelGridSpan = (
        <PanelGrid cols={2}>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
            <Panel>
                <Panel.Body>Panel</Panel.Body>
            </Panel>
        </PanelGrid>
    );

    test('create panels', () => {
        // panel grid
        let component = renderer.create(panelGrid);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // panel with span
        component = renderer.create(panelGridSpan);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // panel with no gap
        component = renderer.create(panelGridNoGap);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the PanelGrid component', () => {
            const element = mount(<PanelGrid data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
