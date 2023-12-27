import React, { useState, useEffect } from "react"
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

const GetProjectMessages = ({socket, user ,projectid })=>{
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    socket.on("receive_message", (data) =>{
      console.log(data)
      setMessages(data)
    })
  }, [socket]);
  return (
    <>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{messages && messages.senderid}</Text>
      </Group>
      <Text size="sm" color="dimmed">
        {messages && messages.message}
      </Text>
      <Text size="sm" color="dimmed">
        {messages && messages.time}
      </Text>
    </Card>
    </>
  )
}
export default GetProjectMessages;