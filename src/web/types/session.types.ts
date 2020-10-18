export interface SessionStateType  {
  authenticated?: boolean;
  expiration?: number;
  isLoading?: boolean;
  darkMode?: string;
}

export interface SessionActionType {
  type: string;
  payload: {
    authenticated?: boolean;
    expiration?: number;
    isLoading?: boolean;
    darkMode?: string;
  }
}
