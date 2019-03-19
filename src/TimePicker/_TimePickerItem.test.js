import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import TimePickerItem from './_TimePickerItem';

describe('<TimePickerItem />', () => {
    const defaultTimePickerItem = <TimePickerItem id='myTime' />;
    const twelveHourTime = <TimePickerItem format12Hours />;
    const showHour = <TimePickerItem format12Hours showHour />;
    const showMinute = <TimePickerItem format12Hours showMinute />;
    const showSecond = <TimePickerItem format12Hours showSecond />;
    const showHourMinute = (
        <TimePickerItem format12Hours={false} showHour={false}
            showMinute />
    );
    const showMinuteSecond = (
        <TimePickerItem
            format12Hours
            showHour={false}
            showMinute
            showSecond />
    );
    const showHourSecond = (
        <TimePickerItem
            format12Hours
            showHour
            showMinute={false}
            showSecond />
    );
    const noSecondTime = <TimePickerItem showSecond={false} />;
    const disabledTime = <TimePickerItem disabled />;
    test('create time picker item', () => {
        // default time picker
        let component = renderer.create(defaultTimePickerItem);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // twelve hour time picker
        component = renderer.create(twelveHourTime);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // no seconds time picker
        component = renderer.create(noSecondTime);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // disabled time picker
        component = renderer.create(disabledTime);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        component = renderer.create(showHour);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        component = renderer.create(showSecond);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        component = renderer.create(showMinute);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        component = renderer.create(showHourMinute);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        component = renderer.create(showMinuteSecond);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        component = renderer.create(showHourSecond);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the TimePickerItem component\'s input element', () => {
            const element = mount(<TimePickerItem id='id' inputProps={{ 'data-sample': 'Sample' }} />);

            expect(
                element.find('#id-input').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the TimePickerItem component\'s button element', () => {
            const element = mount(<TimePickerItem buttonProps={{ 'data-sample': 'Sample' }} id='id' />);

            expect(
                element.find('#id-button').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
