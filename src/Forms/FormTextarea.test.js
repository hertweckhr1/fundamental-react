import FormTextarea from './FormTextarea';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Forms />', () => {
    const formTextArea = (
        <FormTextarea className='blue' id='textarea-1'>
                    Pellentesque metus lacus commodo eget justo ut rutrum varius nunc.
        </FormTextarea>
    );

    test('create form text area item', () => {
        // create form set with form inputs
        let component = renderer.create(formTextArea);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the FormTextarea component', () => {
            const element = mount(<FormTextarea data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
