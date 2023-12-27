import React, { useState } from "react";
import styles from "./Timeline.module.css";
// import useFetch from "../../../useFetch";
import {
  GanttComponent,
  TaskFieldsModel,
  ColumnsDirective,
  ColumnDirective,
  Edit,
  Inject,
  Toolbar,
  Selection,
} from "@syncfusion/ej2-react-gantt";
// import { projectData } from "./data";

function Timeline({ projectId, projectInfo, setProjectInfo, userInfoOfUser }) {
  const [user, setUser] = useState(userInfoOfUser);

  console.log("this is project id");
  // console.log(projectId)
  console.log("this is the projectInfo");
  // console.log(projectInfo)

  // const {
  //   data: sectionData,
  //   is__Pending,
  //   is__error,
  // } = useFetch(`http://localhost:8000/sectionList?projectId_like=${projectId}`);

  // const {
  //   data: taskData,
  //   isPending,
  //   iserror,
  // } = useFetch("http://localhost:8000/taskList");

  const sectionData = [];
  const taskData = [];

  const taskList = [];
  const projectData = [];
  sectionData &&
    sectionData.map((onlySection) => {
      onlySection.taskIDList.map((onlyTask) => {
        taskList.push(onlyTask);
      });
    });

  taskData &&
    taskData.map((onlyOriginalTask) => {
      taskList.map((onlytask) => {
        if (onlyOriginalTask.id === onlytask) {
          projectData.push(onlyOriginalTask);
        }
      });
    });
  // const {
  //   data: userData,
  //   is_Pending,
  //   is_error,
  // } = useFetch("http://localhost:8000/userList");

  const userData = [];

  const projectResources = [];
  userData &&
    userData.map((onlyuser) => {
      var object = { resourceId: onlyuser.id, resourceName: onlyuser.userName };
      projectResources.push(object);
    });

  // projectData && projectData.map((onlyProject) => {
  //   var object = { resourceId: onlyProject.id, resourceName:  onlyProject.userName};
  //   projectResources.push(object)
  // })

  const editOptions = {
    allowEditing: true,
    allowAdding: false,
    allowDeleting: false,
    allowTaskbarEditing: true,
    mode: "Auto",
  };
  const taskValues = {
    id: "id",
    name: "taskName",
    startDate: "taskStartDate",
    endDate: "taskDeadline",
    resourceInfo: "taskAssignee",
    // taskDeadline: "taskDeadline",
    // duration: "Duration",
    // dependency: "Predeceesor",
    // child: "subtasks",
  };

  const labelSettings = {
    rightLabel: "taskAssignee",
  };
  const resourceFields = {
    id: "resourceId",
    name: "resourceName",
  };

  const splitterSettings = {
    position: "30%",
  };
  // {projectData && console.log(projectData[0].startDate.toDateString())}
  return (
    <div className={styles.timelineMainView}>
      {projectData && (
        <GanttComponent
          labelSettings={labelSettings}
          resourceFields={resourceFields}
          resources={projectResources}
          dataSource={projectData}
          taskFields={taskValues}
          editSettings={editOptions}
          splitterSettings={splitterSettings}
          toolbar={
            [
              // "Add",
              // "Edit",
              // "Delete",
              // "Update",
              // "Cancel",
              // "ExpandAll",
              // "CollapseAll",
            ]
          }
          // allowSelection={true}
          height="100%"
        >
          <Inject services={[Edit, Toolbar, Selection]}></Inject>
          <ColumnsDirective backGgoundColor="black">
            <ColumnDirective
              width="50"
              padding="0"
              field="id"
              headerText="ID"
            ></ColumnDirective>
            <ColumnDirective
              width="50"
              field="taskName"
              headerText="Name"
            ></ColumnDirective>
            <ColumnDirective
              width="50"
              field="taskStartDate"
              format="dd-MMM-yy"
            ></ColumnDirective>
            <ColumnDirective
              width="50"
              field="taskDeadline"
              format="dd-MMM-yy"
            ></ColumnDirective>
          </ColumnsDirective>
        </GanttComponent>
      )}
    </div>
  );
}

export default Timeline;
