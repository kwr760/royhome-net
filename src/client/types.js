import { type Node } from 'react';

export type Context = {
  data: {
    courses: {
      status: number,
      body: Object,
    }
  }
};

export type Props = {
  context: Context,
  path: string,
  userRole: string,
  url: {
    basename?: string,
    location?: string | Location,
    context: Context,
    children?: Node,
  },
};
