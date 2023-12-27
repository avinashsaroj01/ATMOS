import { fireEvent, render, screen } from "@testing-library/react";
import CreateProject from "../CreateProject";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("Render Checking", () => {
  it("should renders New Project if nextPage == 1", async () => {
    render(
      <Router>
        <CreateProject />
      </Router>
    );
    const headingElement = screen.getByText(/New Project/i);
    expect(headingElement).toBeInTheDocument();
  });

  it("should renders all options of Project Type", async () => {
    render(
      <Router>
        <CreateProject />
      </Router>
    );
    const OptionElement1 = screen.getByTestId("type-1");
    const OptionElement2 = screen.getByTestId("type-2");
    const OptionElement3 = screen.getByTestId("type-3");
    expect(OptionElement1.textContent).toBe("Personal");
    expect(OptionElement2.textContent).toBe("Education");
    expect(OptionElement3.textContent).toBe("Business");
  });
});

describe("Label and Input Checking", () => {
  it("should renders all labels Correctly", async () => {
    render(
      <Router>
        <CreateProject />
      </Router>
    );
    const label1 = await screen.findByTestId("label-1");
    const label2 = screen.getByTestId("label-2");
    expect(label1.textContent).toBe("Project name");
    expect(label2.textContent).toBe("Project type");
  });

  it("should go to Project Mission Page after click", async () => {
    render(
      <Router>
        <CreateProject />
      </Router>
    );
    const nextButton = screen.getByText("Next");
    const nameOfProject = screen.getByTestId("nameOfProject");

    expect(nameOfProject).toMatchInlineSnapshot(`
    <input
      data-testid="nameOfProject"
      id="projectNameInput"
      placeholder="Name"
      required=""
      type="text"
      value=""
    />
    `);

    fireEvent.click(nextButton);
    expect(nameOfProject).toMatchInlineSnapshot(`
    <input
      data-testid="nameOfProject"
      id="projectNameInput"
      placeholder="This field is required"
      required=""
      style="border: 1px solid red; background-color: rgb(255, 204, 203);"
      type="text"
      value=""
    />
    `);
  });
});
