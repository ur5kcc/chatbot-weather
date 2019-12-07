export async function authorizeRequest(req, res, next) {
  if (req.header.authorization !== process.env.AUTH_TOKEN) {
    return res.status(403).send({message: 'Not authorized'});
  }
  next();
}
