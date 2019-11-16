const redirectInsecure = (req, res, next) => {
  if (!req.secure) {
    res.redirect(`https://${req.headers.host}${req.url}`);
    res.end();
  }
  next();
};

export default redirectInsecure;
