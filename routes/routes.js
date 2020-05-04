const express = require("express");
let router = express.Router();
let json;
let isEmpty = require('is-empty');
const Person = require('../models/users');

router.get("/",(req,res)=>{
    
    console.log("GET ROUTE!");
    Person.find({},(err, person)=>{
        if(err){
            console.log(err);
        }else{
            
            console.log(person);
            res.json(person);
        }
    })
});





async function requestUser(req,res,next){
    try{
        let user = await Person.find({});
        res.json(user);
    }catch(e){
        res.send(e);
    }
}

 router.get("/async",requestUser);

  

router.get("/get",(req,res)=>{
    let mensaje = "No se encontro tal usuario";
    let json = [];
    let id = req.query.id;
    
    if(isEmpty(id)){
        res.send("You need a query type data to fetch for a object");
    }else{
        Person.find({},(err,person)=>{
            if(err){
                console.log(err);
            }else{
                console.log(person.length);
                for(let i = 0;i < person.length; i++){
                    let str = person[i].name;
                    let low = str.toLowerCase();
                if(id == low || id == person[i].name){
                    mensaje = person[i];
                    json.push(mensaje);
                }
            }
            if(isEmpty(json)){
                json.push(mensaje);
            }

            res.send(json);
            }
        });
    }
});

router.post("/",(req,res)=>{
   let {name, surname} = req.body;
   let newPerson = new Person({name: name, surname: surname});
   if(name && surname){
        Person.create(newPerson,(err,person)=>{
            if(err){
                console.log(err);
            }else{
                person.id = person.length++;
                console.log("Person added to db");
                console.log(person);
            }
    });
    }else{
        res.status(500).json({error: "Object must contain name and surname"});
    }
});

router.put("/:id", (req,res)=>{
   let id = req.params.id;
   Person.findByIdAndUpdate(id,req.body,(err,person)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
            console.log("updated");
        }
   });

});

router.delete("/:id", (req,res)=>{
    id = req.params.id;
    Person.findOneAndDelete(id,(err,person)=>{
        if(err){
            console.log(err);
        }else{
            console.log("borrado!");
            res.redirect("/");
        }
    });
});


module.exports = router;