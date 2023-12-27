import io from "socket.io-client";
import React, { useState, useEffect, useRef } from "react"
import ChatSidebar from "./ChatSidebar"
import Navbar_v2 from "../../UI/Navbar_v2";
import { Container, Flex } from '@mantine/core';
import { IconPhoto, IconMessageCircle } from '@tabler/icons-react';
import {
  Navbar,
  useMantineTheme,
} from '@mantine/core';
import { Accordion } from '@mantine/core';
import { Badge } from '@mantine/core';
import { Tabs } from '@mantine/core';
import Conversation from "./Conversation";
import ProjectConversation from "./ProjectConcersation"
import ChatBox from "./ChatBox";

const Chats = () => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [projectChats, setProjectChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef()
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allIds, setAllIds] = useState([]);
  const [existingIds, setExistingIds] = useState(null);
  

  useEffect(() => {
    async function getUser() {
      try{
        const res = await fetch("http://localhost:4000/user/getUserInfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const data = await res.json();
        // console.log("data", data)
        if (data.success) {
          setUser(data.user);
        }
      } catch(e){
        console.log(e)
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getChats() {
      try{
        user && console.log("i sm", user)
        const res = await fetch(`http://localhost:4000/chat/${user._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const data = await res.json();
        setChats(data);
        // console.log("Chats",data)
      } catch(e){
        console.log(e);
      }
    }
    getChats();
  }, [user]);


    const getAllUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/user/getUserList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        // console.log(data.userList)
        setAllUsers(data.userList);
        chats.forEach((ch)=>{
          const newUserChats = data.userList.filter(d => !ch.members.includes(d._id));
            setExistingIds([...newUserChats])
        })
        existingIds && existingIds.map(async(ids)=>{
          const chat = {
            senderId: user._id,
            receiverId: ids._id,
          }
          // console.log("ch",chat)
          const res = await fetch("http://localhost:4000/chat/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(chat)
          });
          
          const data = await res.json();
          // console.log(data)
        })
        
      } catch (e) {
        console.log(e);
      }
    }
    useEffect(() => {
    const getAllProjects = async () => {
      try {
        const res = await fetch("http://localhost:4000/project//getUserProjects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        // console.log(data.projects)
        setAllProjects(data.projects);
        allProjects && allProjects.map(async(project)=>{
            const chat = {
            projectId: project._id,
          }
          const res = await fetch("http://localhost:4000/chat/project/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(chat)
          });
          const data = await res.json();
          // console.log("dataP",data)
        })
      } catch (e) {
        console.log(e);
      }
    }
    getAllProjects();
  },[user]);

  useEffect(() => {
      async function getProjectChats() {
        try{
          allProjects && allProjects.map(async(project)=>{
            const res = await fetch(`http://localhost:4000/chat/project/${project._id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const data = await res.json();
            console.log("data here",data)

            setProjectChats([...projectChats, data[0]])
          })
        } catch(e){
          console.log(e);
        }
      }
      getProjectChats();
    }, [allProjects]);
  








    useEffect(() => {
      socket.current = io('http://localhost:8800');
      user && socket.current.emit("new-user-add", user._id)
      socket.current.on('get-users', (users) => {
        setOnlineUsers(users);
      })
    }, [user])
  
    // send message to socket
    useEffect(() => {
      if (sendMessage !== null) {
        socket.current.emit('send-message', sendMessage)
      }
    }, [sendMessage])
  
    // receive message from socket 
    useEffect(() => {
      socket.current.on('recieve-message', (data) => {
        console.log("data Received here")
        setReceiveMessage(data)
      })
    }, [])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id)
    const online = onlineUsers.find((user) => user.userId === chatMember)
    return online ? true : false
  }

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <>
    {user && 
      <Container fluid={true} p={0} m={0} h={'100vh'}>
        {user && <Navbar_v2 activeLink={'/message'} user={user} />}
        {
          <Flex m={0} p={0} justify={'space-between'}>
            <Flex width={'20%'} wrap="wrap">
              <Navbar p={0} m={0} hidden={!opened} grow>
                <Tabs defaultValue="gallery" m={0} p={0}>
                  <Tabs.List>
                    <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem"/>}> Projects</Tabs.Tab>
                    <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" onClick={()=>{
                       getAllUsers();
                    }}/>}>Direct Messages</Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value="gallery">
                    <Accordion defaultValue="customization"
                      chevron >
                        {console.log("cx",projectChats)}
                      {user && projectChats!=[] && projectChats.map((chat, index) => {
                        console.log("before print ", chat)
                        return (
                          <div key={index} onClick={() => {
                            setCurrentChat(chat)
                            
                          }}>
                            <ProjectConversation chat={chat} currentUserId={user._id}/>
                          </div>
                        )
                      })}
                    </Accordion>
                  </Tabs.Panel>

                  <Tabs.Panel value="messages" style={{overflow:"scroll" , height:"80vh" , scrollbarWidth:"0"}}>
                    <Accordion defaultValue="customization" chevron>
                      {user && chats && chats.map((chat) => {
                        return (
                          <div onClick={() => {
                            setCurrentChat(chat)
                            
                          }}>
                            <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                          </div>
                        )
                      })}
                    </Accordion>
                  </Tabs.Panel>
                </Tabs>
              </Navbar>
            </Flex>
            <Flex direction={'column'} justify={'flex-end'} w={'60%'} >
              {user && currentChat && <ChatBox chat={currentChat} currentUserId={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />}
            </Flex>
            <Flex w={'20%'} direction={'column'}>

              {/* <MediaQuery smallerThan="sm" styles={{ display: 'none' }}> */}
              {/* <Aside hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}> */}
              {user && currentChat && <ChatSidebar chat = {currentChat} currentUserId = {user._id} />}

              {/* </Aside> */}
              {/* </MediaQuery> */}
            </Flex>
          </Flex>

        }
      </Container>
}
    </>
  );
};

export default Chats;