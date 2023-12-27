import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button, Flex, Group, Paper } from '@mantine/core';


const content = ""

const ChatEditor = ({ taskDiscussionId, setDiscussionThread }) => {
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


    const saveDiscussion = async () => {
        // console.log(editor.getHTML());
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/createDiscussionThread/${taskDiscussionId}`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                "discussion": editor.getHTML(),
            })
        });

        const data = await res.json();
        if (data.success) {
            // console.log(data);
            setDiscussionThread(data.discussion.discussionThread);
            editor.commands.setContent("");
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
                        height: '100px',
                        maxHeight: '100px',
                        overflowY: 'scroll',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}


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
                        <Button onClick={saveDiscussion}>Send</Button>
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
            </RichTextEditor>
        </>
    );
}

export default ChatEditor;