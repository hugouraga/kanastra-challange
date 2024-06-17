import { render, screen } from '@testing-library/react';
import { Header } from '../../components/ui/header';
import { describe, it, expect } from 'vitest';

describe('Header component - Unit Tests', () => {
  it('renders logo correctly', () => {
    const { getByAltText } = render(
      <Header children={undefined} />
    );
    const logo = getByAltText('Kanastra Logo');
    expect(logo).toBeTruthy();
    const srcAttribute = logo.getAttribute('src');
    expect(srcAttribute).toBe('https://framerusercontent.com/images/f0btmN2GtVDhwuoOUM5xAjorM.png?scale-down-to=512');
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Header>
        <div>Test Child</div>
      </Header>
    );
  
    const childElement = getByText('Test Child');
    expect(childElement).toBeTruthy();
  });
});
