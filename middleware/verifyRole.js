
verifyRole = (requiredRole) => (req, res, next) => {
    const userRole = req.userRole; 
    //console.log(userRole);

    // Define role-based permissions
    const permissions = {
      Admin: ['GET', 'POST', 'PUT', 'DELETE'],
      Editor: ['GET', 'POST', 'PUT', 'DELETE'],
      Viewer: ['GET']
  };
    if (!userRole ||!permissions[userRole].includes(req.method)) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
  };
  
  module.exports = verifyRole;