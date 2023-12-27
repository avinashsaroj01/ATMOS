import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import Select from "react-select";
import CommentArena from "./CommentArena";
import { useDispatch } from "react-redux";
import { assignTaskToUser, removeTaskFromUser } from "../../../features/userSlice";

const TaskModal = ({
  taskInfo,
  sectionInfo,
  show,
  closeModal,
  rerender,
  setRerender,
  projectInfo,
  AssigneeList,
  userInfo,
}) => {

  const dateFormater = (date) => {
    let newDate = new Date(date);
    // console.log(newDate, "newDate");
    const offset = newDate.getTimezoneOffset()
    newDate = new Date(newDate.getTime() - (offset * 60 * 1000))
    return newDate.toISOString().split('T')[0]
  }


  const taskCompletionOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const taskPriorityOptions = [
    { value: "Choose Priority", label: "Choose Priority" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const taskStatusOptions = [
    { value: "Choose Status", label: "Choose Status" },
    { value: "on-track", label: "On Track" },
    { value: "off-track", label: "Off Track" },
    { value: "at-risk", label: "At Risk" },
  ];

  let taskAssigneeLabel;
  for (let i = 0; i < AssigneeList.length; i++) {
    if (AssigneeList[i].value === taskInfo.taskAssignee) {
      taskAssigneeLabel = AssigneeList[i].label;
    }
  }
  let taskStatusLabel;
  for (let i = 0; i < taskStatusOptions.length; i++) {
    if (taskStatusOptions[i].value === taskInfo.taskStatus) {
      taskStatusLabel = taskStatusOptions[i].label;
    }
  }
  let taskPriorityLabel;
  for (let i = 0; i < taskPriorityOptions.length; i++) {
    if (taskPriorityOptions[i].value === taskInfo.taskPriority) {
      taskPriorityLabel = taskPriorityOptions[i].label;
    }
  }
  let taskCompletionLabel;
  for (let i = 0; i < taskCompletionOptions.length; i++) {
    if (taskCompletionOptions[i].value === taskInfo.taskCompletion) {
      taskCompletionLabel = taskCompletionOptions[i].label;
    }
  }

  // console.log(taskAssigneeLabel);

  // console.log(task);

  // console.log(taskInfo.taskDeadline
  //   , "taskInfo.taskdeadline");

  const [taskName, setTaskName] = useState(taskInfo.taskName);
  const [taskCompletion, setTaskCompletion] = useState(taskInfo.taskCompletion);
  const [taskAssignee, setTaskAssignee] = useState(taskInfo.taskAssigneeList);
  const [taskPriority, setTaskPriority] = useState(taskInfo.taskPriority);
  const [taskStatus, setTaskStatus] = useState(taskInfo.taskStatus);
  const [taskDeadline, setTaskDeadline] = useState(dateFormater(taskInfo.taskDeadline));
  const [taskStartDate, SetTaskStartDate] = useState(taskInfo.taskStartDate);
  const [taskDescription, setTaskDescription] = useState(taskInfo.taskDescription);
  const [taskComments, setTaskComments] = useState(taskInfo.taskComments);
  const [selectedAssignee, setSelectedAssignee] = useState({ value: taskAssignee, label: taskAssigneeLabel, });
  const [selectedCompletion, setSelectedCompletion] = useState({ value: taskCompletion, label: taskCompletionLabel, });
  const [selectedPriority, setSelectedPriority] = useState({ value: taskPriority, label: taskPriorityLabel, });
  const [selectedStatus, setSelectedStatus] = useState({ value: taskStatus, label: taskStatusLabel, });
  const [updateTaskAssignee, setUpdateTaskAssignee] = useState({ do: false, oldAssignee: null, });
  const [description, setDescription] = useState(true);
  const [comments, setComments] = useState(false);


  // console.log(taskStartDate, "taskInfo.taskStartDate");
  // console.log(taskDeadline, "taskInfo.taskDeadline");



  const handleSubmit = async (taskId, sectionId, sectionInfo) => {

    // fix for now
    let is2dArray = false;
    if (Array.isArray(taskAssignee)) {
      is2dArray = true;
    }
    // console.log(taskAssignee, "from modal")
    // console.log(is2dArray, "from modal");


    const task = {
      taskId,
      taskName,
      taskDescription,
      taskCompletion,
      taskPriority,
      taskStatus,
      taskAssigneeList: is2dArray ? [taskAssignee[0]] : [taskAssignee],
      taskSectionId: sectionInfo._id,
      taskProjectId: projectInfo._id,
      taskCreator: userInfo._id,
      taskCreatedAt: new Date(),
      taskDeadline,
      taskComments
    };

    console.log(task, "from modal");

    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/task/updateTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({
        taskId,
        taskName,
        taskDescription,
        taskCompletion,
        taskPriority,
        taskStatus,
        taskAssigneeList: is2dArray ? [taskAssignee[0]] : [taskAssignee],
        taskSectionId: sectionInfo._id,
        taskProjectId: projectInfo._id,
        taskCreator: userInfo._id,
        taskDeadline,
        taskComments
      })
    });

    const taskData = await response.json();
    // console.log(taskData, taskData.message, "from modal");

    setRerender(!rerender);
    closeModal();

  };

  const handleTaskAssignee = (selectedOption) => {
    if (selectedAssignee.value !== selectedOption.value) {
      setUpdateTaskAssignee((prev) => {
        prev.do = true;
        prev.oldAssignee = selectedAssignee.value;
        return prev;
      });
      // console.log("Assignee Changed", updateTaskAssignee);
    }
    setSelectedAssignee(selectedOption);
    setTaskAssignee(selectedOption.value);
    // console.log("newAssignee", selectedOption.value);
  };
  const handleTaskCompletion = (selectedOption) => {
    setSelectedCompletion(selectedOption);
    setTaskCompletion(selectedOption.value);
  };
  const handleTaskPriority = (selectedOption) => {
    setSelectedPriority(selectedOption);
    setTaskPriority(selectedOption.value);
  };
  const handleTaskStatus = (selectedOption) => {
    setSelectedStatus(selectedOption);
    setTaskStatus(selectedOption.value);
  };

  const handleDescription = (e) => {
    setDescription(true);
    setComments(false);
  };
  const handleComments = (e) => {
    setDescription(false);
    setComments(true);
  };

  return (
    <div>
      <Modal show={show} onHide={closeModal} className="task-modal">
        {/* {console.log(props.show)} */}
        <Modal.Header closeButton className="task-modal-header">
          <Modal.Title className="task-path-text">
            {projectInfo.projectName}/{sectionInfo.sectionName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="task-modal-body">
          <table className="task-modal-table">
            <tbody className="task-modal-table-body">
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Task</td>
                <td className="task-modal-table-data">
                  <input
                    className="modal-task-input modal-input modal-select"
                    type="text"
                    placeholder="Enter Task"
                    value={taskName == null ? "" : taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Completed</td>
                <td className="task-modal-table-data">
                  <Select
                    className="modal-input"
                    // placeholder='Enter Assignee'
                    defaultValue={selectedCompletion}
                    options={taskCompletionOptions}
                    onChange={handleTaskCompletion}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        // border: '1px solid #ccc',
                        color: "black",
                        backgroundColor: state.isSelected
                          ? "lightgray"
                          : "white",
                        backgroundColor: state.isFocused
                          ? "lightgray"
                          : "white",
                        ":active": {
                          backgroundColor: state.isSelected
                            ? "lightgray"
                            : "white",
                          // border: '1px solid #ccc'
                        },
                        padding: 10,
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        color: "black",
                        border: "1px solid #ccc",
                        width: "fit-content",
                        minWidth: "max-content",
                        boxShadow: "none",

                        // backgroundColor: '#edf5e1',

                        ":hover": {
                          border: "1px solid #ccc",
                        },
                      }),
                      container: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#d3f4a2',
                        // display: 'inline-flex',
                        // flexDirection: 'row',
                        // marginRight: 20
                        // minWidth: '250px'
                      }),
                      valueContainer: (provided, state) => ({
                        ...provided,
                        display: "flex",
                        width: "250px",
                        color: "black",

                        // backgroundColor: '#edf5e1',

                        // width: 'fit-content',
                        // minWidth: 'max-content',
                      }),
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // zIndex: 1,
                        // backgroundColor: '#edf5e1',
                      }),
                      input: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                        svg: {
                          // backgroundColor: "#edf5e1",
                        },
                      }),
                      menu: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      menuList: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                    }}
                  />
                </td>
              </tr>
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Assignee</td>
                <td className="task-modal-table-data">
                  <Select
                    className="modal-input"
                    placeholder="Enter Assignee"
                    defaultValue={selectedAssignee}
                    options={AssigneeList}
                    onChange={handleTaskAssignee}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        // border: '1px solid #ccc',
                        color: "black",
                        backgroundColor: state.isSelected
                          ? "lightgray"
                          : "white",
                        backgroundColor: state.isFocused
                          ? "lightgray"
                          : "white",
                        ":active": {
                          backgroundColor: state.isSelected
                            ? "lightgray"
                            : "white",
                          // border: '1px solid #ccc'
                        },
                        padding: 10,
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        color: "black",
                        border: "1px solid #ccc",
                        width: "fit-content",
                        minWidth: "max-content",
                        boxShadow: "none",

                        // backgroundColor: '#edf5e1',

                        ":hover": {
                          border: "1px solid #ccc",
                        },
                      }),
                      container: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#d3f4a2',
                        // display: 'inline-flex',
                        // flexDirection: 'row',
                        // marginRight: 20
                        // minWidth: '250px'
                      }),
                      valueContainer: (provided, state) => ({
                        ...provided,
                        display: "flex",
                        width: "250px",
                        color: "black",

                        // backgroundColor: '#edf5e1',

                        // width: 'fit-content',
                        // minWidth: 'max-content',
                      }),
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // zIndex: 1,
                        // backgroundColor: '#edf5e1',
                      }),
                      input: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                        svg: {
                          // backgroundColor: "#edf5e1",
                        },
                      }),
                      menu: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      menuList: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                    }}
                  />
                </td>
              </tr>
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Priority</td>
                <td className="task-modal-table-data">
                  <Select
                    className="modal-input"
                    placeholder="Choose Priority"
                    defaultValue={selectedPriority}
                    options={taskPriorityOptions}
                    onChange={handleTaskPriority}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        // border: '1px solid #ccc',
                        color: "black",
                        backgroundColor: state.isSelected
                          ? "lightgray"
                          : "white",
                        backgroundColor: state.isFocused
                          ? "lightgray"
                          : "white",
                        ":active": {
                          backgroundColor: state.isSelected
                            ? "lightgray"
                            : "white",
                          // border: '1px solid #ccc'
                        },
                        padding: 10,
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        color: "black",
                        border: "1px solid #ccc",
                        width: "fit-content",
                        minWidth: "max-content",
                        boxShadow: "none",

                        // backgroundColor: '#edf5e1',

                        ":hover": {
                          border: "1px solid #ccc",
                        },
                      }),
                      container: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#d3f4a2',
                        // display: 'inline-flex',
                        // flexDirection: 'row',
                        // marginRight: 20
                        // minWidth: '250px'
                      }),
                      valueContainer: (provided, state) => ({
                        ...provided,
                        display: "flex",
                        width: "250px",
                        color: "black",

                        // backgroundColor: '#edf5e1',

                        // width: 'fit-content',
                        // minWidth: 'max-content',
                      }),
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // zIndex: 1,
                        // backgroundColor: '#edf5e1',
                      }),
                      input: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                        svg: {
                          // backgroundColor: "#edf5e1",
                        },
                      }),
                      menu: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      menuList: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                    }}
                  />
                </td>
              </tr>
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Status</td>
                <td className="task-modal-table-data">
                  <Select
                    className="modal-input"
                    placeholder="Choose Status"
                    defaultValue={selectedStatus}
                    options={taskStatusOptions}
                    onChange={handleTaskStatus}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        // border: '1px solid #ccc',
                        color: "black",
                        backgroundColor: state.isSelected
                          ? "lightgray"
                          : "white",
                        backgroundColor: state.isFocused
                          ? "lightgray"
                          : "white",
                        ":active": {
                          backgroundColor: state.isSelected
                            ? "lightgray"
                            : "white",
                          // border: '1px solid #ccc'
                        },
                        padding: 10,
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        color: "black",
                        border: "1px solid #ccc",
                        width: "fit-content",
                        minWidth: "max-content",
                        boxShadow: "none",

                        // backgroundColor: '#edf5e1',

                        ":hover": {
                          border: "1px solid #ccc",
                        },
                      }),
                      container: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#d3f4a2',
                        // display: 'inline-flex',
                        // flexDirection: 'row',
                        // marginRight: 20
                        // minWidth: '250px'
                      }),
                      valueContainer: (provided, state) => ({
                        ...provided,
                        display: "flex",
                        width: "250px",
                        color: "black",

                        // backgroundColor: '#edf5e1',

                        // width: 'fit-content',
                        // minWidth: 'max-content',
                      }),
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // zIndex: 1,
                        // backgroundColor: '#edf5e1',
                      }),
                      input: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                        svg: {
                          // backgroundColor: "#edf5e1",
                        },
                      }),
                      menu: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                      menuList: (provided, state) => ({
                        ...provided,
                        color: "black",
                        // backgroundColor: '#edf5e1',
                      }),
                    }}
                  />
                </td>
              </tr>
              <tr className="task-modal-table-row">
                <td className="task-modal-table-data">Deadline</td>
                <td className="task-modal-table-data">
                  <input
                    className="modal-input modal-select"
                    type="date"
                    value={taskDeadline == '1970-01-01' ? taskStartDate : taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <Nav className="task-modal-nav-bar" as="ul">
            <Nav.Item as="li">
              <Nav.Link
                className="active-nav-option task-modal-nav-option task-modal-option-1"
                onClick={handleDescription}
              >
                Description
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                className="task-modal-nav-option task-modal-option-2"
                onClick={handleComments}
              >
                Comments
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <hr className="task-modal-line-below-nav"></hr>
          {description && (
            <div className="task-modal-description-div">
              <textarea
                className="task-modal-description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                rows={5}
                placeholder="describe your task for your team members"
              ></textarea>
            </div>
          )}
          {comments && (
            <div>
              <CommentArena
                taskInfo={taskInfo}
                taskComments={taskComments}
                setTaskComments={setTaskComments}
                userInfo={userInfo}
              />
            </div>
          )}
          {/* To Do: Make description active */}
        </Modal.Body>
        <Modal.Footer className="task-modal-footer">
          <Button
            variant="primary"
            onClick={() => {
              // console.log(taskInfo)
              // console.log(props.taskInfo)
              handleSubmit(taskInfo._id, sectionInfo._id, sectionInfo);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default TaskModal;
