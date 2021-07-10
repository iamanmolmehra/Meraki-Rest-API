const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const fs = require('fs');
const { equal } = require('assert');
const { stringify } = require('querystring');
// const connection = require('./mongoose_connection')

// list of courses
app.get("/courses", (req, res) => {
    fs.readFile(__dirname + "/courses.json", (err, data) => {
        var mydata = JSON.parse(data)
        res.json(mydata)
    });
});

// create new newcourse
app.post("/newcourses", (req, res)=>{
    var courses = req.body;
    fs.readFile(__dirname + "/courses.json", (err, data)=>{
        if (err){
            res.send({"err": "check your json file"})
        }else{
            console.log(mydata)
            var mydata = JSON.parse(data);
            var courses = {
                name: req.body.name,
                description: req.body.description,  
            }   
            courses.id = mydata.length + 1; 
            mydata.push(courses);   
            console.log(mydata);
            fs.writeFile("courses.json",JSON.stringify(mydata, null,2), function(err){
                console.log('data saved');
                return res.json(courses);  
            })
        }
    })
});

// get course details by id
app.get("/newcourses/:id", (req, res)=>{
    var id = req.params.id;
    console.log(id);
    fs.readFile("courses.json", (err, data)=>{
        var mydata = JSON.parse(data);
        for (var i of mydata){
            if (i.id == id){
                var good = true;    
                break;
            }else{
                var bad = false;
            }
        }if (good == true){     
            return res.json(i);
        }else{
            return ({"err": "check your json file"})
        }
    })
})

// edit a course by id
app.put("/newcourses/:id", (req, res)=>{
    fs.readFile(__dirname + "/courses.json", (err, data)=>{
        var mydata = JSON.parse(data);
        for (let i of mydata){
            if (i["id"] == req.params.id){
                if (i.name = req.body.hasOwnProperty("name")){
                    i.name = req.body.name;
                    // console.log(i.name);
                }
                if (i.description = req.body.hasOwnProperty("description")){
                    i.description = req.body.description;
                    // console.log(i.description);
                }
            }   
        }
        console.log(mydata);
        fs.writeFile("courses.json", JSON.stringify(mydata,null,2),(err)=>{
            if (err) throw err;
            res.json(mydata);
        })
    });
})

// get exercises of a course
app.get("/newcourses/:id/exercises", (req, res)=>{
    fs.readFile("exercises.json", (err, data)=>{
        if (err){
            return ({"error": "cyou are almost there brother!"});
        }else{
            var mydata = JSON.parse(data);
            return res.json(mydata);
        }
    })
})
  
app.post("/newcourses/:id/exercises", (req, res) => {
    fs.readFile("exercises.json", (err, data) => {
        if (err) {
            return ({"error": "you are almost there brother!"});
        } else {
                var mydata = JSON.parse(data);
                var exercises = {
                    "courseId": req.body.id,
                    "name": req.body.name,
                    "content": req.body.content,
                    "hint": req.body.hint
                }
                exercises.id = mydata[req.params.id-1].exercises.length + 1;
                mydata[req.params.id-1].exercises.push(exercises);
                fs.writeFile("exercises.json", JSON.stringify(mydata, null, 2), (err) => {
                    return res.json(mydata)
                    console.log('data daved successfully');
                })
        }
    })
})

// get exercise by Id
app.get("/newcourses/:id/exercises/:Id", (req, res)=>{
    fs.readFile(__dirname + "/exercises.json", (err, data)=>{
        if (err){
            return res.send({"Error": "check your json file"});
        }else{
            var mydata = JSON.parse(data);
            if(req.params.Id > mydata[req.params.id-1].exercises.length){
            return res.send({"Error": "This content is not available in your JSON."})
        } else{
            console.log(mydata);
            var userDetails = mydata[req.params.id-1].exercises[req.params.Id-1];
            return res.json(userDetails);
        }
        }
    })
})

// edit exercise by id
app.put("/newcourses/:id/exercises/:Id", (req, res)=>{
    fs.readFile(__dirname + "/exercises.json", (err, data)=>{
        if (err){
            return res.send({"Error": "check your json file"});
        }else{
            var mydata = JSON.parse(data);
            var userDetails = mydata[req.params.id-1].exercises[req.params.Id-1];
            if (userDetails.hasOwnProperty("name")){
                userDetails.name = req.body.name;
            }
            if (userDetails.hasOwnProperty("hint")){
                userDetails.hint = req.body.hint;
            }
        }
        fs.writeFile(__dirname + "/exercises.json", JSON.stringify(mydata,null,2), (err) => {
            if (err) throw err;
            return res.send(mydata);
        })
    })
})

// get submissions of an exercise
app.get("/newcourses/:id/exercises/:Id/submissions", (req, res)=>{
    fs.readFile("submissions.json", (err, data) =>{ 
        if (err) {
            return res.send({"Error": "check your json file"});
        } else {
            var mydata = JSON.parse(data);
            var userDetails = mydata[req.params.id-1].exercises[req.params.Id-1];
            if (userDetails.hasOwnProperty("submissions")){
                return res.json(userDetails.submissions);
            }else{
                mydata[req.params.id-1].exercises[req.params.Id-1].submissions=[];
                fs.writeFileSync("submissions.json", JSON.stringify(mydata,null,2))
                    return res.json(mydata);
            }
        }
    })
})

app.post("/newcourses/:id/exercises/:Id/submissions", (req, res) => {
    fs.readFile("submissions.json", (err, data) => {
        if (err) {
            return res.send({"error" : "you almost did it brother!"})
        } else {
            var mydata = JSON.parse(data)
            var submissions = {
                "courseId": req.body.courseId,
                "exerciseId": req.body.exerciseId,
                "content": req.body.content,
                "userName": req.body.userName
            }
            submissions.id = mydata[req.params.id-1].exercises[req.params.Id-1].submissions.length + 1
            mydata[req.params.id-1].exercises[req.params.Id-1].submissions.push(submissions);
            fs.writeFile("submissions.json", JSON.stringify(mydata, null, 2), (err) => {
                return res.send(mydata)            
            })
        }
    })
})

const PORT = process.env.PORT || 2021
app.listen(2021, () => {
    console.log(`connected successfully with port ${PORT}`);
});
    