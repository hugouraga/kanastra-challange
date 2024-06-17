import { render } from '@testing-library/react';
import { Input } from '../../components/ui/input';
import { describe, it, expect } from 'vitest';
import { Search } from 'lucide-react';
import React from 'react';

describe('Input component - Unit Tests', () => {
  it('renders correctly', () => {
    const useRefMock = vi.spyOn(React, 'useRef');
    useRefMock.mockReturnValueOnce({ current: null });

    const { getByText, getByPlaceholderText } = render(
      <Input
        type="text"
        id="test-input"
        label="Test Label"
        icon={Search}
        placeholder="Test Placeholder"
      />
    );

    const labelElement = getByText('Test Label');
    expect(labelElement).toBeTruthy();
    const inputElement = getByPlaceholderText('Test Placeholder') as HTMLInputElement;
    expect(inputElement).toBeTruthy();
    expect(inputElement.type).toBe('text');
  });
});
