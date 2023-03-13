const jwt = require('jsonwebtoken');
const fs = require('fs')
require("dotenv").config();
// Imported dependencies
const { generateKeyPairSync } = require('crypto');
// Generate RSA keys
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    }
});

// Write key pairs to file
fs.writeFileSync('private_key.pem', privateKey);
fs.writeFileSync('public_key.pem', publicKey);

const i = 'jwt-node'
const s = 'jwt-node'
const a = 'jwt-node'

const verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: '8784h',
    algorithm: ['RS256'],
}

const generateJWT = (payload) => {
    const signOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: '8784h',
        algorithm:'RS256',
    }
    const options = signOptions
    if (payload && payload.exp) {
        delete options.expiresIn && delete payload.password
    }

    return jwt.sign(payload, privateKey, options);
}

const verifyJWT = (payload) => {
    return jwt.verify(payload, publicKey, verifyOptions);
}
const decodedRequest = (req,res,next) => {
    let token = req.cookies.authedUser
    if (!token) {
        res.status(401).send("No token provided");
    }
    const decoded = verifyJWT(token)
    if (!decoded)  res.status(403).send('invalid signature');
    if (decoded) return next() 
}
module.exports = {
    verifyJWT,
    generateJWT,
    decodedRequest,
}