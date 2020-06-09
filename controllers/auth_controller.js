
const jwt = require('jsonwebtoken');
const { User } = require('../models')
///////// POST login
// Issue a access-token and  arefresh-token from email and password
const login = async (req, res) => {

    const user = await User.login(req.body.email, req.body.password);

    if (!user) {
        res.status(401).send({
            status: 'fail',
            data: 'Authentication required'
        });
        return;
    }

    // Construct jwt payload
    const payload = {
        data: {
            id: user.get('id'),
            email: user.get('email'),
        },


    };

    // Sign payload and get jw-token
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '5h'
    });

    /// sign payload and get refresh-token
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1w'
    });


    res.send({
        status: 'success',
        data: {
            access_token,
            refresh_token,
        },
    });
}
//////POST refresh
// Issue a new access-token
const refresh = (req, res) => {
    const token = getTokenFromHeaders(req);
    if (!token) {
        res.status(401).send({
            status: 'fail',
            data: 'No token found in headers. (err.4)'
        });
        return;
    }
    try {
        //verify token useing the refresh token secret
        const { data } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        ///Construct new payload
        const payload = {
            data,

        }


        // issue a new token using the access otken secret
        const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_SECRET || '5h' });

        res.send({
            status: 'success',
            data: {
                access_token,
            }
        });
    } catch (err) {
        res.status(403).send({
            status: 'fail',
            data: 'Invalid token. (err 5)'
        });
        return;
    }

}

const getTokenFromHeaders = (req) => {
    if (!req.headers.authorization) {
        return false;
    }

    const [authType, token] = req.headers.authhorization.split(' ');
    if (authType.toLowerCase() !== "bearer") {
        return false;
    }
    return token
}

module.exports = {
    login,
    refresh,
    getTokenFromHeaders
}
//////////
