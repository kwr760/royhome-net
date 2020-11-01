import React from 'react';
import { render } from '@testing-library/react';
import { SkillsType } from '../../../../../types/resume.types';

import ResumeSkills from './index';

describe('client/components/resume/skills', () => {
  it('should render', () => {
    // Arrange
    const skills = [{
      id: 1,
      position: 1,
      name: 'Skill #1',
      items: [{
        id: 1,
        position: 1,
        name: 'item: a1',
      }, {
        id: 2,
        position: 2,
        name: 'item: a2',
      }],
    }, {
      id: 2,
      position: 2,
      name: 'Skill #2',
      items: [{
        id: 1,
        position: 1,
        name: 'item: b1',
      }, {
        id: 2,
        position: 2,
        name: 'item: b2',
      }],
    }];

    // Act
    const { getByText } = render(
      <ResumeSkills skills={skills} />,
    );

    // Assert
    getByText('Skills');
    getByText('Skill #1');
    getByText('Skill #2');
    getByText('item: a1, item: a2');
    getByText('item: b1, item: b2');
  });
  it('should render without props', () => {
    // Arrange
    const skills: SkillsType[] = [];

    // Act
    const { getByText } = render(
      <ResumeSkills skills={skills}/>,
    );

    // Assert
    getByText('Skills');
  });
});
