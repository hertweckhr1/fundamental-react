import { mount } from 'enzyme';
import ProductTile from './ProductTile';
import ProductTileContent from './_ProductTileContent.js';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<ProductTileContent />', () => {
    const productTileContent = (
        <ProductTileContent title='Tile Title'>
            <p>Tile Description</p>
        </ProductTileContent>
    );

    test('create product tile content component', () => {
        // product media tile
        let component = renderer.create(productTileContent);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the ProductTileContent component', () => {
            const element = mount(<ProductTile.Content data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the ProductTileContent component\'s h2 element', () => {
            const element = mount(<ProductTile.Content titleProps={{ 'data-sample': 'Sample' }} />);

            expect(
                element.find('h2').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
