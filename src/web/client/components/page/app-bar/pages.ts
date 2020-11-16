import { TabPageType } from '../../../../types/pages.types';

export const pages: TabPageType[] = [
  {
    name: 'Resume',
    path: '/',
    tab: 0,
  },
  {
    name: 'About',
    path: '/about',
    tab: 1,
  },
  {
    name: 'Author',
    path: '/author',
    tab: 2,
  },
  {
    name: 'Work In Progress',
    path: '/tictoctoe',
    role: 'engineer',
    authenticated: true,
    tab: 3,
  },
];

