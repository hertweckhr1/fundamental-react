import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import TreeHead from './_TreeHead';
import TreeView from './TreeView';

// mock shortid for snapshot testing
jest.mock('shortid', () => {
    let id = 1;

    return {
        generate: () => id++
    };
});

describe('<TreeHead />', () => {
    const treeHead = (
        <TreeHead>
            <TreeView.Col>Column Header 1</TreeView.Col>
            <TreeView.Col>Column Header 2</TreeView.Col>
            <TreeView.Col>Column Header 3</TreeView.Col>
            <TreeView.Col>Column Header 4</TreeView.Col>
        </TreeHead>
    );

    test('create tree head component', () => {
        let component = renderer.create(treeHead);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('open all tree from header', () => {
        const wrapper = mount(treeHead);

        wrapper
            .find('button.fd-tree__control')
            .at(0)
            .simulate('click');

        // Check that all opened
        wrapper.find('ul.fd-tree__group').forEach((node) => {
            expect(node.hasClass('is-hidden')).toBeFalsy();
            expect(node.prop('aria-hidden')).toBeFalsy();
        });
    });

    test('closed all tree from header when set to open', () => {
        const wrapper = mount(treeHead);

        wrapper
            .find('button.fd-tree__control')
            .at(0)
            .simulate('click');

        // Check that all opened
        wrapper.find('ul.fd-tree__group').forEach((node) => {
            expect(node.hasClass('is-hidden')).toBeFalsy();
            expect(node.prop('aria-hidden')).toBeFalsy();
        });

        wrapper
            .find('button.fd-tree__control')
            .at(0)
            .simulate('click');

        // Check that all closed
        wrapper.find('ul.fd-tree__group').forEach((node) => {
            expect(node.hasClass('is-hidden')).toBeTruthy();
            expect(node.prop('aria-hidden')).toBeTruthy();
        });
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the TreeHead component', () => {
            const element = mount(
                <TreeHead
                    data-sample='Sample' />);

            expect(
                element.find('.fd-tree--header').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the TreeHead component', () => {
            const element = mount(
                <TreeHead
                    data-sample='Sample' />);

            expect(
                element.find('.fd-tree--header').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the TreeHead component\'s button element', () => {
            const element = mount(
                <TreeHead
                    buttonProps={{
                        'data-sample': 'Sample'
                    }}>
                    <TreeView.Col />
                </TreeHead>
            );

            expect(
                element.find('.fd-tree__control').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
