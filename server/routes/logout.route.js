import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => {
    res.clearCookie('customer_token');
    res.clearCookie('admin_token');
    res.clearCookie('designer_token');
    res.clearCookie('manager_token');
    res.clearCookie('stylist_token');
    
    console.log('Logout successful');
    return res.json({ Status: "Success_Logout" });
});

export default router;