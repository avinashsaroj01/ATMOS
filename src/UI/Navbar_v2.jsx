import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    Title,
    Header,
    Anchor
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ProfileMenu from './ProfileMenu';


const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.xl,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      display: "block",
      lineHeight: 1,
      padding: "8px 12px",
      borderRadius: theme.radius.sm,
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

// const tabs = ["Home", "Projects", "Message", "Notes"];

const links = [
  {
    link: "/home",
    label: "Home",
  },
  {
    link: "/projects",
    label: "Projects",
  },
  {
    link: "/message",
    label: "Message",
  },
  {
    link: "/notes",
    label: "Notes",
  },
];

const Navbar_v2 = ({ activeLink, user }) => {
  const { classes, theme } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(activeLink);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  // console.log("Navbar_v2: user: ", user);

  // const user = useSelector((state) => state.user.userInfo);

    const items = links.map((link, index) => (
        <div className={active === link.link ? classes.linkActive : classes.link} onClick={(event) => {
            event.preventDefault();
            setActive(link.link);
            close();
        }}

            key={index}
        >
            <Link to={link.link} key={link.label} >
                {link.label}
            </Link>
        </div>

    ));

    return (
        <Header height={56} className={`${classes.header}`} bg={'#f8f9fa'} >
            <div className={classes.inner}>

                <Title>
                    <Anchor href='/home'>
                        ATMOS
                    </Anchor>
                </Title>

        <Group>
          {items}
          <ProfileMenu userInfo={user} />
        </Group>
      </div>
    </Header>
  );
};

export default Navbar_v2;
