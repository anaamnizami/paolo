const express = require('express');
const authRoutes = require('./routes/auth');
const signatureRoutes = require('./routes/signature')
const signatures = require('./routes/signatures')
const hellosign = require('hellosign-sdk')({ key: '01907c62f628a5cdc66a48fb754467d7a2073f1d1114e7b86dcf26649ab641db'});

const team = require('./routes/team')
// const app = require('express');
const appapi = require('./routes/appapi')
const addinfo = require('./routes/addfile')
const getfile = require('./routes/getfile')
const getapps = require('./routes/getapp')
 const applicant = require('./routes/applicants')
const templates = require('./routes/templates')
const bulk = require('./routes/bulk')
const unclaimed_draft = require('./routes/unclaimed_draft')
const embedded = require('./routes/embedded')
const dotenv = require('dotenv')
var multer = require('multer');
const bodyParser = require('body-parser')


const app = express();

// app.use(bodyParser.urlencoded({ extended: true })); 
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './uploads/')
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({ storage: storage })
dotenv.config()
// var upload = multer();




app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(upload.array()); 

app.use('/api', authRoutes)
app.use('/api/signature_request',signatureRoutes)
app.use('/api/signatures',signatures)
app.use('/api/teams',team)
app.use('/api/api_app', appapi)
app.use('/api/template',templates)
app.use('/api/bulk_send_job',bulk)
app.use('/embedded',embedded)
app.use('/unclaimed_draft',unclaimed_draft)
app.use('/applicants', applicant)
app.use('/getap',getapps)
app.use('/addinfo',addinfo)
app.use('/getfile',getfile)



app.listen(3700,()=>{
    console.log('starting app')
})