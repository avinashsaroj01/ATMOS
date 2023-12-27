import React, { useEffect, useState, forwardRef } from "react";
import styles from "./OverView.module.css";
import TeamMemberCard from "./TeamMemberCard";
import DescriptionComponent from "./DescriptionComponent";
import { useNavigate } from "react-router-dom";
// import { setProject, addMediumTeamMember, addHightTeamMember, addLowTeamMember } from "../../../features/projectSlice";
import { useDispatch } from 'react-redux';
import { removeProjectFromFavourite, removeProjectFromUser } from "../../../features/userSlice";
import {
  Box,
  Paper,
  Title,
  createStyles,
  Flex,
  Container,
  Group,
  Text,
  Button,
  Modal,
  Select,
  MediaQuery
} from "@mantine/core";
import { openConfirmModal, closeAllModals } from '@mantine/modals';
import { margin } from "@mui/system";

const useStyles = createStyles((theme) => ({
  aboutProjectMainView: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    height: '680px',
    minHeight: '680px',
    maxHeight: '680px',
    width: '100%',

  },

  teamMembersHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10px',
    borderRadius: '5px 5px 5px 5px',
    // backgroundColor: 'ebeff3'

  },

  teamMemberList: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    overflowY: 'scroll',
    height: '550px',
    marginBottom: '10px',

    '&::-webkit-scrollbar': {
      width: '10px',
    },
  },


  flexApart: {
    minWidth: '90%',
    padding: '0px',
    maxWidth: '100%',
  },

  outerSettingContainer: {
    border: '1px solid #dd3544',
    borderRadius: '5px',
    padding: '8px',
  },

  innerSettingContainer: {
    justifyContent: 'space-between',
    alignContent: 'center',
    border: '1px solid #ed2b3c',
    borderRadius: '5px',
    padding: '8px',
    marginBottom: '10px',
  },
  responsiveaboutProjectMainView: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    height: '680px',
    minHeight: '680px',
    maxHeight: '680px',
    width: '100%',
    padding: '10px',
  },
  responsiveTeamMembers: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    overflowY: 'scroll',
    height: '550px',
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '10px',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
  },
}));

const memberSelectItems = forwardRef(({ userName, email, _id, value, ...others }, ref) => (
  <div ref={ref} key={_id} {...others}>
    <TeamMemberCard
      name={userName}
      email={email}
    />
  </div>
));



const OverView = ({ projectId, projectInfo, setProjectInfo, userInfo }) => {
  // console.log(projectId);
  // console.log(projectInfo);

  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(projectInfo, 'projectInfo from over view');


  const [projectName, setProjectName] = useState(projectInfo.projectName);
  const [projectStatement, setProjectStatement] = useState(projectInfo.projectStatement);
  const [projectMission, setProjectMission] = useState(projectInfo.projectMission);
  const [projectDescription, setProjectDescription] = useState(projectInfo.projectDescription);
  const [projectGuidelines, setProjectGuidelines] = useState(projectInfo.projectGuidelines);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [selectedTransferMember, setSelectedTransferMember] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [opened, setOpened] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userAccessLevel, setUserAccessLevel] = useState('no access');
  const [rerender, setRerender] = useState(false);
  const projectOwnerId = projectInfo.projectOwner._id;

  useEffect(() => {
    const project = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/getProjectDetails/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      // console.log(data, 'projectInfo from main view');
      setProjectInfo(data.project);
      return data;
    }
    project();
  }, [rerender]);



  const setAccessLevelFunc = () => {
    if (projectInfo && userInfo) {
      // console.log('access Level setting');
      // console.log(userInfo, projectInfo);
      if (userInfo._id === projectInfo.projectOwner._id) {
        // console.log('owner');
        setUserAccessLevel('owner');
      }
      else if (projectInfo.projectHighAccessMembers.find((member) => member._id === userInfo._id)) {
        // console.log('high');
        setUserAccessLevel('high');
      }
      else if (projectInfo.projectMediumAccessMembers.find((member) => member._id === userInfo._id)) {
        // console.log('medium');
        setUserAccessLevel('medium');
      }
      else if (projectInfo.projectLowAccessMembers.find((member) => member._id === userInfo._id)) {
        // console.log('low');
        setUserAccessLevel('low');
      }
      else {
        // console.log('no access');
        setUserAccessLevel('no access');
      }
    }
  }

  useEffect(() => {
    setAccessLevelFunc();
  }, [projectInfo, userInfo]);



  useEffect(() => {
    const res = async () => {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/getUserList/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data, 'userList from over view');

      //add value key to each user
      data.userList.forEach((user) => {
        user.value = user._id;
        user.label = user.userName;
      });

      setUserList(data.userList);
      return data;
    }
    res();


  }, []);


  const filteredUserList = userList.filter((user) => {
    let flag = !projectInfo.projectHighAccessMembers.find((member) => {
      return member._id === user._id;
    });
    flag = flag && !projectInfo.projectMediumAccessMembers.find((member) => {
      return member._id === user._id;
    }
    );
    flag = flag && !projectInfo.projectLowAccessMembers.find((member) => {
      return member._id === user._id;
    }
    );
    return flag;
  });

  const transferOwnershipUserList = userList.filter((user) => {
    // only user that are not the owner of the project
    let flag = user._id !== projectInfo.projectOwner._id;
    //only users that are not already the owner of the project and are high access members
    flag = flag && projectInfo.projectHighAccessMembers.find((member) => {
      return member._id === user._id;
    });

    return flag;
  });

  // console.log(transferOwnershipUserList, "transferOwnershipUserList");




  const roleList = [{
    value: 'highAccess',
    label: 'High'
  }, {
    value: 'mediumAccess',
    label: 'Medium'
  }, {
    value: 'lowAccess',
    label: 'Low'
  }]

  const addTeamMember = async () => {
    // console.log(selectedTeamMember, selectedRole, "Add Team Member Data");

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/addTeamMember/${projectId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        userId: selectedTeamMember,
        accessLevel: selectedRole

      })
    });

    const data = await response.json();
    // console.log(data);
    if (data.success) {
      // console.log("Team Member Added");
      setOpened(false);
      setSelectedTeamMember(null);
      setSelectedRole(null);
      setRerender(!rerender);
    }
  }
  const handleMemberChange = (option) => {
    // console.log(option);
    setSelectedTeamMember(option);
    // console.log(selectedTeamMember, "selectedTeamMember");
  }

  const handleRoleChange = (option) => {
    // console.log(option);
    setSelectedRole(option);
  }
  const handleTransferMemberChange = (option) => {
    // console.log(option);
    setSelectedTransferMember(option);
    // console.log(selectedTransferMember, "selectedTransferMember");
  }

  const handleDeleteProject = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/deleteProject/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    })

    const data = await res.json();

    if (data.success) {
      console.log(data.message);
      navigate('/projects');
    }
  }
  const handleTransfer = async () => {
    // console.log(selectedTransferMember, "newOwner");
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/transferOwnership/${projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        newOwner: selectedTransferMember
      })
    });

    const data = await res.json();

    if (data.success) {
      console.log(data.message);
      setSelectedTransferMember(null);
      setOpenTransferModal(false);
      navigate('/projects');
    }
  }

  const openDeleteModal = () =>
    openConfirmModal({
      title: 'Delete Project',
      centered: true,
      children: (
        <Text size="sm">
          This action cannot be undone.
          This will <b>permanently delete</b> the <b>{projectInfo.projectName}</b> project, and sections, tasks, comments and remove all collaborator associations.
          <b> Are you sure you want to delete your project?</b>
        </Text>
      ),
      labels: { confirm: 'Delete Project', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => handleDeleteProject(),
    });

  return (

    <div className={styles.overviewMainView}>
      <Flex gap={20} sx={{ flexWrap: 'wrap' }}>
        <MediaQuery smallerThan={1200} styles={classes.responsiveaboutProjectMainView}>

          <Paper sx={{ minWidth: '70vw' }} withBorder p={'10px'}>
            <Flex direction={'column'} sx={classes.aboutProjectMainView}>
              <Title mb={'10px'} sx={classes.teamMembersHeading}>About Project</Title>
              {/* <div className={styles.descriptionArenaDescription}> */}
              <DescriptionComponent
                heading="Project Statement"
                description={projectStatement !== "" ? projectStatement : "What is your project about?"}
              />
              <DescriptionComponent
                heading="Project Mission"
                description={projectMission !== "" ? projectMission : "Write about the mission of your project"}
              />
              <DescriptionComponent
                heading="Project Description"
                description={projectDescription !== "" ? projectDescription : "Describe your project for your team mates."}
              />
              <DescriptionComponent
                heading="Project Guidelines"
                description={projectGuidelines !== "" ? projectGuidelines : "Share the guidelines of the project with your team mates."}
              />
              {/* </div> */}

            </Flex>

          </Paper>
        </MediaQuery>

        <MediaQuery smallerThan={1200} styles={classes.responsiveTeamMembers}>
          <Paper sx={{ minWidth: '25vw', maxHeight: '700px', minHeight: '700px' }} withBorder p={'10px'}>
            <Title mb={'10px'}>Team Members</Title>
            <Box sx={classes.teamMemberList} >
              {projectInfo.projectHighAccessMembers.map((member, index) => {
                return (
                  <TeamMemberCard
                    name={member.userName}
                    email={member.email}
                    id={member._id}
                    projectOwnerId={projectOwnerId}
                    projectId={projectId}
                    role="highAccess"
                    userAccessLevel={userAccessLevel}
                    avatar={member.avatar}
                    rightSectionIcon={true}
                    key={index}
                    rerender={rerender}
                    setRerender={setRerender}
                  />
                )
              })}
              {projectInfo.projectMediumAccessMembers.map((member, index) => {
                return (
                  <TeamMemberCard
                    name={member.userName}
                    email={member.email}
                    id={member._id}
                    projectOwnerId={projectOwnerId}
                    projectId={projectId}
                    role="mediumAccess"
                    userAccessLevel={userAccessLevel}
                    avatar={member.avatar}
                    rightSectionIcon={true}
                    key={index}
                    rerender={rerender}
                    setRerender={setRerender}
                  />
                )
              })}
              {projectInfo.projectLowAccessMembers.map((member, index) => {
                return (
                  <TeamMemberCard
                    name={member.userName}
                    email={member.email}
                    id={member._id}
                    projectOwnerId={projectOwnerId}
                    projectId={projectId}
                    role="lowAccess"
                    userAccessLevel={userAccessLevel}
                    avatar={member.avatar}
                    rightSectionIcon={true}
                    key={index}
                    rerender={rerender}
                    setRerender={setRerender}
                  />
                )
              })}
            </Box>
            {
              (
                userAccessLevel === "high" || userAccessLevel === "medium" || userAccessLevel === "owner"
              ) &&

              <>
                <Modal
                  opened={opened}
                  onClose={() => {
                    setOpened(false);
                    setSelectedTeamMember(null);
                    setSelectedRole(null);
                    // setRerender(!rerender);
                  }}
                  scrollable
                  size="lg"
                >
                  <Title>Add Team Member</Title>
                  {/* <Text>Choose a team member to add to the project</Text> */}
                  {/* {console.log(selectedTeamMember, "selectedTeamMember")} */}
                  <Select
                    label="Choose a team member to add to the project"
                    placeholder="Pick a User"
                    value={selectedTeamMember}
                    onChange={handleMemberChange}
                    itemComponent={memberSelectItems}
                    data={filteredUserList}
                    searchable
                    // maxDropdownHeight={100}
                    withinPortal
                    nothingFound="Nobody here"
                    filter={(value, item) => item.email.toLowerCase().includes(value.toLowerCase().trim()) || item.userName.toLowerCase().includes(value.toLowerCase().trim())}
                  />
                  <Select
                    label="Choose a role for the team member"
                    placeholder="Pick a Role"
                    data={roleList}
                    value={selectedRole}
                    withinPortal
                    onChange={handleRoleChange}
                  />
                  <Button onClick={addTeamMember} color="blue" mt={'30px'}>Add Team Member</Button>
                </Modal>
                <Group position="center">
                  <Button onClick={() => setOpened(true)}>Add Team Member</Button>
                </Group>
              </>
            }
          </Paper>
        </MediaQuery>

      </Flex>






      {(userAccessLevel == 'owner') && <Paper sx={{ minWidth: 'calc(100vw - 65px)' }} p={'10px'} mt={'20px'}>
        <Title mb={'10px'}>Project Settings</Title>
        <Flex direction={'column'} sx={classes.outerSettingContainer}>
          {userAccessLevel == 'owner' && <Flex direction={'row'} sx={classes.innerSettingContainer}>
            <Flex direction={'column'} >
              <Flex sx={{ flex: 1 }}>
                <Title order={4}>Delete Project</Title>
              </Flex>
              <Flex sx={{ flex: 1 }}>
                <Text>Once you delete a project, there is no going back. Please be certain.</Text>
              </Flex>
            </Flex>
            <Button onClick={openDeleteModal} color="red">Delete Project</Button>
          </Flex>}

          {userAccessLevel == 'owner' && <Flex direction={'row'} justify={'center'} align={'center'} sx={classes.innerSettingContainer}>
            <Flex direction={'column'} >
              <Flex>
                <Title order={4}>Transfer Project</Title>
              </Flex>
              <Flex>
                <Text>Transfer this project to another user or to an organization where you have the ability to create projects.</Text>
              </Flex>
            </Flex>

            <Modal
              opened={openTransferModal}
              onClose={() => {
                setOpenTransferModal(false);
                setSelectedTransferMember(null);
              }}
              title="Transfer Ownership"
              centered
              size="xl"
            >
              <>
                <Text size="sm">
                  This action cannot be undone.
                  This will <b>permanently transfer</b> the ownership of <b>{projectInfo.projectName}</b> project.
                  <b> Are you sure you want to transfer your project?</b>
                </Text>
                <hr></hr>
                < Select
                  label="Choose a team member to transfer project to (only with high access level)"
                  placeholder="Pick a User"
                  value={selectedTransferMember}
                  onChange={handleTransferMemberChange}
                  itemComponent={memberSelectItems}
                  data={transferOwnershipUserList}
                  searchable
                  // maxDropdownHeight={1000}
                  nothingFound="Nobody here"
                  filter={(value, item) => item.email.toLowerCase().includes(value.toLowerCase().trim()) || item.userName.toLowerCase().includes(value.toLowerCase().trim())}
                  withinPortal

                />
                <hr></hr>
                <Button onClick={handleTransfer} color="blue" mt={'30px'}>Transfer Project</Button>
              </>



            </Modal>

            <Button onClick={() => setOpenTransferModal(true)} variant={'danger'}>Transfer Project</Button>
          </Flex>
          }
        </Flex>
      </Paper>
      }


      {/* <Paper>
        <Title mb={'10px'} sx={styles.teamMembersHeading}>Team Members</Title>
        <Paper >
          {projectInfo.projectHighAccessMembers.map((member, index) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.email}
                key={index}
                size={'small'}
              />
            )
          })}
          {projectInfo.projectMediumAccessMembers.map((member, index) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.email}
                key={index}
                size={'small'}
              />
            )
          })}
          {projectInfo.projectLowAccessMembers.map((member, index) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.email}
                key={index}
                size={'small'}
              />
            )
          })}
        </Paper>
      </Paper> */}



      {/* <div className={styles.overviewMainView}>
      <div className={styles.teamMembersArena}>
        <div className={styles.teamMembersHeading}>
          <h3>Team Members</h3>
        </div>
        <div className={styles.teamMembersList}>
          {console.log(projectInfo)}
          {projectInfo.projectHighAccessMembers.map((member, index) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.email}
                key={index}
              />
            )
          })}
          {projectInfo.projectMediumAccessMembers.map((member, index) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.email}
                key={index}
              />
            )
          })}
          {projectInfo.projectLowAccessMembers.map((member, index) => {
            return (
              <TeamMemberCard
                name={member.userName}
                email={member.email}
                key={index}
              />
            )
          })}
          <div className={styles.addMemberDiv} variant="primary" onClick={handleShow}>
            <img className={styles.addMemberImg} src="https://img.icons8.com/sf-regular/48/000000/add.png" />
            <p className={styles.para}>Add Member</p>
          </div>
      
        </div>
      </div>
      <div className={styles.projectSettings}>
        <div className={styles.projectSettingHeading}>
          <h3>Settings</h3>
        </div>
        <div className={styles.projectSettingList}>
          <div className={styles.settingCard}>
            <div className={styles.settingInfoDiv}>
              <div className={styles.projectSettingInfoHead}>
                <p>Delete the project</p>
              </div>
              <div className={styles.projectSettingInfoBody}>
                <p>Once you delete a project, there is no going back. Please be certain.</p>
              </div>
            </div>
            <div className={styles.settingBtnDiv}>
              <button className={styles.settingBtn} onClick={handleDeleteProject}>
                Delete this project
              </button>
            </div>
          </div>
          <div className={styles.settingCard}>
            <div className={styles.settingInfoDiv}>
              <div className={styles.projectSettingInfoHead}>
                <p>Transfer Ownership</p>
              </div>
              <div className={styles.projectSettingInfoBody}>
                <p>Transfer this project to another user or to an organization where you have the ability to create projects.</p>
              </div>
            </div>
            <div className={styles.settingBtnDiv}>
              <button className={styles.settingBtn} onClick={handleTransfer}>
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className={styles.modalStyle}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Team Member</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Select
            placeholder="Search for a team member"
            formatOptionLabel={formatOptionLabel}
            options={options}
            isSearchable={false}
            onChange={handleMemberChange}
            styles={{
              option: (provided, state) => ({
                ...provided,
                // border: '1px solid #ccc',
      
                backgroundColor: state.isSelected ? 'gray' : 'white',
                backgroundColor: state.isFocused ? 'lightgray' : 'white',
                backgroundColor: state.isClicked ? 'lightgray' : 'white',
                ':active': {
                  backgroundColor: state.isSelected ? 'lightgray' : 'white',
                  // border: '1px solid #ccc'
                },
                padding: 10
              }),
              control: (provided, state) => ({
                ...provided,
                border: '1px solid #ccc',
                borderRadius: 0,
                width: '400px',
                boxShadow: 'none',
                ':hover': {
                  border: '1px solid #ccc'
                }
              }),
              container: (provided, state) => ({
                ...provided,
                display: 'inline-flex',
                flexDirection: 'row',
                marginRight: 20
              })
      
            }}
          />
          <Select
            placeholder="Select a role"
            // formatOptionLabel={formatOptionLabel}
            options={options2}
            isSearchable={false}
            onChange={handleRoleChange}
            styles={{
              option: (provided, state) => ({
                ...provided,
                // border: '1px solid #ccc',
      
                backgroundColor: state.isSelected ? 'gray' : 'white',
                backgroundColor: state.isFocused ? 'lightgray' : 'white',
                backgroundColor: state.isClicked ? 'lightgray' : 'white',
                ':active': {
                  backgroundColor: state.isSelected ? 'lightgray' : 'white',
                  // border: '1px solid #ccc'
                },
                padding: 10
              }),
              control: (provided, state) => ({
                ...provided,
                border: '1px solid #ccc',
                borderRadius: 0,
                width: '400px',
                boxShadow: 'none',
                ':hover': {
                  border: '1px solid #ccc'
                }
              }),
              container: (provided, state) => ({
                ...provided,
                display: 'inline-flex',
                flexDirection: 'row',
                width: '150px'
              })
            }}
      
      
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addTeamMember}>Add</Button>
        </Modal.Footer>
      </Modal>
      </div> */}
    </div >

  );
};

export default OverView;


