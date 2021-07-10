const mongoose = require("mongoose");
const validator = require("validator")

mongoose.connect("mongodb://127.0.0.1:27017/Anmol", { URLSearchParams : true, useCreateIndex : true, useUnifiedTopology : true, usefindAndModify: true })
.then( () => { console.log('connected to database')}).catch((error) => { console.log('error occured', error)})
const express = require('express')
const app = express();


const coursesSchema = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    }   
})

const exercisesSchema = mongoose.Schema({
    courseId: {
        type : Number
    },
    name: {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    hint : {
        type : String,
        required : true
    }
})

const submissionsSchema = mongoose.Schema({
    courseId: {
        type : Number
    },
    exerciseId : {
        type : Number,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    userName: {
        type : String,
        required : true
    }
})

const courses = mongoose.model('courses', coursesSchema)
const funct = async () => {
    try {
        const courseTry = await courses.insertMany({
            name: "Aayush Bahal",
            description : "He is currently studying in College",
            id : 4
        })
    } catch (err) {
        console.log(err);
    }
}
const exercises = new mongoose.model("exercises", exercisesSchema)
const func = async () => {
    try {
        const exercisesTry = await courses.insertMany({
            "courseId": "1",
            "name": "Hello Gurgaon==--=Dharamshala",
            "content": "We are learning about the stucture and the backend work!!",
            "hint": "Heya guys this a hint for you all!!!!"
        })
    } catch (err) {
        console.log(err);
    }
}
 
const submissions = new mongoose.model("submissions", submissionsSchema)
const functi = async () => {
    try {
        const submisionsTry = await courses.insertMany({
            "courseId": "1",
            "exerciseId": "1",
            "content": "Yaha aapki submissions ka content.",
            "userName": "Rishabh Verma and Anand",
        })
    } catch (err) {
        console.log(err);
    }
}

func()
funct()
functi()