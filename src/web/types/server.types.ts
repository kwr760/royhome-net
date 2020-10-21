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

export interface StateType {
  session: {
    authenticated: boolean;
    expiration: number;
    isLoading: boolean;
    darkMode: string;
  };
  user: unknown;
  resume?: {
    email: string;
    [email: string]: unknown;
  };
}
