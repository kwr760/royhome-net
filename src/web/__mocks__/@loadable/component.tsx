/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';

export const loadableReady = (done) => (done());

const loadable = (load) => {
  let Component;
  const loadPromise = load().then((val) => (Component = val.default));
  const Loadable = (props) => {
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
