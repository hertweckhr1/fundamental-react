import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import SideNavList from './_SideNavList';
import SideNavListItem from './_SideNavListItem';
import { BrowserRouter, Link } from 'react-router-dom';

describe('<SideNavListItem />', () => {
    const oneLevelSideNav = (
        <BrowserRouter>
            <SideNavList>
                <SideNavListItem
                    id='item_1'>
                    <Link to='/'>
                            Link Item
                    </Link>
                </SideNavListItem>
                <SideNavListItem
                    id='item_2'>
                    <Link to='/'>
                            Link Item
                    </Link>
                </SideNavListItem>
                <SideNavListItem
                    id='item_3'>
                    <Link to='/'>
                            Link Item
                    </Link>
                </SideNavListItem>
                <SideNavListItem
                    id='item_4'>
                    <Link to='/'>
                            Link Item
                    </Link>
                </SideNavListItem>
                <SideNavListItem
                    id='item_5'>
                    <Link to='/'>
                            Link Item
                    </Link>
                </SideNavListItem>
            </SideNavList>
        </BrowserRouter>
    );

    test('create side navigation', () => {
        // create one level side nav
        let component = renderer.create(oneLevelSideNav);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the SideNavListItem component', () => {
            const element = mount(
                <SideNavListItem
                    data-sample='Sample'
                    id='item-1'
                    name='Link Item 1'
                    url='#' />
            );

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

    });
});
