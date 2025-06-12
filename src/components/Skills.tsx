import React from 'react';

const skills = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'MongoDB',
  'AWS', 'Docker', 'GraphQL', 'Styled-Components'
];

export default function SkillsTab() {
  return (
    <>
      <h2>Skills</h2>
      <ul>
        {skills.map(skill => (
          <li key={skill} style={{ marginBottom: '0.5rem' }}>{skill}</li>
        ))}
      </ul>
    </>
  );
}
