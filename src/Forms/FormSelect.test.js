import FormSelect from './FormSelect';
import FormSet from './FormSet';
import FormTextarea from './FormTextarea';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<FormSelect />', () => {
    const formSelect = (
        <FormSelect id='select-1'>
            <option value='1'>Duis malesuada odio volutpat elementum</option>
            <option value='2'>Suspendisse ante ligula</option>
            <option value='3'>Sed bibendum sapien at posuere interdum</option>
        </FormSelect>
    );

    test('create form select item', () => {
        // create form select
        let component = renderer.create(formSelect);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the FormSelect component', () => {
            const element = mount(<FormSelect data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the FormSet component', () => {
            const element = mount(<FormSet data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the FormTextarea component', () => {
            const element = mount(<FormTextarea data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
