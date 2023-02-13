const express = require('express');
const path = require('path');
const hbs = require('hbs');
const connectDB = require('./db/mongoose');
const routes = require('./routes/userRoutes');
const User = require('./models/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

const app = express();

app.use(express.json());
app.use('/api', routes);
app.use(express.static(path.join('public')));
connectDB();

app.set('view engine', 'hbs');
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '../templates/views'));



let imagesForProjectIcon = ["https://img.icons8.com/color-glass/48/000000/list.png",
                            "https://img.icons8.com/color-glass/48/000000/generic-sorting.png",
                            "https://img.icons8.com/color-glass/48/000000/deezer.png",
                            "https://img.icons8.com/fluency/48/000000/deezer.png",
                            "https://img.icons8.com/color/48/000000/bulleted-list.png"];

let colorPallet = ["#f16b6a","#4573d2","#f1bc6d","#5da283","#f36eb2","#f16a6b","#7db387","#8c85e8","#6d6f6e"];

let projectList = [
    {
        "projectName": "FSD Project",
        "favorite": "false",
        "backGroundColor": `${getBackgroundColor()}`,
        "backgroundImage": `${getBackgroundImage()}`,
        "teamMembers": [],
        "sectionList": [
            {
                "sectionName": "Create Homepage",
                "tasks": [
                    {
                        "taskName": "Create Nav Bar",
                        "taskCompletion": "true",
                        "taskAssingedTo": "Naman",
                        "taskDeadline": "2022-03-26",
                        "taskPriority": "Medium",
                        "taskStatus": "On-Track",
                        "taskDescription": "nsdv kjbse jkv  vjkeaj ac akj ej nsdmv jke fjke kje fje",
                        "subTaskList": ["Create Nav Bar","Create Main Display","Create Features","Create "]
                    },
                    {
                        "taskName": "Create Main Display",
                        "taskCompletion": "false",
                        "taskAssingedTo": "SPK",
                        "taskDeadline": "2022-03-26",
                        "taskPriority": "High",
                        "taskStatus": "Off-Track",
                        "taskDescription": "nsdv kjbse jkv  vjkeaj ac akj ej nsdmv jke fjke kje fje",
                        "subTaskList": ["Create Nav Bar","Create Main Display","Create Features","Create display"]
                    }
                ]
            },
            {
                "sectionName": "Create SignUp Page",
                "tasks": [
                    {
                        "taskName": "Create Nav Bar",
                        "taskCompletion": "false",
                        "taskAssingedTo": "SPK",
                        "taskDeadline": "2022-03-26",
                        "taskPriority": "Medium",
                        "taskStatus": "On-Track",
                        "taskDescription": "nsdv kjbse jkv  vjkeaj ac akj ej nsdmv jke fjke kje fje",
                        "subTaskList": ["Create Nav Bar","Create Main Display","Create Features","Create "]
                    },
                    {
                        "taskName": "Create Main Display",
                        "taskCompletion": "false",
                        "taskAssingedTo": "SPK",
                        "taskDeadline": "2022-03-26",
                        "taskPriority": "Low",
                        "taskStatus": "Off-Track",
                        "taskDescription": "nsdv kjbse jkv  vjkeaj ac akj ej nsdmv jke fjke kje fje",
                        "subTaskList": ["Create Nav Bar","Create Main Display","Create Features","Create display"]
                    }
                ]
            },
            {
                "sectionName": "Create DashBoard",
                "tasks": [
                    {
                        "taskName": "Create Nav Bar",
                        "taskCompletion": "false",
                        "taskAssingedTo": "SPK",
                        "taskDeadline": "2022-03-26",
                        "taskPriority": "Medium",
                        "taskStatus": "On-Track",
                        "taskDescription": "nsdv kjbse jkv  vjkeaj ac akj ej nsdmv jke fjke kje fje",
                        "subTaskList": ["Create Nav Bar","Create Main Display","Create Features","Create "]
                    },
                    {
                        "taskName": "Create Main Display",
                        "taskCompletion": "false",
                        "taskAssingedTo": "SPK",
                        "taskDeadline": "2022-03-26",
                        "taskPriority": "Low",
                        "taskStatus": "Off-Track",
                        "taskDescription": "nsdv kjbse jkv  vjkeaj ac akj ej nsdmv jke fjke kje fje",
                        "subTaskList": ["Create Nav Bar","Create Main Display","Create Features","Create display"]
                    }
                ]
            }
        ]

    },
    {
        "projectName": "Message Box",
        "favorite": "false",
        "backGroundColor": `${getBackgroundColor()}`,
        "backgroundImage": `${getBackgroundImage()}`,
        "teamMembers": [],
        "sectionList": []

    }
]
function getBackgroundImage(){
    let random = Math.floor(Math.random() * imagesForProjectIcon.length);
    return imagesForProjectIcon[random];
}
function getBackgroundColor(){
    let random = Math.floor(Math.random() * imagesForProjectIcon.length);
    return colorPallet[random];
}

app.get("/", function (req, res) {
    res.render("homepage-index");
});
app.get("/home", function (req, res) {
    let userName = "Shreyas Kasliwal"; //username for HOME page
    res.render("home-index", { user_name: userName });
});
app.get("/projects", function (req, res) {
    res.render("projects-index", { projectListEJS: projectList });
});
app.get("/task", function (req, res) {
    res.render("task-index", { projectListEJS: projectList, projectNumber: 0 });
});
app.get("/messages", function (req, res) {
    res.render("message-index");
});
app.get("/notes", function (req, res) {
    res.render("notes-index");
});
app.get("/admin", function (req, res) {
    res.render("admin-index");
});
app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/overview', function (req, res) {
	res.render("overview-index");
});
app.get('/contact', function (req, res) {
	res.render("contact-index");
});
app.get('/aboutus', function (req, res) {
	res.render("aboutus-index");
});




// app.post('/api/login', async (req, res) => {
// 	const { email, password } = req.body
// 	const user = await User.findOne({ email }).lean()

// 	if (!user) {
// 		return res.json({ status: 'error', error: 'Invalid username/password' })
// 	}

// 	if (await bcrypt.compare(password, user.password)) {
// 		// the username, password combination is successful

// 		const token = jwt.sign(
// 			{
// 				id: user._id,
// 				email: user.email
// 			},
// 			JWT_SECRET
// 		)

// 		return res.json({ status: 'ok', data: token })
// 	}

// 	res.json({ status: 'error', error: 'Invalid username/password' })
// })

app.get('/plans', (req, res) => {
    res.render('plans');
});

app.get('/login', (req, res) => {
    res.render('login');
});


app.listen(9999, () => {
    console.log('Server up at 9999');
});


