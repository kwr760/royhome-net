// @flow

const redirectInsecure = (req: Request, res: Response, next: Function) => {
  if (!req.secure) {
    res.redirect(`https://${req.headers.host}${req.url}`);
    res.end();
  }
  next();
};

export default redirectInsecure;
