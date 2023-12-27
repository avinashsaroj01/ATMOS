import { Container, Group, Menu, Paper, Textarea, Title } from "@mantine/core";
import React from "react";
import styles from "./DescriptionComponent.module.css";
import { IconDots } from "@tabler/icons-react";
const DescriptionComponent = ({ heading, description }) => {
    return (
        // <div className={styles.descriptionComponent}>
        <Paper className={styles.descriptionComponent}>
            {/* <div className={styles.dropdown}>
                <p className={styles.dropdownDots}>...</p>
                <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownOption}>Remove</div>
                </div>
            </div> */}

            <Container fluid={true}>
                <Group position="apart">
                    {/* <label className={styles.projectDescriptionLabel}>{heading}</label> */}
                    <Title order={4}>{heading}</Title>
                    <Menu trigger="hover" openDelay={300} closeDelay={100}>
                        <Menu.Target>
                            <IconDots size={20} />
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>Edit</Menu.Item>
                            <Menu.Item>Remove</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>


            </Container>
            <Container fluid={true}>
                <Textarea
                    className={styles.projectDescriptionTextArea}
                    value={description}
                    readOnly
                ></Textarea>
            </Container>


            {/* <label className={styles.projectDescriptionLabel}>{heading}</label> */}
            {/* <textarea className={styles.projectDescriptionTextArea} value={description} readOnly></textarea> */}
        </Paper>
        // </div>
    );
}

export default DescriptionComponent;