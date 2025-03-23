const { ensureAuthenticated } = require('../Middlewares/Auth');


const router = require('express').Router();


router.get('/',ensureAuthenticated,(req,res)=>{
    res.status(200).send([
        {
            id:1,
            name:"product1",
            price:100
        },
        {
            id:2,
            name:"product2",
            price:200
        },
        {
            id:3,
            name:"product3",
            price:300
        }]
    )
});


module.exports = router;