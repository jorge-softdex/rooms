const router = require('express').Router();

const { setFileRoom,readFile} = require('../controllers/rooms');
const {saveFile}=require("../lib/process");
const multer= require('multer');
var upload = multer({ dest: './static/rooms'})

router.post('/loadfile',[upload.single('file')],saveFile,setFileRoom);
router.get('/getligths',readFile);
module.exports = router;