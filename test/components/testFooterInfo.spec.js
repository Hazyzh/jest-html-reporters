import React from 'react';

import { Footer } from '@/components/Footer';
import { render } from '@testing-library/react';

let container;
beforeEach(() => {
  container = render(<Footer />).container
})

describe('test footer reporter info', () => {

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
})