import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import TreeRow from './_TreeRow';
import TreeView from './TreeView';

// mock shortid for snapshot testing
jest.mock('shortid', () => {
    let id = 1;

    return {
        generate: () => id++
    };
});

describe('<TreeRow />', () => {
    const treeRow = (
        <TreeRow>
            <TreeView.Col>First Level</TreeView.Col>
            <TreeView.Col>Data Col 2</TreeView.Col>
            <TreeView.Col>Data Col 3</TreeView.Col>
            <TreeView.Col>Data Col 4</TreeView.Col>
        </TreeRow>
    );

    test('create tree row component', () => {
        let component = renderer.create(treeRow);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the TreeRow component', () => {
            const element = mount(
                <TreeRow
                    data-sample='Sample' />);

            expect(
                element.find('.fd-tree__row').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
