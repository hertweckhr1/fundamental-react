import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import TreeItem from './_TreeItem';
import TreeView from './TreeView';

// mock shortid for snapshot testing
jest.mock('shortid', () => {
    let id = 1;

    return {
        generate: () => id++
    };
});

describe('<TreeItem />', () => {
    const treeItem = (
        <TreeItem>
            <TreeView.Row>
                <TreeView.Col>First Level</TreeView.Col>
                <TreeView.Col>Data Col 2</TreeView.Col>
                <TreeView.Col>Data Col 3</TreeView.Col>
                <TreeView.Col>Data Col 4</TreeView.Col>
            </TreeView.Row>
        </TreeItem>
    );

    test('create tree item component', () => {
        // tree item component
        let component = renderer.create(treeItem);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the TreeItem component', () => {
            const element = mount(
                <TreeItem
                    data-sample='Sample' />);

            expect(
                element.find('.fd-tree__item').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
