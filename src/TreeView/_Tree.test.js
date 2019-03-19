import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Tree from './_Tree';
import TreeView from './TreeView';

// mock shortid for snapshot testing
jest.mock('shortid', () => {
    let id = 1;

    return {
        generate: () => id++
    };
});

describe('<Tree />', () => {
    const oneLevelTree = (
        <Tree>
            <TreeView.Item>
                <TreeView.Row>
                    <TreeView.Col>First Level</TreeView.Col>
                </TreeView.Row>
            </TreeView.Item>
        </Tree>
    );

    test('create tree component', () => {
        // one level tree
        let component = renderer.create(oneLevelTree);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the Tree component', () => {
            const element = mount(
                <Tree
                    data-sample='Sample'
                    onExpandClick={() => {}} />);

            expect(
                element.find('.fd-tree').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
