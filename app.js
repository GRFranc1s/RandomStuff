const express = require('express');
const app = express();
const fs   = require("fs");
const bodyparser = require('body-parser');
const customers = require('./customers.json');
const agents = require('./agents.json');

app.use(bodyparser.json());

app.get("/", (req, res) => {
    if(agents.length > 0) {
        res.send(agents);
    } else{
        res.send("No agents available");
        
    }
});


app.post("/agentlist/add", (req, res) =>{
     let newAgent = req.body;
     let x = agents.filter(d=>d._id ==req.body._id);
        if(x.length < 1 ){
           agents.push(newAgent);
             fs.writeFile("./agents.json", JSON.stringify(agents), function(err) {
                if(err) {
                    return console.log(err);
                     throw err;
                     }   
                  fs.readFile('./agents.json', function read(err, data) {
                     if (err) {
                    throw err;
                    }
                     res.send(data);
                });
            });
         } else{
           res.send("An agent with that id already exists. A duplicate cannot be added.");
         }
        });



app.post("/agentdetail/update/", (req, res) => {
        const matchLocation = agents.findIndex(d=>d._id==req.body._id);
        if(matchLocation > -1){
         agents[matchLocation] = req.body;

         fs.writeFile("./agents.json", JSON.stringify(agents), function(err) {
            if(err) {
                return console.log(err);
                throw err;
            }
            fs.readFile('./agents.json', function read(err, data) {
                if (err) {
                    throw err;
                }
                res.send(JSON.parse(data));
                 res.end();
             })
        });
    } else{
        res.send("No agents found with provided id.")
    }
});

app.get("/customer/list/:_id", (req, res) => {
       let ci = customers.filter(d => d.agent_id == req.params._id);
       if(ci.length > 0){
        res.send(ci);
       } else {
           res.send("No customers found with the id provided.")
       }
});

app.post("/customer/add", (req, res) => {
    let newCustomer = req.body;
    let x = customers.filter(d=>d._id ==req.body.id);
    if(x.length < 1){
       customers.push(newCustomer);
      fs.writeFile("./customers.json", JSON.stringify(customers), function(err) {
       if(err) {
           return console.log(err);
           throw err;
       }
       fs.readFile('./customers.json', function read(err, data) {
           if (err) {
               throw err;
           }
            res.send(data);
        })
       });
   } else{
       res.send("customer already exists. cannot add.");
   }
});

app.get("/customer/delete/:_id", (req, res) => {
    let matchIndex = customers.findIndex(y=>y._id ==req.params._id);
    if(matchIndex > -1){
     customers.splice(matchIndex,1);
         fs.writeFile("./customers.json", JSON.stringify(customers), function(err) {
            if(err) {
              return console.log(err);
              throw err;
        }
          fs.readFile('./customers.json', function read(err, data) {
            if (err) {
                throw err;
            }
             res.send(data);
             });
        }); 
     } else{
        res.send("No matching record found. No records deleted.");
        }
   
});

app.get("/customerdetail/:_id", (req, res) => {
    const customersInfo = customers.filter(d => d._id==req.params._id);
    if(customersInfo.length > 0){
        res.send(customersInfo);
    } else{
        res.send("no customers found with this id");
    }
});

app.post("/customerdetail/update/", (req, res) => {
        // const customerInfo = customers.filter(d => d._id==req.params.id);
        //  if(customerInfo.length > 0){
        // customerInfo[0][req.params.field] = req.params.value;
        const matchLocation = customers.findIndex(d => d._id==req.body._id);
        if(matchLocation > -1){
         customers[matchLocation] = req.body;
        
         fs.writeFile("./customers.json", JSON.stringify(customers), function(err) {
            if(err) {
                return console.log(err);
                throw err;
            }
            fs.readFile('./customers.json', function read(err, data) {
                if (err) {
                    throw err;
                }
                res.send(JSON.parse(data));
                 res.end();
             })
            });
        } else{
            res.send("No customer found with this id.");
        }
           
});


app.listen(3003, () =>{
    console.log("live on port 3003");
});