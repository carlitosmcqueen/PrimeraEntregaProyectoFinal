const middlewares = {};

middlewares.adminAuth = (permissions) => {
    return (req, res, next) => {
        permissions === true
        ? next()
        : res
        .status(401)
        .json({ error: -1, description: "unauthorized permission" });
    };
  };
  
module.exports = middlewares;