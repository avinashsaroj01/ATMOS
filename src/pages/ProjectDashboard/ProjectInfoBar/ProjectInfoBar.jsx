import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Route, Router, Routes } from "react-router-dom";
import SectionArena from "./SectionArena";
import { useState } from "react";
import {
  addProjectToFavourite,
  removeProjectFromFavourite,
} from "../../../features/userSlice";
import { useDispatch } from "react-redux";

const ProjectInfo = ({
  isProfileClicked,
  setIsProfileClicked,
  projectInfo,
  setProjectInfo,
  userInfo,
}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(userInfo);

  let initialStateOfFavorite;
  if (user.favProjectIdList.indexOf(projectInfo._id) === -1) {
    initialStateOfFavorite = false;
  } else {
    initialStateOfFavorite = true;
  }

  const [starred, setStarred] = useState(initialStateOfFavorite);
  const handleStarClick = () => {
    if (starred === true) {
      setStarred(false);
      let index = user.favProjectIdList.indexOf(projectInfo._id);
      if (index > -1) {
        // dispatch(removeProjectFromFavourite(index));
      }
    } else {
      // dispatch(addProjectToFavourite(projectInfo._id));
      // user.favoriteProjectList.push(projectInfo.id);
      setStarred(true);
    }
  };

  const handleProfileClickedInside = (event) => {
    event.stopPropagation();
    setIsProfileClicked(true);
  };

  return (
    <div className="project-info">
      <div className="project-name-and-logo">
        <div className="project-logo">
          <img
            className="project-logo-img"
            src="https://img.icons8.com/dusk/64/000000/microsoft-project.png"
          />
        </div>
        <div className="project-name-plus-extra-info">
          <div className="name-and-track-log">
            <div className="project-name-div">
              <h3 className="project-name-heading">
                {projectInfo && projectInfo.projectName}
              </h3>
              <div className="info-favorite-logo">
                <img
                  className="info-logo-img"
                  src="https://img.icons8.com/material-outlined/24/000000/info--v1.png"
                />
                {/* {!starred && <img onClick={handleStarClick} className="favorite-logo-img" src="https://img.icons8.com/ios-filled/50/000000/star--v1.png" />} */}
                {starred && (
                  <img
                    onClick={handleStarClick}
                    className="favorite-logo-img"
                    src="https://www.linkpicture.com/q/star.png"
                  />
                )}
                {!starred && (
                  <img
                    onClick={handleStarClick}
                    className="favorite-logo-img"
                    src="https://www.linkpicture.com/q/star-shape.png"
                  />
                )}
              </div>
            </div>
            <div className="track-log">
              <p>🟩 On Track</p>
            </div>
          </div>
        </div>
      </div>
      <Nav className="nav-bar" as="ul">
        <Nav.Item as="li">
          <Link
            to={`/projects/${projectInfo._id}/overview`}
            className="nav-option option-1"
          >
            Overview
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link
            to={`/projects/${projectInfo._id}/board`}
            className="nav-option option-2"
          >
            Board
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link
            to={`/projects/${projectInfo._id}/charts`}
            className="nav-option option-2"
          >
            Charts
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link
            to={`/projects/${projectInfo._id}/timeline`}
            className="nav-option option-2"
          >
            Timeline
          </Link>
        </Nav.Item>
      </Nav>
      <hr></hr>
    </div>
  );
};
export default ProjectInfo;
