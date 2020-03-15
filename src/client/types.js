// @flow

export type Context = {|
  data: {|
    courses: {|
      status: number,
      body: Object,
    |}
  |}
|};

export type Props = {|
  component: Object,
  context?: Context,
  path: string,
  userRole?: string,
  url?: Object,
|};
