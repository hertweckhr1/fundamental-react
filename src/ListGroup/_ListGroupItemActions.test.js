/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from '../';
import ListGroupItemActions from './_ListGroupItemActions';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<ListGroupItemActions />', () => {
    const listGroupAction = (
        <ListGroupItemActions>
            <Button glyph='edit' type='standard' />
        </ListGroupItemActions>
    );

    test('create list group item action', () => {
        // list group with action
        let component = renderer.create(listGroupAction);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the ListGroupItemActions component', () => {
            const element = mount(<ListGroupItemActions data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
