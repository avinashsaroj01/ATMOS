import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useState } from "react";


const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});

const Datatable = ({alldata, type}) => {
  const [data, setData] = useState(alldata);

  const handleDelete = async (id,type) => {
    try {
        setData(data.filter((item) => item._id !== id));
            const res = await fetch( `${process.env.REACT_APP_BACKEND_URL}/admin/${type}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            const datares = await res.json();
            console.log(datares);            
    } catch (err) {
        console.log(err);
    }
}

  let typeData;
    switch (type) {
        case "users":
            typeData = {
                columns: [
                    { field: "_id", headerName: "ID", width: 230 },
                    { field: "username", headerName: "User", width: 340,
                        renderCell: (params) => {
                            return (
                                <div className="cellWithImg">
                                    <img className="cellImg" src={params.row.avatar} alt="avatar" />
                                    {params.row.userName}
                                </div>
                                );
                            },
                    },
                    { field: "email", headerName: "Email", width: 330 }
                ],
                title: "USERS",
                add: "Add New User",
                url: "/admin-portal/users/new"
            }
            break;
        case "projects":
            typeData = {
                columns: [
                    { field: "_id", headerName: "ID", width: 190 },
                    { field: "projectName", headerName: "Project", width: 290, 
                        renderCell: (params) => {
                            return (
                                <div className="cellWithProjectName">
                                    {params.row.projectName}
                                </div>
                                );
                            },
                    },
                    { field: "projectDescription", headerName: "Description", width: 300 },
                    {field: 'projectOwner', headerName: "Owner", width: 200,
                        renderCell: (params) => {
                            return (
                                <div className="cellWithImg">
                                    <img className="cellImg" src={params.row.projectOwner.avatar} alt="avatar" />
                                    {params.row.projectOwner.userName}
                                </div>
                            )
                        }
                    },
                    { field: "projectType", headerName: "Type", width: 200,
                        renderCell: (params) => {
                            return (
                                <div className={`cellWithStatus ${params.row.projectType}`}>
                                    {/* <div className="statusDot"></div> */}
                                    {params.row.projectType}
                                </div>
                                );
                            },
                    },
                ],
                title: "PROJECTS",
                add: "Add New Project",
                url: "/admin-portal/projects/new"
            }
            break;
        case "tasks":
            typeData = {
                columns: [
                    { field: "_id", headerName: "ID", width: 190 },
                    { field: "taskName", headerName: "Task", width: 290,
                        renderCell: (params) => {
                            return (
                                <div className="cellWithProjectName">
                                    {params.row.taskName}
                                </div>
                                );
                            },
                    },
                    { field: "taskDescription", headerName: "Description", width: 300 },
                    {field: 'taskCompletion', headerName: "Completion", width: 200,
                        renderCell: (params) => {
                            return (
                                <div className={`cellWithStatus ${params.row.taskCompletion}`}>
                                    {/* <div className="statusDot"></div> */}
                                    {params.row.taskCompletion? "True" : "False"}
                                </div>
                            )
                        }
                    },
                    {field: 'taskPriority', headerName: "Priority", width: 200,
                        renderCell: (params) => {
                            return (
                                <div className={`cellWithStatus ${params.row.taskPriority}`}>
                                    {params.row.taskPriority}
                                </div>
                            )
                        }
                    },
                    {field: 'taskStatus', headerName: "Status", width: 200, 
                        renderCell: (params) => {
                            return (
                                <div className={`cellWithStatus ${params.row.taskStatus}`}>
                                    {params.row.taskStatus}
                                </div>
                            )
                        }
                    },
                    {field: 'taskCreator', headerName: "Creator", width: 200,
                        renderCell: (params) => {
                            return (
                                <div className="cellWithImg">
                                    <img className="cellImg" src={params.row.taskCreator.avatar} alt="avatar" />
                                    {params.row.taskCreator.userName}
                                </div>
                            )
                        }
                    },

                ],
                title: "TASKS",
                add: "Add New Task",
                url: "/admin-portal/tasks/new"
            }
            break;
            case "sections":
                typeData = {
                    columns: [
                        { field: "_id", headerName: "ID", width: 190 },
                        { field: "sectionName", headerName: "Section", width: 290,
                            renderCell: (params) => {
                                return (
                                    <div className="cellWithProjectName">
                                        {params.row.sectionName}
                                    </div>
                                    );
                                },
                        },
                        {field: 'taskIdList', headerName: "Number of Tasks", width: 200,
                            renderCell: (params) => {
                                return (
                                    <div className="cellWithStatus">
                                        {params.row.taskIdList.length}
                                    </div>
                                )
                            }
                        },
                        {field: 'projectId', headerName: "Project", width: 200,
                            renderCell: (params) => {
                                return (
                                    <div className="cellWithStatus">
                                        {params.row.projectId.projectName}
                                    </div>
                                )
                            }
                        },
                    ],
                    title: "SECTIONS",
                    add: "Add New Section",
                    url: "/admin-portal/sections/new"
                }
                break;
        default:
            break;
    }
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/admin-portal/"+type+"/"+params.row._id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id, type)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
    {typeData && data && <div className="datatable">
      <div className="datatableTitle">
            {typeData.title}
         {/* {typeData.add} */}
        <Link to={typeData.url} className="linktable btn-primary">
            Add new
        </Link>
      </div>
        <ThemeProvider theme={theme}>
            <DataGrid
                getRowId={(row) => row._id}
                className="datagrid"
                rows={data}
                columns={typeData.columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </ThemeProvider>
    </div>}
    </>
  );
};

export default Datatable;
