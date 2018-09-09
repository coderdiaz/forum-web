/**
 * Middleware for persist session between pages.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const sessionPersisted = (req, res, next) => {
  const err = req.session.error;
  const msg = req.session.notice;
  const success = req.session.success;
  const info = req.session.info;
  const errors = req.session.errors;
  const user = req.session.user;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;
  delete req.session.info;
  delete req.session.errors;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;
  if (info) res.locals.info = info;
  if (errors) res.locals.errors = errors;
  if (user) res.locals.user = user;
  next();
}

module.exports = sessionPersisted;