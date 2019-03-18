import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { SideNav } from '../';
import SideNavList from './_SideNavList';

describe('<SideNavList />', () => {
    const subSideNavList = (
        <SideNavList>
            <SideNav.ListItem
                id='item_1'
                name='Link Item 1'
                url='#' />
            <SideNav.ListItem
                id='item_2'
                name='Link Item 2'
                url='#'>
            </SideNav.ListItem>
            <SideNav.ListItem
                id='item_5'
                name='Link Item'
                url='#' />
        </SideNavList>
    );


    test('create side navigation', () => {
        // create side nav list
        let component = renderer.create(subSideNavList);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the SideNavList component', () => {
            const element = mount(<SideNavList data-sample='Sample'>
                <SideNav.ListItem
                    id='item-1'
                    name='Link Item 1'
                    url='#' />
                <SideNav.ListItem
                    id='item-2'
                    name='Link Item 2'
                    url='#' />
                <SideNav.ListItem
                    id='item-3'
                    name='Link Item 3'
                    url='#' />
            </SideNavList>);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the SideNavList\'s h1 element', () => {
            const element = mount(<SideNavList title='test' titleProps={{ 'data-sample': 'Sample' }} />);

            expect(
                element.find('h1').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
