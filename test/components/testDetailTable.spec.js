import '../__mocks__/matchMedia.mock';

import React from 'react';

import { DetailTable } from '@/components/DetailTable';
import {
  render,
  screen,
} from '@testing-library/react';

describe('test DetailTable ', () => {

  test('if there had failed item, should had a error button item', () => {
    const title = 'should have an error button item'
    const mockProps = {
      data: [
        { 
          failureMessages: 'failed',
          fileAttachInfos: {
            [title]: 'image01.jpg'
          },
          fullName: title
        }
      ]
    }
    render(<DetailTable {...mockProps} />)
    const errorButton = screen.getByTestId('ErrorButton');
    expect(errorButton).toBeInTheDocument();
  })
})

test('Top level test in a file', async () => {
  const title = 'top level test'
  const mockProps = {
    data: [
      {
        ancestorTitles: [],
        fileAttachInfos: {
          [title]: 'image01.jpg'
        },
        fullName: title,
        title,
        status: 'passed',
        duration: 2,
        failureMessages: [],
      },
    ],
  }
  render(<DetailTable {...mockProps} />)
  const item = await screen.findByText(title);
  expect(item).toBeInTheDocument();
})

describe('Nested describes', () => {
  test('Top level test in a describe should be prepended by describe name', async () => {
    const describeTitle = 'Nested describes'
    const title = 'top level describe test'
    const mockProps = {
      data: [
        {
          ancestorTitles: [describeTitle],
          fullName: `${describeTitle} > ${title}`,
          failureMessages: 'failed',
          fileAttachInfos: {
            [title]: 'image01.jpg'
          },
          title,
          status: 'passed',
          duration: 2,
          failureMessages: [],
        },
      ],
    }
    render(<DetailTable {...mockProps} />)
    const item = await screen.findByText(`${describeTitle} > ${title}`);
    expect(item).toBeInTheDocument();
  })

  describe('Secondary describe', () => {
    const describeTitle1 = 'Nested describes'
    const describeTitle2 = 'Secondary describe'
    const title = 'secondary describe test'
    const mockProps = {
      data: [
        {
          ancestorTitles: [describeTitle1, describeTitle2],
          fullName: [describeTitle1, describeTitle2, title].join(' '),
          failureMessages: 'failed',
          fileAttachInfos: {
            [title]: 'image01.jpg'
          },
          title,
          status: 'passed',
          duration: 2,
          failureMessages: [],
        },
      ],
    }
    test('Secondary test should be prepended by describe name', async () => {
      render(<DetailTable {...mockProps} />)
      const item = await screen.findByText([describeTitle1, describeTitle2, title].join(' > '));
      expect(item).toBeInTheDocument();
    })
  })
})
