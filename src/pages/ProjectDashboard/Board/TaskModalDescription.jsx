import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button, Flex } from '@mantine/core';
import { useHover, useClickOutside } from '@mantine/hooks';
import { useState } from 'react';


// const content =
//     '<h2 style="text-align: center;">Task Description</h2>';


const TaskModalDescription = ({
    taskDescription,
    setTaskDescription,
}) => {

    // const [value, setValue] = useState(taskDescription);

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
        content: taskDescription ? taskDescription : '<p>Write a description for the task</p>',
        onUpdate: ({ editor }) => {
            setTaskDescription(editor.getHTML());
            // setValue(editor.getHTML());
        },
    });

    // console.log(value);

    // console.log(taskDescription);

    const [clicked, setClicked] = useState(false);
    const ref = useClickOutside(() => setClicked(false));

    return (
        <>
            <RichTextEditor editor={editor} sx={{ maxHeight: '50', height: 'fit-content' }} onClick={setClicked} ref={ref}>
                {clicked && (
                    <RichTextEditor.Toolbar sticky stickyOffset={60}>
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
                    </RichTextEditor.Toolbar>
                )}

                <RichTextEditor.Content onChange={setTaskDescription} />
            </RichTextEditor>
            {/* <Flex justify={'end'} mt={5}>
                <Button>Update</Button>
            </Flex> */}

        </>
    );
}


export default TaskModalDescription;