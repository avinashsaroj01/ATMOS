import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button, Flex, Group, Paper } from '@mantine/core';
import {useState,useEffect} from "react"

const content = ""

const ChatWriter = ({socket,user ,projectid }) => {
    // const [message, setMessage] = useState(null);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content,
    });
    
    // console.log(socket,user ,projectid)
    const saveMessage = async () => {
        // console.log(editor.getHTML());
        const message = editor.getHTML()
        if(message !== ""){
            const messageData = {
                projectid: projectid,
                senderid: user._id,
                message: editor.getText(),
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            console.log(messageData)
            await socket.emit("send_message", messageData);
        }

    }

    return (
        <>
            <RichTextEditor editor={editor}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    
                }}>
                <RichTextEditor.Content
                    sx={{
                        width: '100%',
                        height: '100px',
                        maxHeight: '100px',
                        overflowY: 'scroll',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                    // onChange={(event)=>{
                    //     setMessage(event.target.value)
                    // }}


                />
                <RichTextEditor.Toolbar style={{ 'display': 'flex', justifyContent: 'space-between' }} >
                    <Flex gap={8}>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Underline />
                            <RichTextEditor.Strikethrough />
                            <RichTextEditor.ClearFormatting />
                            <RichTextEditor.Highlight />
                            <RichTextEditor.Code />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Blockquote />
                            <RichTextEditor.Hr />
                            <RichTextEditor.BulletList />
                            <RichTextEditor.OrderedList />
                            <RichTextEditor.Subscript />
                            <RichTextEditor.Superscript />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Link />
                            <RichTextEditor.Unlink />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.AlignLeft />
                            <RichTextEditor.AlignCenter />
                            <RichTextEditor.AlignJustify />
                            <RichTextEditor.AlignRight />
                        </RichTextEditor.ControlsGroup>
                    </Flex>

                    <RichTextEditor.ControlsGroup>
                        <Button onClick={()=>{saveMessage()}}>Send</Button>
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
            </RichTextEditor>
        </>
    );
}

export default ChatWriter;