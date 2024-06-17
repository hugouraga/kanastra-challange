import { render, screen } from '@testing-library/react';
import { NavMain } from '../../components/ui/nav-main';
import { describe, it, expect } from 'vitest';

describe('NavMain component - Unit test', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <NavMain>
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </NavMain>
    );

    const homeLink = getByText('Home');
    const aboutLink = getByText('About');
    const contactLink = getByText('Contact');
    expect(homeLink).toBeTruthy();
    expect(aboutLink).toBeTruthy();
    expect(contactLink).toBeTruthy();
  });

  it('renders navigation container with correct class', () => {
    render(
      <NavMain>
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </NavMain>
    );
    const navElement = screen.getByRole('navigation');
    expect(navElement.classList.contains('md:flex')).toBe(true);
    expect(navElement.classList.contains('space-x-4')).toBe(true);
  });
});
