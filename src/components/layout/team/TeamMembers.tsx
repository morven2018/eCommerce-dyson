import React, { useState } from 'react';
import styles from './TeamMembers.module.scss';
import yuliaImage from '../../../assets/images/junior.jpg';
import igorImage from '../../../assets/images/Igor.jpg';


interface TeamMember {
  name: string;
  image: string;
  description: string;
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
      contributions: [
        'Создала бэкенд API с использованием Node.js и Express.',
        'Настроила базу данных MongoDB для хранения проектных данных.',
        'Обеспечила безопасность с помощью JWT-аутентификации.',
      ],
      gitHubUrl: 'https://github.com/Ihar-Batura',
    },
    {
      name: 'Yulia Podgurskaia',
      image: yuliaImage,
      description:
        'UI/UX Design | English Translation | Automated Testing (Jest/Vitest) | Frontend Development',
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
          <div
            key={index}
            className={styles.card}
            onClick={() => handleGitHubClick(member.gitHubUrl, event)}
          >
            <div className={styles.cardImage}>
              <img src={member.image} alt={member.name} />
            </div>
            <div className={styles.cardInfo}>
              <h3 className = {styles.name }>{member.name}</h3>
              <span className={styles.line}></span>
              <p className={styles.description}>{member.description}</p>
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
