import { render, screen } from '@testing-library/react';
import { NavItem } from '../../components/ui/nav-item';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('NavItem component - Unit test', () => {
  it('renders link with correct text', () => {
    const {getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <NavItem path="/" text="Home" />
      </MemoryRouter>
    );

    const linkElement = getByText('Home');
    expect(linkElement).toBeTruthy();
  });

  it('applies focus variant when active', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <NavItem path="/" text="Home" />
      </MemoryRouter>
    );

    const linkElement = getByText('Home');
    expect(linkElement.classList.contains('bg-slate-200')).toBe(true);
  });

  it('applies noFocus variant when not active', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <NavItem path="/" text="Home" />
      </MemoryRouter>
    );

    const linkElement = screen.getByText('Home');
    expect(linkElement.classList.contains('bg-slate-white')).toBe(true);
  });
});
