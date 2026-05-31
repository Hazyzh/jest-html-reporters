import '../node_modules/react-app-polyfill/jsdom';
import '@testing-library/jest-dom';

import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-sign' });

const originalGetComputedStyle = window.getComputedStyle;

Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: element => originalGetComputedStyle(element),
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
