import React, { useState } from 'react';
import styles from './TeamMembers.module.scss';
import yuliaImage from '../../../assets/images/junior.jpg';
import igorImage from '../../../assets/images/Igor.jpg';

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
      image: '/images/alexey.jpg',
      description: 'Team Lead | Project Manager | Frontend Development',
      bio: [
        'Math & Computer Science Genius',
        'Extremelly Skillfull, Hardworking & Versitile Developer',
        'Kind-hearted Person',
      ],
      contributions: [
        'Led UI/UX design implementation in Figma.',
        'Established project folder structure and layout architecture.',
        'Implemented header component and registration module.',
        'Configured dynamic routing for auto-generated pages.',
        'Developed user profile page with interactive functionality.',
        'Built shopping cart page with order processing functionality.',
        'Created robust validation system for form inputs and user data.',
      ],
      gitHubUrl: 'https://github.com/morven2018',
    },
    {
      name: 'Igor Batura',
      image: igorImage,
      description: 'Senior Fullstack Developer',
      bio: [
        'Natural-Born Leader with a Vision for Technical Innovation.',
        'Extremely Talented Fullstack Developer with a Strong Work Ethic.',
        'Resilient, Disciplined & Goal-oriented.',
        'Collaborative Team Player Who Elevates Those Around Him and Amplifies Collective Success.',
      ],
      contributions: [
        'Architected and configured all project configuration files.',
        'Designed and implemented backend infrastructure with secure API endpoints and database connectivity.',
        'Developed product Catalog Page with dynamic filtering, sorting, and pagination functionality.',
        'Engineered secure login Authentication system with form validation and error handling.',
        'Partnered with the Team Lead on architectural decisions and task delegation.',
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
        'Charismatic Leader with a Passion for Innovation and Tech.',
        'Pianist, Dancer & Athlete.',
        'Creative, Analytical & Versatile.',
        'Committed to Lifelong Skill-Building.',
      ],
      contributions: [
        'Collaborated on UI/UX design system implementation.',
        'Built several sections, pages and components.',
        'Orchestrated sprint planning via Trello task tracking and executed production deployments.',
        'Implemented and configured Commerce Tools platform, optimizing product catalog management.',
        'Established comprehensive testing suite with 30%+ coverage using Jest, Vitest, and React Testing Library.',
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
      <div className={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardImage}>
              <img src={member.image} alt={member.name} />
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.cardTop}>
                <div className={styles.nameContainer}>
                  <h3
                    className={styles.name}
                    onClick={(e) => handleGitHubClick(member.gitHubUrl, e)}
                  >
                    {member.name}
                  </h3>
                  <svg
                    className={styles.githubIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    onClick={(e) => handleGitHubClick(member.gitHubUrl, e)}
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </div>
                <span className={styles.line}></span>
                <p className={styles.description}>{member.description}</p>
              </div>

              <div className={styles.bioSection}>
                <h3 className={styles.bioHeader}>About</h3>
                <div className={styles.bio}>
                  {member.bio.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={styles.cardHeader}
              onClick={(event) => {
                event.stopPropagation();
                toggleAccordion(index);
              }}
              role="button"
              aria-expanded={openAccordion === index}
            >
              <span>Contribution</span>
              <span>{openAccordion === index ? '−' : '+'}</span>
            </div>
            {openAccordion === index && (
              <div className={styles.cardContent}>
                {member.contributions.map((contribution, i) => (
                  <p key={i}>{contribution}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;