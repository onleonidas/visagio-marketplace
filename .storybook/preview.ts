import { Preview } from '@storybook/react';
import { fn } from '@storybook/test';  // Import the fn function
import '../src/index.css';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: {
      handles: {
        onClick: fn(),  // Explicitly define actions with fn
        onSubmit: fn(),  // Add more as needed
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
