const express = require("express");
const router = express.Router();
const control = require("../controllers/control");

router.get("/", control.list);
router.post("/add", control.add);
router.get("/delete/:id", control.delete);
router.get("/change/:id", control.changeGet);
router.post("/change/:id", control.changePost);

module.exports = router;