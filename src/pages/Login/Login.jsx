import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Container, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

import styles from './Login.module.css';
import bcrypt from "bcryptjs";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const handleLogin = async (user) => {
    //     const res = fetch(process.env.REACT_APP_BACKEND_URL + '/userList/' + user.id, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ ...user, date: new Date().toTimeString().slice(0, 5) })
    //     })
    //     console.log(res);
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(email, password);
    //     fetch('http://localhost:8000/userList?emailId=' + email, {
    //         method: 'GET'
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.length === 0) {
    //                 alert("User does not exist!");
    //             }
    //             else {
    //                 console.log(data);
    //                 if (bcrypt.compareSync(password, data[0].password)) {
    //                     handleLogin(data[0]);
    //                     dispatch(login(data[0]));
    //                     navigate('/home');
    //                 }
    //                 else {
    //                     alert("Incorrect password!");
    //                 }
    //             }
    //         })

    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log(data);
        if (!data.success) {
            alert(data.message);
        }
        else {
            // dispatch(login(data));
            localStorage.setItem('token', data.token);
            navigate('/home');
        }
    }



    return (
        <Container className={styles.container}>
            <Row className={styles.row}>
                <Col xs={12} md={5} lg={6} className="d-flex flex-column justify-content-center align-items-center">
                    <h1 className="my-3 ms-1 text-xs-center text-md-right display-3 fw-bold ls-tight px-3">
                        The best offer <br />
                        <span className="" style={{ color: "#37517e" }}>to grow your<br /> business</span>
                    </h1>
                    <p className="my-3 mx-5 text-md-right fs-5 px-5 text-secondary">
                        Collaborate better with <span className="fw-bold" style={{ color: "#37517e" }}>ATMOS</span>, the best platform to manage your business.
                        Manage resources, simplify workflows, and plan with confidence no matter your industry.
                        Track your progress and get the most out of your business.
                        So, what are you waiting for? Sign up now!
                    </p>
                </Col>
                <Col xs={12} md={7} lg={6} className="d-flex flex-column justify-content-center align-items-center">
                    <Card className="shadow w-75 h-100 p-5 ">
                        <h2 className="text-center fw-bold">Login</h2>
                        <Form className="mt-4" onSubmit={handleSubmit}>
                            <div className="mt-4 d-flex flex-row align-items-center">
                                <i className="fa-solid fs-4 me-2 fa-envelope"></i>
                                <FloatingLabel controlId="floatingInput" label="Email" className="w-100">
                                    <Form.Control type="email" className="fs-5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </FloatingLabel>
                            </div>
                            <div className="mt-4 d-flex flex-row align-items-center">
                                <i className="fa-solid fs-4 me-2 fa-lock"></i>
                                <FloatingLabel controlId="floatingPassword" className="w-100" label="Password">
                                    <Form.Control type="password" placeholder="Password" className="fs-5" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="mt-4 d-flex flex-column align-items-center">
                                {/* <Button className="w-100 btn-lg" variant={styles.atmos} type="submit">
                                    Login
                                </Button> */}
                                <button className={styles.button24} type="submit">Login</button>
                            </div>
                            <p className="mt-2 text-secondary text-end">
                                Don't have an account? <Link to="/signup" className={styles.atmosColor + ` text-decoration-none`}>Register here</Link>
                            </p>
                            <div className="d-flex justify-content-center">
                                <Link to="#" className="small text-secondary text-decoration-none me-5">Terms of use</Link>
                                <Link to="#" className="small text-secondary text-decoration-none">Privacy policy</Link>
                            </div>
                            <div className="mt-4 mb-0">
                                <p className="m-0 text-center text-secondary">
                                    © 2022 ATMOS. All rights reserved.
                                </p>
                            </div>
                        </Form>
                    </Card>
                </Col>

            </Row>

        </Container>
    );
}

export default Login;