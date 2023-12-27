import Navbar_v2 from "../../UI/Navbar_v2";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Button, Link } from "react-floating-action-button";
import { lightColors, darkColors } from "react-floating-action-button";
import { useNavigate } from "react-router-dom";
import styles from "./Notes.module.css";
import { Modal } from "@mantine/core";
import NoteEditor from "./NoteEditor";
const Notes = () => {
  const [notes, setNotes] = useState();
  const navigate = useNavigate();
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [user, setUser] = useState(null);

  const colorCodes = [
    "#ff6b6b",
    "#f06595",
    "#cc5de8",
    "#845ef7",
    "#5c7cfa",
    "#4dabf7",
  ];

  useEffect(() => {
    // console.log('use effect from home');
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

  useEffect(() => {
    const noted = async () => {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/note/getNoteList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        console.log(data.message);
        setNotes(data.notes);
      } else {
        console.log(data.message);
      }
    };
    console.log("rlelllllllllllllllll");
    noted();
  }, [rerender]);

  const insidenote = (note) => {
    // navigate(`/noteeditor/${note._id}`);
    setSelectedNote(note._id);
    setEditorOpen(true);
    // navigate('/noteeditor', { noteId: note._id, des: note.NoteDescription })
  };

  const deleteNote = async (note) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/note/deleteNote/${note._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    if (data.success) {
      console.log(data.message);
      setNotes(data.note);
    } else {
      console.log(data.message);
    }
  };

  let randomColor = new Array()
  // for(let firstColor = 0; firstColor <= 1000; firstColor++) { 
  //   randomColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
  // }

  randomColor.push("#FF6666", "#FFB266", "#B2FF66", "#FFCCFF", "#33FF99", "#66B2FF", "#B266FF", "#FF3333", "#FF33FF","#FFFF00", "#33FFFF", "#FF9999", "#9999FF", "#6495ED", "#00FF80", "#80FF00")
  let colorChoice = 0;

  return (
    <>
      {user && <Navbar_v2 activeLink={"/notes"} user={user} />}

      {user && (
        <>
          <div>
            {notes &&
              notes.map((note) => (
              
                <div id="noteboxing" className={styles.wholenote}>
                  <div style={{ backgroundColor: randomColor[colorChoice++] }} className={styles.noteReal} key={note._id}>
                    <div
                      onClick={() => {
                        insidenote(note);
                      }}
                      className={styles.noteContainer}
                    >
                      <p className={styles.noteDescription}>
                        {note.NoteText.slice(0, 200)}
                      </p>
                    </div>

                    <div className={styles.notelower}>

                      <div className={styles.updateDate}>
                        <p className={styles.exactdate}>
                          {note.NoteUpdatedAt.toString().split("T")[0]}
                        </p>
                      </div>

                      <div className={styles.bin}>
                        <div
                          onClick={() => {
                            deleteNote(note);
                          }}
                          href="https://imgbb.com/"
                        >
                          <img
                            className={styles.binimg}
                            src="https://i.ibb.co/zmnNTkD/bin.png"
                            alt="bin"
                            border="0"
                          />
                        </div>
                      </div>

                      {/* <div className={styles.updateDate}>
                        <p className={styles.exactdate}>
                          {note.NoteUpdatedAt.toString().split("T")[0]}
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              
              ))}
          </div>

          <Container>
            <Button
              icon="fas fa-plus"
              tooltip="Create note"
              onClick={setEditorOpen}
              styles={{
                backgroundColor: darkColors.white,
                color: lightColors.black,
              }}
            />
            <Button
              icon="far fa-sticky-note"
              rotate={true}
              styles={{
                backgroundColor: darkColors.white,
                color: lightColors.black,
              }}
            />
          </Container>
          <Modal
            opened={editorOpen}
            onClose={() => {
              setEditorOpen(false);
              setSelectedNote(null);
            }}
            title="Note Editor"
            size={"lg"}
          >
            <NoteEditor
              selectedNote={selectedNote}
              setSelectedNote={setSelectedNote}
              setEditorOpen={setEditorOpen}
              rerender={rerender}
              setRerender={setRerender}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Notes;
