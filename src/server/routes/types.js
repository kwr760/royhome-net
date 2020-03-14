export type Route = {
  method: string,
  path: string,
  handler: Function,
  authenticiate: boolean,
  role: string,
  fetchData: Object,
};
