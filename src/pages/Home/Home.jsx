import React, { useState } from "react"
import Greeting from "./Greeting"
import RecentProject from "./RecentProject"
import Priority from "./Priority"
import { useEffect } from "react";
import Navbar_v2 from "../../UI/Navbar_v2";
import { Center, Container, Flex } from "@mantine/core";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/getUserInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      // console.log(data, 'data from home');
      if (data.success) {
        // console.log(data.user, 'from home');
        setUser(data.user);
      }
    };
    getUser();
  }, []);


  return (
    <>
      {user && <Navbar_v2 activeLink={'/home'} user={user} />}
      <Container fluid={true} bg={'#f8f9fa'} h={'93vh'}>
        <Center>
          {user && <Greeting user={user} />}
        </Center>
        <Center>
          <Flex p={10} gap={120}>
            {user && <RecentProject user={user} />}
            {user && <Priority user={user} />}
          </Flex>
        </Center>
      </Container>

    </>
  );
};

export default Home;
