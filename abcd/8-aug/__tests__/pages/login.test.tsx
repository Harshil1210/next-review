import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Page from "@/app/login/page";

jest.mock("next/navigation", () => require("next-router-mock"));
const mockStore = configureStore([]);

const initialState = {
  alluserlist: null,
  loggedInUser: null,
  userlist: [],
  edituser: null,
  error: null,
  loading: false,
};
let store = mockStore(initialState);

describe("login page", () => {
  beforeEach(() => {
    store.clearActions();
  });
  test("renders login page", () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
  });

  test("renders with all inputs and heading", async () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    const heading = screen.getByRole("heading", {
      name: /login/i,
    });
    const userNameInput = screen.getByRole("textbox", {
      name: /username/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const roleInput = screen.getByRole("combobox", {
      name: /role/i,
    });

    expect(heading).toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(roleInput).toBeInTheDocument();
  });

  test("shows error messages for empty required fields", async () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );

    const submitButton = screen.getByRole("button", {
      name: /submit credential/i,
    });
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);
    await waitFor(() => {
      const userNameErr = screen.getByText(/username is required/i);
      expect(userNameErr).toBeInTheDocument();

      const passwordErr = screen.getByText(/password is required/i);
      expect(passwordErr).toBeInTheDocument();

      const roleErr = screen.getByText(/role is required/i);
      expect(roleErr).toBeInTheDocument();
    });
  });

  test("shows OTP field when role is devotee", async () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );

    const roleInput: any = screen.getByRole("combobox", {
      name: /role/i,
    });
    expect(roleInput).toBeInTheDocument();

    fireEvent.change(roleInput, { target: { value: "devotee" } });
    expect(roleInput.value).toBe("devotee");

    const OTPInput = screen.getByText(/otp/i);
    await waitFor(() => {
      expect(OTPInput).toBeInTheDocument();
    });
  });

  test("shows error on empty userName field", async () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    const userNameInput = screen.getByRole("textbox", {
      name: /username/i,
    });
    expect(userNameInput).toBeInTheDocument();

    fireEvent.blur(userNameInput, { target: { value: "" } });
    await waitFor(() => {
      const userNameErr = screen.getByText(/username is required/i);
      expect(userNameErr).toBeInTheDocument();
    });
  });

  test("shows error on empty password field", async () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    fireEvent.blur(passwordInput, { target: { value: "" } });
    await waitFor(() => {
      const passwordErr = screen.getByText(/password is required/i);
      expect(passwordErr).toBeInTheDocument();
    });
  });

  test("shows error on empty role field", async () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    const roleInput = screen.getByRole("combobox", {
      name: /role/i,
    });
    expect(roleInput).toBeInTheDocument();

    fireEvent.blur(roleInput, { target: { value: "" } });
    await waitFor(() => {
      const roleErr = screen.getByText(/role is required/i);
      expect(roleErr).toBeInTheDocument();
    });
  });

  test("shows no errors if field values are valid", async () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    const userNameInput = screen.getByRole("textbox", {
      name: /username/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const roleInput = screen.getByRole("combobox", {
      name: /role/i,
    });

    fireEvent.blur(roleInput, { target: { value: "devotee" } });
    fireEvent.blur(passwordInput, { target: { value: "password" } });
    fireEvent.blur(userNameInput, { target: { value: "admin" } });

    await waitFor(() => {
      expect(
        screen.queryByText(/username is required/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password is required/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/role is required/i)).not.toBeInTheDocument();
    });
  });
});
