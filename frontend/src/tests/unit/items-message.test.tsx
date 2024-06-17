import { render } from '@testing-library/react';
import ItemsMessage from '../../components/ui/items-message';
import { describe, it, expect } from 'vitest';

describe('ItemsMessage component - Unit Tests', () => {
  it('renders message and subMessage correctly', () => {
    const message = 'Test Message';
    const subMessage = 'Test Sub Message';

    const { getByText } = render(<ItemsMessage message={message} subMessage={subMessage} />);

    const messageElement = getByText(message);
    const subMessageElement = getByText(subMessage);

    expect(messageElement).toBeTruthy();
    expect(subMessageElement).toBeTruthy();
  });

  it('renders with correct styles and structure', () => {
    const message = 'Test Message';
    const subMessage = 'Test Sub Message';

    const { getByText } = render(<ItemsMessage message={message} subMessage={subMessage} />);

    const messageElement = getByText(message);
    expect(messageElement).toBeTruthy();
    const labelElement = getByText(subMessage);
    expect(labelElement).toBeTruthy();

    const expectedClassMessageElement = "text-xl font-semibold text-gray-700";
    expectedClassMessageElement.split(" ").forEach(className => {
      expect(messageElement.classList.contains(className)).toBe(true);
    });
  });
});
