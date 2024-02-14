export default function authChecker(req, res, next) {
  const pathName = req._parsedUrl.pathname;
  const route = pathName.substring(5);
  if (req.method === 'OPTIONS') {
    next();
    return;
  }
  if (route === 'login' || route === 'registration' || route === 'logout' || route === 'logined') {
    next();
    return;
  }
  if (!req.cookies.sessionId) {
    res.status(401);
    res.end();
    return;
  }
  next();
}