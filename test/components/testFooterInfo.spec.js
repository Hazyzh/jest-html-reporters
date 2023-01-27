import React from 'react';

import { FooterInfo } from '@/components/FooterInfo';
import { render } from '@testing-library/react';

let container;
beforeEach(() => {
  container = render(<FooterInfo />).container
})

describe('test footer reporter info', () => {
  test('there should be a footer box div', () => {
    expect(container.getElementsByClassName('footer-box').length).toBe(1)
  })

  test('there should have two link in the box', () => {
    const aLinks = container.getElementsByTagName('a')
    expect(aLinks.length).toBe(2)

    const AboutLink = aLinks[0]
    expect(AboutLink.href).toEqual('https://github.com/Hazyzh/jest-html-reporters')
    expect(AboutLink.textContent).toEqual('About')

    const FeedbackLink = aLinks[1]
    expect(FeedbackLink.href).toEqual('https://github.com/Hazyzh/jest-html-reporters/issues')
    expect(FeedbackLink.textContent).toEqual('Feedback')
  })
  test('there should have bottom line box', () => {
    expect(container.getElementsByClassName('bottom-line').length).toBe(1)
  })
})