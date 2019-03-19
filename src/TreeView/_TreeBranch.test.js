import React from 'react';
import renderer from 'react-test-renderer';
import TreeBranch from './_TreeBranch';
import TreeView from './TreeView';

// mock shortid for snapshot testing
jest.mock('shortid', () => {
    let id = 1;

    return {
        generate: () => id++
    };
});

describe('<TreeBranch />', () => {
    const treeBranch = (
        <TreeBranch>
            <TreeView.Item>
                <TreeView.Row>
                    <TreeView.Col>GreatGrandchild 1</TreeView.Col>
                </TreeView.Row>
            </TreeView.Item>
        </TreeBranch>
    );

    test('create treebranch component', () => {
        let component = renderer.create(treeBranch);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
