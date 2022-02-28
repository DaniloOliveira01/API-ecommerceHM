const jwt = require('jsonwebtoken');

const verifyToken = (req, res ) => {
  const authHeader =  req.headers.token
  if(authHeader) {
    const token = authHeader.split('  ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if(err) res.status(403).json('o Token não é válido!');
      req.user = user;
    });
  } else {
    return res.status(401).json('Você não está autenticado!');
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () =>{
    if(req.user.id === req.params.id || req.user.isAmin) {
      next();
    } else {
      res.status(403).json('Você não tem permissão!');
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () =>{
    if(req.users.isAdmin) {
      next();
    } else {
      res.status(403).json('Você não tem permissão!');
    }
  });
};

module.exports = 

{ 
  verifyToken, 
  verifyTokenAndAuthorization, 
  verifyTokenAndAdmin, 
};