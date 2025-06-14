import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TeamMembers from '../src/components/layout/team/TeamMembers';

// Mock the image imports
vi.mock('../../../assets/images/junior.jpg', () => ({}));
vi.mock('../../../assets/images/Igor.jpg', () => ({}));
vi.mock('../../../assets/images/team.png', () => ({}));
vi.mock('../../../assets/images/Alena.jpg', () => ({}));

describe('TeamMembers Component', () => {
  it('renders the component with title and cup image', () => {
    render(<TeamMembers />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();
    expect(screen.getByAltText('golden cup')).toBeInTheDocument();
  });

  it('displays all team members with their basic information', () => {
    render(<TeamMembers />);
    const teamMembers = ['Alena Pudina', 'Igor Batura', 'Yulia Podgurskaia'];
    teamMembers.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
    expect(
      screen.getByText('Team Lead | Project Manager | Frontend Development')
    ).toBeInTheDocument();
    expect(screen.getByText('Senior Fullstack Developer')).toBeInTheDocument();
    expect(
      screen.getByText(
        'UI/UX Design | English Translation | Automated Testing (Jest/Vitest) | Frontend Development'
      )
    ).toBeInTheDocument();
  });

  it('shows GitHub links for each team member', () => {
    render(<TeamMembers />);
    const githubLinks = screen.getAllByRole('link', {
      name: /GitHub profile/i,
    });
    expect(githubLinks).toHaveLength(3);
    expect(githubLinks[0]).toHaveAttribute(
      'href',
      'https://github.com/morven2018'
    );
    expect(githubLinks[1]).toHaveAttribute(
      'href',
      'https://github.com/Ihar-Batura'
    );
    expect(githubLinks[2]).toHaveAttribute(
      'href',
      'https://github.com/yuliafire'
    );
  });

  it('displays bio information for each team member', () => {
    render(<TeamMembers />);
    expect(
      screen.getByText('Math & Computer Science Genius.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Natural-Born Leader with a Vision for Technical Innovation.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Trilingual Frontend Developer: English, Chinese, Russian.'
      )
    ).toBeInTheDocument();
  });

  it('opens GitHub profile in new tab when clicking GitHub link', () => {
    const originalOpen = window.open;
    window.open = vi.fn();
    render(<TeamMembers />);
    const githubLinks = screen.getAllByRole('link', {
      name: /GitHub profile/i,
    });
    fireEvent.click(githubLinks[0]);
    expect(window.open).toHaveBeenCalledWith(
      'https://github.com/morven2018',
      '_blank',
      'noopener, noreferrer'
    );
    window.open = originalOpen;
  });

  it('displays all contributions when accordion is open', () => {
    render(<TeamMembers />);
    const buttons = screen.getAllByRole('button', { name: /Contribution/ });
    fireEvent.click(buttons[0]);
    const contributions = [
      'Led UI/UX design implementation in Figma.',
      'Established project folder structure and layout architecture.',
      'Implemented header component and registration module.',
      'Configured dynamic routing for auto-generated pages.',
      'Developed user profile page with interactive functionality.',
      'Built shopping cart page with order processing functionality.',
      'Created robust validation system for form inputs and user data.',
      'Fixed SonarQube code quality issues and integrated mentors suggestions to optimize performance.',
    ];
    contributions.forEach((contribution) => {
      expect(screen.getByText(`✅ ${contribution}`)).toBeInTheDocument();
    });
  });
});
