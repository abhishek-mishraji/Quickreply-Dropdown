import { Meta, StoryFn } from '@storybook/react';
import Dropdown, { DropdownProps } from '@/components/Dropdown.tsx';
import { action } from '@storybook/addon-actions';


export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        labelVisibility: { control: 'radio', options: ['Visible', 'Hidden'] },
        status: { control: 'radio', options: ['Unfilled', 'Filled', 'Disabled', 'Error'] },
        labelIconVisibility: { control: 'radio', options: ['Visible', 'Hidden'] },
        leftIconVisibility: { control: 'radio', options: ['Visible', 'Hidden'] },
        helperText: { control: 'text' },
        required: { control: 'boolean' },
        text: { control: 'text' },
        type: { control: 'radio', options: ['SingleNoIcon', 'SingleRadio', 'Multi'] },
        activeItemIndex: { control: 'number' },
        items: { control: 'object' },
    },
    args: {
        onClick: action('item-selected'),
    },
} as Meta;

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />;


export const Default = Template.bind({});
Default.args = {
    label: 'Dropdown Label',
    labelVisibility: 'Visible',
    status: 'Unfilled',
    labelIconVisibility: 'Hidden',
    leftIconVisibility: 'Hidden',

    helperText: '',
    required: false,
    text: '',
    type: 'SingleNoIcon',
    activeItemIndex: -1,
    items: ['Item 1', 'Item 2', 'Item 3'],
};