import React from "react";
import OuterNavBar from "./Navbar";
import styles from './Contact.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HeaderMegaMenu from "../HomePage/HeaderMegaMenu";
import { ContactComponent } from "./ContactComponent";
import { Center, Container } from "@mantine/core";


const Contact = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [inputs, setInputs] = React.useState({ name: '', email: '', message: '' });
    // const[modal, setModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
    }

    const sendMessage = (e) => {
        if (e) e.preventDefault();
        const message = inputs.message;
        // const messageEnter = message.replace(/\r\n|\r|\n/g, "%0D%0A").replace(' ', "%20");
        const res = fetch("http://localhost:8000/contactList/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputs.name,
                email: inputs.email,
                message: inputs.message
            })
        });
        console.log(res);
        // if(res){
        //     setModal(true);
        // }
        setInputs({ name: '', email: '', message: '' });

        // const request = "mailto:YOUREMAIL?subject=Email%20from%20"
        //     + inputs.name + "/"
        //     + inputs.email + "&body="
        //     + messageEnter;
        // document.location = request;

        // console.log(request, message);
    }
    return (
        <>
            {/* <OuterNavBar /> */}
            <HeaderMegaMenu />
            <Container pt={100}>
                <ContactComponent />
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thank You!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        We have received your message and will get back to you soon.
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default Contact;
