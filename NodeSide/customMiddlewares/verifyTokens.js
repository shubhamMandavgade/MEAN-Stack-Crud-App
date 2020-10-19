const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const tokenString = extractToken(req);
    //console.log(tokenString)
    if (tokenString === null) {
        res.status(401);
        return res.json({
            sc: 401,
            sm: "Token not found"
        });
    } else {
        jwt.verify(tokenString, 'hjn6jvn2ais1knpw1222kinsisan13y787y1787', function (err, decoded) {
            if (err) {
                res.status(401);
                return res.json({
                    sc: 401,
                    sm: "Unauthorized"
                });
            } else {
                //console.log(decoded)
                next();
            }
        })
    }
}

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

module.exports = validateToken