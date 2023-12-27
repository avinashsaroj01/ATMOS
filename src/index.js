import ReactDOM from "react-dom/client";
import React from "react";
import "./project-task.css";
import "./project.css";
import "./common.css";

import App from "./App";
import { render, screen } from "@testing-library/react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { ChatProvider } from './pages/Messages/Components/context/ChatContext';
// import { ChatsProvider } from './pages/Messages/Components/context/ChatsContext';
import { store } from "./store";
import { Provider } from "react-redux";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

const root = ReactDOM.createRoot(document.getElementById("root"));

// test('renders learn react link', () => {
root.render(
  // <React.StrictMode>

  <Provider store={store}>
    <MantineProvider theme={{ colorScheme: "light" }}>
      <ModalsProvider>
        {/* <ChatProvider> */}
        {/* <ChatsProvider> */}
          <App />

        {/* </ChatsProvider> */}
        {/* </ChatProvider> */}
      </ModalsProvider>
    </MantineProvider>
  </Provider>
  // </React.StrictMode>
);
// const linkElement = screen.getByText(/learn react/i);
// expect(linkElement).toBeInTheDocument();
// })
