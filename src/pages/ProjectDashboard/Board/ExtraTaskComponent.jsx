import { Tabs } from "@mantine/core";
import { IconMessageCircle, IconSettings, IconTextCaption } from "@tabler/icons-react";
import TaskModalDescription from "./TaskModalDescription"
import TaskModalDiscussion from "./TaskModalDiscussion"

const ExtraTaskComponent = ({ taskDescription, setTaskDescription, taskDiscussionId }) => {
    return (
        <>
            <Tabs defaultValue="description" h={'100%'}>
                <Tabs.List>
                    <Tabs.Tab value="description" icon={<IconTextCaption size="0.8rem" />}>Description</Tabs.Tab>
                    <Tabs.Tab value="discussion" icon={<IconMessageCircle size="0.8rem" />}>Discussion</Tabs.Tab>
                    {/* <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>Settings</Tabs.Tab> */}
                </Tabs.List>

                <Tabs.Panel value="description" pt="xs" h={'94%'} p={20}>
                    <TaskModalDescription
                        taskDescription={taskDescription}
                        setTaskDescription={setTaskDescription}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="discussion" pt="xs" h={'94%'} p={20}>
                    <TaskModalDiscussion
                        taskDiscussionId={taskDiscussionId}
                    />
                </Tabs.Panel>

                {/* <Tabs.Panel value="settings" pt="xs">
                    Settings tab content
                </Tabs.Panel> */}
            </Tabs>
        </>
    );
}
export default ExtraTaskComponent;