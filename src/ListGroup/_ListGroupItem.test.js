/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from '../';
import ListGroup from './ListGroup';
import ListGroupItem from './_ListGroupItem';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<ListGroupItem />', () => {
    const defaultListGroupItem = (
        <ListGroupItem className='blue'>
            <a style={{ cursor: 'pointer' }}>List item 1</a>
        </ListGroupItem>
    );

    test('create list group', () => {
        // create default list group
        let component = renderer.create(defaultListGroupItem);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {

        test('should allow props to be spread to the ListGroupItem component', () => {
            const element = mount(<ListGroupItem data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

    });
});
