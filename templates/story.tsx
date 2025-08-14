import React from 'react';
import {{COMPONENT_NAME}} from './{{COMPONENT_NAME}}';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Components/{{COMPONENT_NAME}}',
  component: {{COMPONENT_NAME}},
} as Meta;

const Template: Story = (args) => <{{COMPONENT_NAME}} {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello Storybook',
};
