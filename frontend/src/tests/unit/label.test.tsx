import { render } from '@testing-library/react';
import { Label } from '../../components/ui/label';
import { describe, it, expect } from 'vitest';

describe('Label component - Unit Tests', () => {
  it('renders title and subtitle correctly', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    const htmlFor = 'test-id';

    const { getByText } = render(<Label title={title} subtitle={subtitle} htmlFor={htmlFor} />);

    const titleLabel = getByText(title);
    const subtitleLabel = getByText(subtitle);

    expect(titleLabel).toBeTruthy();
    expect(subtitleLabel).toBeTruthy();
  });

  it('renders with correct styles and structure', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    const htmlFor = 'test-id';

    const { getByText } = render(<Label title={title} subtitle={subtitle} htmlFor={htmlFor} />);

    const titleLabel = getByText(title);
    const subtitleLabel = getByText(subtitle);

    const expectedClassTitleLabel = 'text-xl font-medium text-zinc-700';
    expectedClassTitleLabel.split(' ').forEach(className => {
      expect(titleLabel.classList.contains(className)).toBe(true);
    });

    const expectedClassSubtitleLabel = 'text-base font-normal text-zinc-500';
    expectedClassSubtitleLabel.split(' ').forEach(className => {
      expect(subtitleLabel.classList.contains(className)).toBe(true);
    });

  });
});
