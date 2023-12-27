import SectionArena from "./Board/SectionArena";
import { useState, useEffect } from "react";
import OverView from "./Overview/OverView";
import Timeline from "./Timeline/Timeline";
import { useParams, useNavigate } from "react-router-dom";
import ProjectInfoBar_v2 from "./ProjectInfoBar/ProjectInfoBar_v2";
import Charts_v2 from "./Charts/Charts_v2";
import SectionArena_v2 from "./DnD/SectionArena";
import SectionArena_v3 from "./DnD/SectionArena copy";

const ProjectMainView = ({ Overview, Board, Charts, Timeline }) => {


  const { id: projectId } = useParams();
  const navigate = useNavigate();

  //states
  const [projectInfo, setProjectInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [userAccessLevel, setUserAccessLevel] = useState(null);
  //set active tab to whichever is true [Overview, Board, Charts, Timeline]
  const [activeTab, setActiveTab] = useState('Overview');



  //useEffect Functions
  useEffect(() => {
    if (Overview) setActiveTab('Overview');
    if (Board) setActiveTab('Board');
    if (Charts) setActiveTab('Charts');
    if (Timeline) setActiveTab('Timeline');
  }, [Overview, Board, Charts, Timeline]);

  useEffect(() => {
    const user = async () => {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/getUserInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      // console.log(data, 'userInfo from main view');
      setUser(data.user);
      return data;
    }
    user();
  }, [projectId]);


  useEffect(() => {
    const project = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/getProjectDetails/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      // console.log(data, 'projectInfo from main view');
      setProjectInfo(data.project);
      return data;
    }
    project();
  }, [projectId]);


  return (
    <>
      <div className="normal-div">
        {
          user && projectInfo && (
            <ProjectInfoBar_v2
              projectInfo={projectInfo}
              setProjectInfo={setProjectInfo}
              userInfo={user}
              setUserInfo={setUser}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            ></ProjectInfoBar_v2>
          )
        }
        {activeTab === 'Overview' && projectInfo && (
          <OverView
            projectId={projectId}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            userInfo={user}
          ></OverView>
        )}
        {activeTab === 'Board' && projectInfo && (
          <SectionArena
            projectId={projectId}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            userInfo={user}
            setUserInfo={setUser}
          ></SectionArena>
        )}
        {/* {user && activeTab === 'Timeline' && projectInfo && (
          <Charts
            projectId={projectId}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            userInfoOfUser={user}
          ></Charts>
        )} */}
        {user && activeTab === 'Timeline' && projectInfo && (
          // <SectionArena_v2
          //   projectId={projectId}
          // />
          // <SectionArena_v3
          //   projectId={projectId}
          // />
          <Charts_v2
            projectId={projectId}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            userInfo={user}
          ></Charts_v2>
        )}
        {user && activeTab === 'Charts' && projectInfo && (
          <Charts_v2
            projectId={projectId}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            userInfo={user}
          ></Charts_v2>
        )}
        {/* {user && activeTab === 'Timeline' && projectInfo && (
          <Timeline
            projectId={projectId}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            userInfoOfUser={user}
          ></Timeline>
        )} */}
      </div>
    </>
  );
};

export default ProjectMainView;
