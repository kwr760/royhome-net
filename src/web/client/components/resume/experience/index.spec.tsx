import React from 'react';
import { render } from '@testing-library/react';
import { ExperienceType } from '../../../../../types/resume.types';

import ResumeExperience from './index';

describe('client/components/resume/experience', () => {
  it('should render', () => {
    // Arrange
    const experiences = [{
      id: 1,
      position: 1,
      title: 'title 1',
      company: 'company 1',
      startDate: 'startDate 1',
      description: [{
        id: 1,
        position: 1,
        type: 'text',
        item: 'description 1',
      }],
      bullets: [],
      techs: [],
    }, {
      id: 2,
      position: 2,
      title: 'title 2',
      company: 'company 2',
      startDate: 'startDate 2',
      endDate: 'endDate 2',
      description: [{
        id: 1,
        position: 1,
        type: 'text',
        item: 'description 2',
      }],
      bullets: [{
        id: 2,
        position: 2,
        type: 'bullet',
        item: 'bullet #1',
      }, {
        id: 3,
        position: 3,
        type: 'bullet',
        item: 'bullet #2',
      }],
      techs: [{
        id: 4,
        position: 4,
        type: 'tech',
        item: 'tech #1',
      }, {
        id: 5,
        position: 5,
        type: 'tech',
        item: 'tech #2',
      }],
    }] as ExperienceType[];

    // Act
    const { getByText } = render(
      <ResumeExperience experience={experiences} />,
    );

    // Assert
    getByText('Professional Experience');
    getByText('title 1 at company 1');
    getByText('startDate 1 - current');
    getByText('description 1');
    getByText('title 2 at company 2');
    getByText('startDate 2 - endDate 2');
    getByText('description 2');
    getByText('bullet #1');
    getByText('bullet #2');
    getByText('tech #1, tech #2');
  });
  it('should render without props', () => {
    // Arrange
    const experiences: ExperienceType[] = [];

    // Act
    const { getByText } = render(
      <ResumeExperience experience={experiences}/>,
    );

    // Assert
    getByText('Professional Experience');
  });
});
