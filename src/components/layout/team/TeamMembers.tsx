import React, { useState } from 'react';
import styles from './TeamMembers.module.scss';
import yuliaImage from '@assets/images/junior.jpg';
import igorImage from '@assets/images/Igor.jpg';
import goldenCup from '@assets/images/team.png';
import alenaImage from '@assets/images/Alena.jpg';

interface TeamMember {
  name: string;
  image: string;
  description: string;
  bio: string[];
  contributions: string[];
  gitHubUrl: string;
}

const TeamMembers: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const teamMembers: TeamMember[] = [
    {
      name: 'Alena Pudina',
      image: alenaImage,
      description: 'Team Lead | Project Manager | Frontend Development',
      bio: [
        'Math & Computer Science Genius.',
        "Skilled Programmer with a Master's Degree in Applied Mathematics and Computer Science.",
        'Excelled in Physics and Chemistry Olympiads during her School Years.',
        'Experience as a Project Manager.',
      ],
      contributions: [
        'Led UI/UX design implementation in Figma.',
        'Established Project folder structure and Layout Architecture.',
        'Implemented Header component and Registration Module.',
        'Configured dynamic Routing for auto-generated pages.',
        'Developed User Profile page with interactive functionality.',
        'Built shopping Cart Page with order processing functionality.',
        'Created robust Validation System for form inputs and user data.',
        'Fixed SonarQube code quality issues and integrated mentors suggestions to optimize performance.',
      ],
      gitHubUrl: 'https://github.com/morven2018',
    },
    {
      name: 'Igor Batura',
      image: igorImage,
      description: 'Senior Fullstack Developer',
      bio: [
        'Natural-Born Leader with a Vision for Technical Innovation.',
        'Extremely Talented & Skilled Fullstack Developer with a Strong Work Ethic.',
        'Resilient, Disciplined & Goal-oriented.',
        'Collaborative Team Player Who Elevates Those Around Him and Amplifies Collective Success.',
      ],
      contributions: [
        'Partnered with the Team Lead on architectural decisions and task delegation.',
        'Architected and configured all project configuration files.',
        'Designed and implemented Backend infrastructure with secure API endpoints and database connectivity.',
        'Developed product Catalog Page with dynamic filtering, sorting, and pagination functionality.',
        'Engineered secure login Authentication system with form validation and error handling.',
        'Fixed SonarQube code quality issues and integrated mentors suggestions to optimize performance.',
        'Implemented a Router for page navigation and redirecting authorized/unauthorized users based on manual browser URL changes.',
        'Reviewed Junior Developer code, providing constructive feedback and mentorship.',
      ],
      gitHubUrl: 'https://github.com/Ihar-Batura',
    },
    {
      name: 'Yulia Podgurskaia',
      image: yuliaImage,
      description:
        'UI/UX Design | English Translation | Automated Testing (Jest/Vitest) | Frontend Development',
      bio: [
        'Trilingual Frontend Developer: English, Chinese, Russian.',
        'Excelled in Math, Chemistry, Russian, English Olympiads and Music Competitions.',
        'Received a Medal for Academic Excellence.',
        'Graduated with Two Diplomas with Honors.',
        'Pianist, Dancer & Athlete.',
      ],
      contributions: [
        'Collaborated on UI/UX design system implementation.',
        'Built several sections, pages and components (Promo Code, About Page, Besteseller, Popular, Strengths, Card Component, Footer).',
        'Orchestrated sprint planning via Trello task tracking and executed production deployments.',
        'Configured Commerce Tools platform, optimizing product catalog management.',
        'Established comprehensive testing suite with 30%+ coverage using Jest, Vitest, and React Testing Library.',
        'Conducted manual testing on multiple browsers and devices for reliability.',
        'Refactored Codebase, fixed SonarQube issues, integrated mentors code review suggestions.',
      ],
      gitHubUrl: 'https://github.com/yuliafire',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleGitHubClick = (url: string, event: React.MouseEvent) => {
    event.stopPropagation();
    window.open(url, '_blank', 'noopener, noreferrer');
  };

  return (
    <div className={styles.teamWrapper}>
      <h2 className={styles.title}>Our Team</h2>
      <img src={goldenCup} className={styles.cup} alt="golden cup" />
      <div className={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <div key={index * 10} className={styles.card}>
            <div className={styles.cardImage}>
              <img src={member.image} alt={member.name} />
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.cardTop}>
                <div className={styles.nameContainer}>
                  <a
                    href={member.gitHubUrl}
                    className={styles.name}
                    onClick={(e) => handleGitHubClick(member.gitHubUrl, e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${member.name}'s GitHub profile`}
                  >
                    {member.name}
                  </a>
                  <a
                    href={member.gitHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubIcon}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                </div>
                <span className={styles.line}></span>
                <p className={styles.description}>{member.description}</p>
              </div>

              <div className={styles.bioSection}>
                <h3 className={styles.bioHeader}>About</h3>
                <div className={styles.bio}>
                  {member.bio.map((line, i) => (
                    <p key={i * 100}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
            <button
              className={styles.cardHeader}
              onClick={(event) => {
                event.stopPropagation();
                toggleAccordion(index);
              }}
              aria-expanded={openAccordion === index}
            >
              <span>Contribution</span>
              <span>{openAccordion === index ? '−' : '+'}</span>
            </button>
            {openAccordion === index && (
              <div className={styles.cardContent}>
                <ul className={styles.contributionList}>
                  {member.contributions.map((contribution, i) => (
                    <li key={i * 3} className={styles.contributionItem}>
                      ✓ {contribution}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
