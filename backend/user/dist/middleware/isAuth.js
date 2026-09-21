import jwt, {} from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Please Login - No auth header"
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        const jwtSecret = process.env.JWT_SECRET;
        if (!token || !jwtSecret) {
            res.status(401).json({
                message: "Invalid authentication configuration"
            });
            return;
        }
        const decodedValue = jwt.verify(token, jwtSecret);
        if (!decodedValue || !decodedValue.user) {
            res.status(401).json({
                message: "Invalid Token"
            });
            return;
        }
        req.user = decodedValue.user;
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Please Login - JWT error"
        });
    }
};
//# sourceMappingURL=isAuth.js.map