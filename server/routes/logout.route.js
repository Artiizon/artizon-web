import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => {
    res.clearCookie('customer_token');
    return res.json({ Status: "Success_Logout" });
});

export default router;