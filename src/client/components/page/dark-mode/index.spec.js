import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DarkMode from './index';
import { DarkModes } from '../../../store/session/session.constants';

jest.mock('@fortawesome/react-fontawesome');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('src/client/components/page/dark-mode', () => {
  it('renders', () => {
    // Arrange
    const setDarkness = jest.fn();
    FontAwesomeIcon.mockImplementation(({ icon }) => `Icon: ${icon}`);
    useState.mockImplementation((initial) => [initial, setDarkness]);

    // Act
    const { getByText, getByRole, getAllByRole } = render(
      <DarkMode />,
    );
    const buttons = getAllByRole('button');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[2]);

    // Assert
    getByText(/Icon: fas,lightbulb/);
    getByText(/Icon: far,lightbulb/);
    const group = getByRole('group');
    expect(group.children.length).toBe(3);
    expect(buttons.length).toBe(3);
    expect(setDarkness).toBeCalledWith(DarkModes.LIGHT_MODE);
    expect(setDarkness).toBeCalledWith(DarkModes.CLEAR_MODE);
    expect(setDarkness).toBeCalledWith(DarkModes.DARK_MODE);
  });
});
