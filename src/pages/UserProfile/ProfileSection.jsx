import React from "react";
import { useState } from "react";
import { CardImg, Card, Container, Button, Form, Row, Col } from "react-bootstrap";
import { Image, FileInput, Box } from '@mantine/core';
import { ButtonProgress } from "./ButtonProgress";


import bcrypt from "bcryptjs";   // For hashing the password before saving it to the json server

import styles from "./ProfileSection.module.css";

const salt = bcrypt.genSaltSync(10);

const ProfileSection = ({ user, setUser }) => {
    const [userName, setUserName] = useState(user.userName);
    const [emailId, setemailId] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [file, setFile] = useState("null");
    const [avatar, setAvatar] = useState(user.avatar);
    console.log(user, 'from profile section');

    const [isEdit, setIsEdit] = useState(false);

    // Refrence for file input
    const fileInputRef = React.useRef(null);

    const handleClick = async () => {
        // console.log(isEdit);
        // console.log('In handle click');
        let hashedPassword = password;
        if (isEdit) {
            if (password !== user.password) {
                hashedPassword = bcrypt.hashSync(password, salt);
            }
            const updatedUser = { userName, email: emailId, password: hashedPassword };
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/updateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(updatedUser),
            })
            // console.log(res);
            const data = await res.json();
            // console.log(data);
            if (!data.success) {
                console.log(data.error);
                alert(data.message);
            }
            else {
                setUserName(data.user.userName);
                setemailId(data.user.email);
                setPassword(data.user.password);
                setUser(data.user);
                setIsEdit(false);
            }
        }
        // setIsEdit(!isEdit);
    }

    const handleFileSubmit = async (e) => {
        try {
            // console.log(file, 'from handle file submit');
            e.preventDefault();
            const formData = new FormData();
            formData.append("avatar", file);
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/uploadAvatar", {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                body: formData,
            });
            const data = await res.json();
            if (!data.success) {
                console.log(data.error);
                alert(data.message);
            }
            else {
                // alert(data.message);
                setUser(data.user);
                fileInputRef.current.value = null;
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleFileChange = (e) => {
        // avoid null error of file
        if (!e.target.files[0]) {
            return;
        }
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        // File reader to display the image
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
            }
        }
    }

    return (
        <div className="mt-0" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Container className="profile-container py-3 my-0"  >
                <Card className="profile-card" >
                    <Card.Body className="d-flex align-items-center justify-content-between">
                        <p className="fs-2 profile-heading fw-semibold align-items-center" style={{ color: "#05386B" }}>Profile</p>
                        <div>
                            <Button variant="info" className="edit-button" onClick={!isEdit ? () => setIsEdit(!isEdit) : handleClick}>{isEdit ? <i className="fa-solid fa-floppy-disk"></i> : <i className="fa-solid fa-pen"></i>}</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <Container className="profile-container mt-3">
                <Row>
                    <Col md={4} sm={12} className="mb-3">
                        <Card className={styles.profileCard + ` shadow`}>
                            <Image mx="auto" radius="md" height={222} src="https://i.imgur.com/K7A78We.jpg" alt="Profile back" />
                            <Card.Body className="text-center">
                                {/* Hover effect on hover avatar */}
                                <CardImg src={avatar}
                                    className="rounded-circle fluid bg-white"
                                    // Scale avatar on hover with ease
                                    onMouseEnter={(e) => { e.target.style.transform = "scale(1.2)"; e.target.style.transition = "all 0.5s ease" }}
                                    onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.transition = "all 0.5s ease" }}
                                    style={{ width: '160px', marginTop: '-90px', zIndex: '5', position: 'relative', border: '5px solid #fff' }}
                                />

                                <h1 className="profile-heading fw-semibold mt-3" style={{ color: "#05386B" }}>{userName}</h1>
                                <p className="profile-para fw-bold text-secondary">{emailId}</p>
                                <div className="d-flex justify-content-evenly">
                                    <Button variant="light" className="btn-floating"><i className="fab fa-facebook-f fa-2x" style={{ color: "#3b5998" }}></i></Button>
                                    <Button variant="light" className="btn-floating"><i className="fab fa-twitter fa-2x" style={{ color: "#55acee" }}></i></Button>
                                    <Button variant="light" className="btn-floating"><i className="fab fa-instagram fa-2x" style={{ color: "#ac2bac" }}></i></Button>
                                    <Button variant="light" className="btn-floating"><i className="fab fa-linkedin-in fa-2x" style={{ color: "#0082ca" }}></i></Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8} sm={12}>
                        <Card className={`shadow ` + styles.profileCard}>
                            <Card.Body className="profile-card-body">
                                <Row className="mb-3">
                                    <Form.Label column className="fw-semibold" xl={2} sm={12}>
                                        Username
                                    </Form.Label>
                                    <Col className="text-center" lg={10} sm={12}>
                                        {isEdit &&
                                            <Form.Control type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} disabled={!isEdit} />
                                        }
                                        {!isEdit &&
                                            <div className=" fw-bold border-bottom border-dark border-opacity-50 fs-5" style={{ color: "#05386B" }}>{userName}</div>
                                        }
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Label column className="fw-semibold" xl={2} sm={12}>
                                        Email
                                    </Form.Label>
                                    <Col className="text-center" lg={10} sm={12}>
                                        {isEdit &&
                                            <Form.Control type="email" placeholder="Email" value={emailId} onChange={(e) => setemailId(e.target.value)} disabled={!isEdit} />
                                        }
                                        {!isEdit &&
                                            <div className="fw-bold border-bottom border-dark border-opacity-50 fs-5" style={{ color: "#05386B" }}>{emailId}</div>
                                        }
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Label column className="fw-semibold" xl={2} sm={12} >
                                        Password
                                    </Form.Label>
                                    <Col className="text-center" lg={10} sm={12}>
                                        {isEdit &&
                                            <Form.Control type="password" placeholder="Password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} disabled={!isEdit} />
                                        }
                                        {!isEdit &&
                                            <div className="fw-bold border-bottom border-dark border-opacity-50 fs-4" style={{ color: "#05386B" }}>....................</div>
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Row className=" mt-3 mb-3">
                            <Col md={6} lg={4} sm={12}>
                                <div className={styles.countContainer}>
                                    <div className={styles.containerHead}>
                                        <div className={styles.headIcon}><img src="https://img.icons8.com/ios-glyphs/30/000000/to-do.png" /></div>

                                        <div className={styles.headText}>Projects</div>
                                    </div>
                                    <div className={styles.containerBody}>
                                        <p className={styles.para}>
                                            {user.projectIdList ? user.projectIdList.length : "0"}
                                        </p>
                                    </div>
                                    <div className={styles.containerFoot}>
                                        <p className={styles.para}>
                                            TOTAL PROJECTS
                                        </p>
                                    </div>
                                </div>

                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <div className={styles.countContainer}>
                                    <div className={styles.containerHead}>
                                        <div className={styles.headIcon}><i className="fa-solid fa-star"></i></div>

                                        <div className={styles.headText}>Favourites</div>
                                    </div>
                                    <div className={styles.containerBody}>
                                        <p className={styles.para}>
                                            {user.favProjectIdList ? user.favProjectIdList.length : "0"}
                                        </p>
                                    </div>
                                    <div className={styles.containerFoot}>
                                        <p className={styles.para}>
                                            TOTAL FAVOURITES
                                        </p>
                                    </div>
                                </div>

                            </Col>
                            <Col md={6} lg={4} sm={12}>
                                <div className={styles.countContainer}>
                                    <div className={styles.containerHead}>
                                        <div className={styles.headIcon}><i className="fa-solid fa-bars-progress"></i></div>

                                        <div className={styles.headText}>Tasks</div>
                                    </div>
                                    <div className={styles.containerBody}>
                                        <p className={styles.para}>
                                            {user.taskAssignedIDList ? user.taskAssignedIDList.length : "0"}
                                        </p>
                                    </div>
                                    <div className={styles.containerFoot}>
                                        <p className={styles.para}>
                                            TOTAL TASKS
                                        </p>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                        <Card className={`shadow ` + styles.profileCard}>
                            <Card.Body className="update-avatar-body d-flex justify-content-between align-items-end">
                                {/* react bootstrap form for file input*/}
                                <Form className="d-flex justify-content-between w-100 align-items-end">
                                    <Form.Group className=" w-100" controlId="formFile">
                                        <Form.Label className="fw-semibold">Update Avatar</Form.Label>
                                        <Form.Control type="file" accept="image/png, image/jpeg, image/jpg" ref={fileInputRef} onChange={(e) => handleFileChange(e)} />
                                    </Form.Group>
                                    <Button className="btn-md ms-2" variant="primary" type="submit" onClick={(e) => handleFileSubmit(e)} disabled={!fileInputRef.current?.files.length}
                                    >Update</Button>
                                    {/* <Box w={250}>
                                        <ButtonProgress onClick={(e)=>handleFileSubmit(e)} />
                                    </Box> */}
                                </Form>

                                {/* <FileInput
                                placeholder="JPG, PNG or JPEG. Max size of 800K"
                                icon={<i className="fa-solid fa-paperclip" style={{color: "#05386B"}}></i>}
                                label="Choose Avatar"
                                variant="unstyled"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={(e)=>handleFileChange(e)}
                                /> */}

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default ProfileSection;

