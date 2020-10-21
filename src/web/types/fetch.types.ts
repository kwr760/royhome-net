export interface ResumeFetchType {
  resume: {
    email: string;
    [emai: string]: unknown;
  }
}
export interface RouteFetchType {
  path: string;
  exact: boolean;
  fetchData: () => Promise<ResumeFetchType>;
}

