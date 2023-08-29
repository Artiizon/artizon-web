import express from 'express';

import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {

    const sql1 = 'INSERT INTO `tshirt_order` (`tmaterial`, `tcolor`, `additional_note`, `logo_file`, `expected_days`, `status`, `customer_id`) VALUES (?);';

    const VALUES1 = [req.body.material, req.body.color, req.body.note, req.body.logo, req.body.days, 'Pending', req.body.customerId];

    db.query(sql1, [VALUES1], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Insert_Data" });
        }

        const quantities = req.body.quantities;
        const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

        const orderId = result.insertId;

        for (let i = 0; i < quantities.length; i++) {
            if (quantities[i]) {
                const sql2 = 'INSERT INTO `order_quantity` (`size`, `quantity`, `tshirt_order_id`) VALUES (?);';

                const VALUES2 = [sizes[i], quantities[i], orderId];

                db.query(sql2, [VALUES2], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.json({ Error: "Error_Insert_Data" });
                    }
                });
            }
        }

        // console.log(quantities, quantities.length);
        // console.log(orderId);
        
        return res.json({ Status: "Success_Makeorder" });
    });
});

export default router;