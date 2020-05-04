const express = require('express');
const morgan  = require('morgan');
const app = express();
const mongoose = require('mongoose');
let UserRoute = require('./routes/routes');

let db = process.env.DATABASEURL || "mongodb://localhost:27017/apiRest";
let port = process.env.PORT || 3000;

//APP CONFIG
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//DB CONNECTION
mongoose.connect(db,{
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true

}).then(()=>{
    console.log("Conneted to DB!");
}).catch(err=>{
    console.log(err);
});
app.use("/api/users", UserRoute);


app.get("/",(req,res)=>{
    res.redirect("/api/users");
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});
