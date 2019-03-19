import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import TreeCol from './_TreeCol';

// mock shortid for snapshot testing
jest.mock('shortid', () => {
    let id = 1;

    return {
        generate: () => id++
    };
});

describe('<TreeCol />', () => {
    const treeCol = (
        <TreeCol>Grandchild 1</TreeCol>
    );

    test('create tree col component', () => {
        // tree col
        let component = renderer.create(treeCol);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the TreeCol component', () => {
            const element = mount(
                <TreeCol
                    data-sample='Sample' />);

            expect(
                element.find('.fd-tree__col').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
