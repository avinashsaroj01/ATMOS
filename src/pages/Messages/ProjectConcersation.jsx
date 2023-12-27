import React, { useEffect, useState } from 'react'
import { Badge } from '@mantine/core';
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
  } from '@mantine/core';
import { Group, Avatar, Accordion } from '@mantine/core';
const Conversation = ({chat, currentUserId}) => {
    const [projectData, setProjectData] = useState(null)
    useEffect(()=>{
        if(chat){
          const projectId = chat.projectId;
        const getProjectData = async()=>{
            try{
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/getProjectDetails/${projectId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();
                setProjectData(data.project);
                // console.log("this is",data)
            } catch(error){
                console.log(error)
            }
        }
        getProjectData()
      }
    },[])

  return (
    <div>     
        <Accordion.Item value="customization">
          <Accordion.Control>
              <div>
                {projectData && <Text>{projectData.projectName}</Text>}
              </div>
            <Badge color='green'>{projectData && projectData.projectType}</Badge>
          </Accordion.Control>
        </Accordion.Item>           
    </div>
  )
}

export default Conversation
