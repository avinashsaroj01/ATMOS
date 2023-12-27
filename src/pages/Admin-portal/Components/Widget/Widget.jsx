import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";

const Widget = ({ type, len }) => {
  let data;

  //temporary
//   const amount = 100;
//   const diff = 20;

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        url: "/admin-portal/users",
        diff: 40,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "projects":
      data = {
        title: "PROJECTS",
        isMoney: false,
        link: "View all projects",
        url: "/admin-portal/projects",
        diff: 50,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "sections":
      data = {
        title: "SECTIONS",
        isMoney: true,
        link: "View all sections",
        url: "/admin-portal/sections",
        diff: 60,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "tasks":
      data = {
        title: "TASKS",
        isMoney: true,
        link: "See all tasks",
        url: "/admin-portal/tasks",
        diff: 90,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <>
    {data && <div className="widget">
      <div className="leftwidget">
        <span className="title">{data.title}</span>
        <span className="counter">
           {len}
        </span>
        <span className="link">
            <Link to={data.url}>{data.link}</Link>
        </span>
      </div>
      <div className="rightwidget">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.diff} %
        </div>
        {data.icon}
      </div>
    </div>}
    </>
  );
};

export default Widget;
