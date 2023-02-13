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


function createProjectDiv(projectNumber){
    let inputNewProject = `
    <a href = "/task">
        <button id = "project-btn-${projectNumber}" class = "project-outer-btn" onmouseover="changeDisplay(${projectNumber})">
        
            <div class = "project-div">
                <div class = "project-icon-functions-div">
                    <div class = "outer-div" style = "background-color:${projectList[projectNumber].backGroundColor}">
                        <div id="project-favorite-${projectNumber}" class = "project-function-0">
                            <img class="project-favorite-icon" src="https://img.icons8.com/windows/32/000000/star--v1.png"/>
                        </div>
                        <div class = "project-icon-div">
                            <img class = "project-icon" src= "${projectList[projectNumber].backgroundImage}">
                        </div>
                        <div id="project-options-${projectNumber}" class = "project-function-1">
                                <h2><sup>...</sup></h2>
                        </div>
                    </div>
                </div>
                <div class = "project-name-div">
                    <h4>${projectList[projectNumber].projectName}</h4>
                </div>
            </div>
       
        </button>
    </a> 
    `;

    document.querySelector(".project-main-display").innerHTML += inputNewProject;
}

function changeDisplay(projectNumber){

    $(function(){
        $(`#project-btn-${projectNumber}`).hover(function() {
          $(`#project-favorite-${projectNumber}`).addClass('project-function-0-hovered');
          $(`#project-options-${projectNumber}`).addClass('project-function-1-hovered');
        }, function() {
          $(`#project-favorite-${projectNumber}`).removeClass('project-function-0-hovered');
          $(`#project-options-${projectNumber}`).removeClass('project-function-1-hovered');
        })
      });
}

function createNewProjectDiv(){
    getModalForNewProject(callNumber=1);
}

function getModalForNewProject(callNumber = 0){

    var modal = document.querySelector(".project-modal-div");

    // Get the <span> element that closes the modal
    var span = document.querySelector(".project-name-input");

    // When the user clicks the button, open the modal 
    if(callNumber == 1){
        modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onkeypress = function(event) {
        if(event.key == "Enter"){
            saveProjectName();
            createProjectDiv(projectList.length-1);
            modal.style.display = "none";
        }
              
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}

function saveProjectName(){
    let newProjectName = document.querySelector(".project-name-input").value;

    projectList[projectList.length] = {
        "projectName": newProjectName,
        "favorite": "false",
        "backGroundColor": `${getBackgroundColor()}`,
        "backgroundImage": `${getBackgroundImage()}`,
        "teamMembers": [],
        "sectionList": []
    }

}

