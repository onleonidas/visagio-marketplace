import { StoryFn } from '@storybook/react';
import ProductPage from '../pages/ProductPage';

export default {
  title: 'Pages/ProductPage',
  component: ProductPage,
};

const Template: StoryFn = () => <ProductPage />;

export const Default = Template.bind({});
Default.args = {
  // you can add args if needed
};
