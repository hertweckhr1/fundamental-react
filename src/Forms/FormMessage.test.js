import FormMessage from './FormMessage';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Forms />', () => {
    const formMessage = (
        <FormMessage type='help'>
                    Pellentesque metus lacus commodo eget justo ut rutrum varius nunc
        </FormMessage>
    );

    test('create form message item', () => {
        // create form set with form inputs
        let component = renderer.create(formMessage);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the FormMessage component', () => {
            const element = mount(<FormMessage data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
