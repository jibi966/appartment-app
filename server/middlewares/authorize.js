module.exports = async (req, res, next) => {
    const AdmittedRoles = ["admin"];
    if (AdmittedRoles.includes(req.user.role)) {
        return next();
    }
    return res.status(403).send({error: true, message: "Not authorized to access this page"});
}