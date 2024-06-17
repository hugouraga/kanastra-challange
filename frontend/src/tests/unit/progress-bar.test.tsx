import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../../components/ui/progress-bar';
import { describe, it, expect } from 'vitest';

describe('ProgressBar component - Unit test', () => {
  it('renders percentage text when progress is greater than 3%', () => {
    const { getByText } = render(<ProgressBar progress={5} />);
    const percentageText = getByText('5%');
    expect(percentageText).toBeTruthy();
  });

  it('does not render percentage text when progress is 3% or less', () => {
    const {queryByText} = render(<ProgressBar progress={3} />);
    const percentageText = queryByText(/%\b/);
    expect(percentageText).not.toBeTruthy();
  });
});
