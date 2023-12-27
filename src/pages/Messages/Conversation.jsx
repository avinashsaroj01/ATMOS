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
const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId)
    // userId && console.log(userId)
    const getUserData = async () => {
      try {

        // console.log("hhh")
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUserData(data.user);
        // console.log("this is", data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])

  return (
    <div>
      <Accordion.Item value="customization">
        <Accordion.Control>
          <Group noWrap>
            <Avatar src={userData ? userData.avatar : 'avatar.png'} radius="xl" size="lg" alt="it's me" />
            <div>
              {userData && <Text>{userData.userName}</Text>}
            </div>
          </Group><br />
          {online ? <Badge color='green'>Online</Badge> : <Badge color='red'>Offline</Badge>}
        </Accordion.Control>
      </Accordion.Item>
    </div>
  )
}

export default Conversation
