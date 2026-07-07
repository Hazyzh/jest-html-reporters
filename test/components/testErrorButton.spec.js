import React from 'react';

import { ErrorButton } from '@/components/ErrorButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('test error button component', () => {
  test('button should render when there has failureMessage', () => {
    const props = {
      failureMessage: 'failure message',
    };
    render(<ErrorButton {...props} />);
    expect(screen.queryByTestId('ErrorButton')).toBeInTheDocument();
  });
  test('button should not render when there not has failureMessage', () => {
    const props = {
      failureMessage: '',
    };
    render(<ErrorButton {...props} />);
    expect(screen.queryByTestId('ErrorButton')).not.toBeInTheDocument();
  });

  test('renders base64 image attachments as images', async () => {
    render(
      <ErrorButton
        fullName='base64 image case'
        caseAttachInfos={[
          {
            filePath: 'data:image/png;base64,iVBORw0KGgo=',
            description: 'base64 screenshot',
            createTime: Date.now(),
            extName: '',
          },
        ]}
      />
    );

    fireEvent.click(screen.getByTestId('ErrorButton'));

    const image = await screen.findByAltText('base64 screenshot');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
    expect(image).toHaveAttribute('src', 'data:image/png;base64,iVBORw0KGgo=');
  });
});
