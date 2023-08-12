import express from 'express';

import jwt from 'jsonwebtoken';

const router = express.Router();

const verifyDesigner = (req, res, next) => {
    const token = req.cookies.designer_token;
    if (!token) {
        // console.log('No customer token');
        return res.json({ Error: "Error_No_Authentication" });
    } else {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.json({ Error: "Error_Verify_Token" });
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
}

router.route('/').get(verifyDesigner, (req, res) => {
    return res.json({ Status: "Success_Authentication", email: req.email });
});

export default router;