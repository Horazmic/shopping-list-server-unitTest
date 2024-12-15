const profiles = require("./profiles.json");

function authorize(requiredPermission) {
  return (req, res, next) => {
    const userProfile = req.header("x-user-profile");

    if (!userProfile) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No profile provided" });
    }

    const profilePermissions = profiles[userProfile]?.permissions;
    if (
      !profilePermissions ||
      !profilePermissions.includes(requiredPermission)
    ) {
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient permissions" });
    }

    next(); // user authorized to access the endpoint
  };
}

module.exports = authorize;
