import React from 'react';
import { Story } from '@storybook/react';
import { ProductPage } from '../pages/ProductPage';

export default {
  title: 'Paes/ProductPage',
  component: ProductPage,
};

const Template: Story = () => <ProductPage />;

export const Default = Template.bind({});
Default.args = {
  // you can add args if needed
};
