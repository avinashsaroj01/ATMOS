import React, { useEffect } from "react";
import { useState } from "react";
import Navbar_v2 from "../../UI/Navbar_v2";
import ProfileSection from "./ProfileSection";
// import ProfileSection2 from "../Profile/ProfileSection";


const UserProfile = () => {
  // const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  // const [user, setUser] = useState(null);

  const [user, setUser] = useState(null);
  // const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    async function getUser() {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/getUserInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }

    }
    getUser();
  }, []);
  console.log(user, 'from user profile');


  return (
    <>
      {user && <Navbar_v2 user={user} />}
      {user && (
        <ProfileSection user={user} setUser={setUser} />
      )}
    </>

  );
}

export default UserProfile;