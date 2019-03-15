/* eslint-disable jsx-a11y/anchor-is-valid */
import ListGroup from './ListGroup';
import ListGroupItemCheckbox from './_ListGroupItemCheckbox';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<ListGroupItemCheckbox />', () => {
    const listGroupCheckbox = (
        <ListGroup>
            <ListGroup.Item>
                <ListGroupItemCheckbox>List item 1</ListGroupItemCheckbox>
            </ListGroup.Item>
        </ListGroup>
    );

    test('create list group with checkbox', () => {
        // list group with checkbox
        let component = renderer.create(listGroupCheckbox);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the ListGroupItemCheckbox component', () => {
            // TODO: placeholder for this test description once that functionality is built
            const element = mount(<ListGroupItemCheckbox data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the ListGroupItemCheckbox component\'s input element', () => {
            const element = mount(<ListGroupItemCheckbox inputProps={{ 'data-sample': 'Sample' }} />);

            expect(
                element.find('input').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the ListGroupItemCheckbox component\'s label element', () => {
            const element = mount(<ListGroupItemCheckbox labelProps={{ 'data-sample': 'Sample' }} />);

            expect(
                element.find('label').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
