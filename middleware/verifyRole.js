
verifyRole = (requiredRole) => (req, res, next) => {
    const userRole = req.userRole; 
    //console.log(userRole);
    if (!userRole || userRole !== requiredRole) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
  };
  
  module.exports = verifyRole;