import React from 'react';
import FooterInfo from '@/components/FooterInfo';

import { shallow } from 'enzyme';

const wrapper = shallow(<FooterInfo />);

describe('test footer reporter info', () => {
  test('there should be a footer box div', () => {
    const footerBox = wrapper.find('div.footer-box');
    expect(footerBox.length).toBe(1);
  })

  test('there should have two link in the box', () => {
    const aLinks = wrapper.find('a');
    expect(aLinks.length).toBe(2);

    const AboutLink = aLinks.get(0);
    expect(AboutLink.props.href).toEqual('https://github.com/Hazyzh/jest-html-reporters')
    expect(AboutLink.props.children).toEqual('About')

    const FeedbackLink = aLinks.get(1);
    expect(FeedbackLink.props.href).toEqual('https://github.com/Hazyzh/jest-html-reporters/issues')
    expect(FeedbackLink.props.children).toEqual('Feedback')
  })
  test('there should have bottom line box', () => {
    const bottomLine = wrapper.find('div.bottom-line');
    expect(bottomLine.length).toBe(1);
  })
})