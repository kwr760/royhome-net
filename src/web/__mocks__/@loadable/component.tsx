/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, PropsWithChildren } from 'react';

export const loadableReady = (done: () => unknown) => (done());

const loadable = (load: any) => {
  let Component: FunctionComponent;
  const loadPromise = load().then((val:any ) => (Component = val.default));
  const Loadable = (props: PropsWithChildren<unknown>) => {
    if (!Component) {
      throw new Error(
        'Bundle split module not loaded yet, ensure you beforeAll(() => MyLazyComponent.load()) '
        + 'in your test, import statement: ' + load.toString());
    }
    return <Component {...props} />;
  };
  Loadable.load = () => loadPromise;
  return Loadable;
};

export default loadable;
