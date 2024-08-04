import '@testing-library/jest-dom'
import { render, screen , fireEvent , waitFor } from '@testing-library/react'
import Home from '@/app/home/page'
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";
// import Page from "@/pages/loginPage"; // Adjust the import path based on your project structure
// import { addLoggedInuser } from "@/Redux/features/userSlice";
describe('Page', () => {
  it('renders a heading', () => {
    render(<Home />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})

// Mock next/navigation module
jest.mock("next/navigation", () => ({
    redirect: jest.fn(),
  }));
  
  // Mock adminAction module
  jest.mock("@/Actions/adminAction", () => ({
    login: jest.fn(),
  }));
  
  const mockStore = configureStore([thunk]);
  
  describe("Login Page", () => {
    let store: any;
  
    beforeEach(() => {
      store = mockStore({
        user: {},
      });
    });
  
    test("renders login form correctly", () => {
      render(
        <Provider store={store}>
          <Page />
        </Provider>
      );
  
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(screen.getByLabelText("Role")).toBeInTheDocument();
    });
  
    test("shows error messages for empty required fields", async () => {
      render(
        <Provider store={store}>
          <Page />
        </Provider>
      );
  
      fireEvent.click(screen.getByText("Submit Credential"));
  
      await waitFor(() => {
        expect(screen.getByText("Username is required")).toBeInTheDocument();
        expect(screen.getByText("Password is required")).toBeInTheDocument();
        expect(screen.getByText("Role is required")).toBeInTheDocument();
      });
    });
  
    test("shows OTP field when role is devotee", async () => {
      render(
        <Provider store={store}>
          <Page />
        </Provider>
      );
  
      userEvent.selectOptions(screen.getByLabelText("Role"), ["devotee"]);
  
      await waitFor(() => {
        expect(screen.getByLabelText("OTP")).toBeInTheDocument();
      });
    });
  
    test("submits the form and redirects on successful login", async () => {
      const mockResponse = { message: { role: "admin" } };
      const { login } = require("@/Actions/adminAction");
      login.mockResolvedValue(mockResponse);
  
      render(
        <Provider store={store}>
          <Page />
        </Provider>
      );
  
      userEvent.type(screen.getByLabelText("Username"), "testuser");
      userEvent.type(screen.getByLabelText("Password"), "password");
      userEvent.selectOptions(screen.getByLabelText("Role"), ["admin"]);
  
      fireEvent.click(screen.getByText("Submit Credential"));
  
      await waitFor(() => {
        expect(login).toHaveBeenCalledWith({
          Id: "testuser",
          password: "password",
          role: "admin",
          otp: undefined,
        });
        expect(localStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(mockResponse.message));
        expect(store.getActions()).toContainEqual(addLoggedInuser(mockResponse.message));
        expect(require("next/navigation").redirect).toHaveBeenCalledWith("/admin/userlist");
      });
    });
  
    test("displays error message for invalid login", async () => {
      const mockResponse = { message: "Invalid user/password/role" };
      const { login } = require("@/Actions/adminAction");
      login.mockResolvedValue(mockResponse);
  
      render(
        <Provider store={store}>
          <Page />
        </Provider>
      );
  
      userEvent.type(screen.getByLabelText("Username"), "invaliduser");
      userEvent.type(screen.getByLabelText("Password"), "invalidpassword");
      userEvent.selectOptions(screen.getByLabelText("Role"), ["admin"]);
  
      fireEvent.click(screen.getByText("Submit Credential"));
  
      await waitFor(() => {
        expect(login).toHaveBeenCalledWith({
          Id: "invaliduser",
          password: "invalidpassword",
          role: "admin",
          otp: undefined,
        });
        expect(screen.getByText("Invalid user/password/role")).toBeInTheDocument();
      });
    });
  });
