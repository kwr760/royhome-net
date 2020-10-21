import { getResumeProxy } from '../proxy/resume.proxy';

interface ResumeType {
  resume: {
    email: string;
    [emai: string]: unknown;
  }
}
export interface RouteType {
  path: string;
  exact: boolean;
  fetchData: () => Promise<ResumeType>;
}
export const fetchRoutes: RouteType[] = [
  {
    path: '/',
    exact: true,
    fetchData: async (): Promise<ResumeType> => {
      const email = 'kroy760@gmail.com';
      const resume = await getResumeProxy(email);
      return {
        resume: {
          email: email,
          [email]: resume,
        },
      };
    },
  },
];
