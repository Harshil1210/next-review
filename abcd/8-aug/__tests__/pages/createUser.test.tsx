import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "@/app/admin/createuser/page";

jest.mock("react-dom", () => ({
  useFormState: jest.fn(),
}));
jest.mock("next/navigation", () => require("next-router-mock"));
jest.mock("react-hot-toast", () => ({
  loading: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
}));

describe("Create user", () => {
 
  test("render page correctly", () => {
    render(<Page />);
    const firstName = screen.getByText(/first name/i);
    expect(firstName).toBeInTheDocument();
  });

  test("renders create user page correctly", async () => {
    render(<Page />);

    expect(
      screen.getByRole("textbox", { name: /first name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /last name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /last name/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  });

  test("shows error messages for empty required fields on submit button", async () => {
    render(<Page />);
    const submitButton = screen.getByRole("button", {
      name: /create user/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/middle name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/initiation date is required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/flat number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/area is required/i)).toBeInTheDocument();
      expect(screen.getByText(/city is required/i)).toBeInTheDocument();
      expect(screen.getByText(/state is required/i)).toBeInTheDocument();
      expect(screen.getByText(/pincode is required/i)).toBeInTheDocument();
    });
  });

  test("shows error for initiation date cannot be less than of last 2 month", async () => {
    render(<Page />);

    const initiationDateInput = screen.getByLabelText(/initiation date/i);
    expect(initiationDateInput).toBeInTheDocument();

    fireEvent.input(initiationDateInput, { target: { value: "2024-06-06" } });
    await waitFor(() => {
      expect(
        screen.getByText(
          /initiation date should be not be less than of last 2 month/i
        )
      ).toBeInTheDocument();
    });
  });

  test("show error for invalid pincode", async () => {
    render(<Page />);

    const pinCodeInput = screen.getByRole("textbox", {
      name: /pincode/i,
    });
    expect(pinCodeInput).toBeInTheDocument();

    fireEvent.input(pinCodeInput, { target: { value: "abc123" } });
    await waitFor(() => {
      const pinCodeErr = screen.getByText(
        /pincode should not contain non digit characters/i
      );
      expect(pinCodeErr).toBeInTheDocument();
    });
  });

  test("shows error for pincode more than 6 digit long", async () => {
    render(<Page />);

    const pinCodeInput = screen.getByRole("textbox", {
      name: /pincode/i,
    });
    expect(pinCodeInput).toBeInTheDocument();

    fireEvent.input(pinCodeInput, { target: { value: "abc12332" } });
    await waitFor(() => {
      const pinCodeErr = screen.getByText(
        /for pincode maximum 6 digit allowed/i
      );
      expect(pinCodeErr).toBeInTheDocument();
    });
  });

  test("shows error for invalid email", async () => {
    render(<Page />);
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    expect(emailInput).toBeInTheDocument();
    fireEvent.input(emailInput, { target: { value: "abcgmailcom" } });
    await waitFor(() => {
      const emailErr = screen.getByText(/pleae enter valid email/i);
      expect(emailErr).toBeInTheDocument();
    });
  });

  test("shows error for invalid emails", async () => {
    const invalidEmails = [
      "abcgmailcom",
      "abc@.com",
      "abc@gmail",
      "abc@gmail..com",
      "abc@gmail.com.",
      "abc@123.456",
      "abc@.123.456",
      "abc@gmailcom",
    ];
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    for (const email of invalidEmails) {
      fireEvent.input(emailInput, { target: { value: email } });
      await waitFor(() => {
        const emailErr = screen.getByText(/pleae enter valid email/i);
        expect(emailErr).toBeInTheDocument();
      });
    }
  });

  test("shows error for firstName less than 3 characters long", async () => {
    render(<Page />);
    const firstNameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });
    expect(firstNameInput).toBeInTheDocument();

    fireEvent.input(firstNameInput, { target: { value: "ab" } });
    await waitFor(() => {
      const firstNameErr = screen.getByText(
        /for first name minimum 3 char required/i
      );
      expect(firstNameErr).toBeInTheDocument();
    });
  });

  test("shows error for firstName more than 15 characters long", async () => {
    render(<Page />);
    const firstNameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });
    expect(firstNameInput).toBeInTheDocument();

    fireEvent.input(firstNameInput, {
      target: { value: "ab12rqewjghjasdgf23t48237423kjdasf" },
    });
    await waitFor(() => {
      const firstNameErr = screen.getByText(
        /for first name maximum 15 char allowed/i
      );
      expect(firstNameErr).toBeInTheDocument();
    });
  });

  test("shows error for lastName less than 3 characters long", async () => {
    render(<Page />);
    const lastNameInput = screen.getByRole("textbox", {
      name: /last name/i,
    });
    expect(lastNameInput).toBeInTheDocument();

    fireEvent.input(lastNameInput, { target: { value: "ab" } });
    await waitFor(() => {
      const lastNameErr = screen.getByText(
        /for last name minimum 3 char required/i
      );
      expect(lastNameErr).toBeInTheDocument();
    });
  });

  test("shows error for lastName more than 15 characters long", async () => {
    render(<Page />);
    const lastNameInput = screen.getByRole("textbox", {
      name: /last name/i,
    });
    expect(lastNameInput).toBeInTheDocument();

    fireEvent.input(lastNameInput, {
      target: { value: "ab12rqewjghjasdgf23t48237423kjdasf" },
    });
    await waitFor(() => {
      const lastNameErr = screen.getByText(
        /for last name maximum 15 char allowed/i
      );
      expect(lastNameErr).toBeInTheDocument();
    });
  });

  test("shows error for middleName less than 3 characters long", async () => {
    render(<Page />);
    const middleName = screen.getByRole("textbox", {
      name: /middle name/i,
    });
    expect(middleName).toBeInTheDocument();

    fireEvent.input(middleName, { target: { value: "ab" } });
    await waitFor(() => {
      const middleNameErr = screen.getByText(
        /for middle name minimum 3 char required/i
      );
      expect(middleNameErr).toBeInTheDocument();
    });
  });

  test("shows error for middleName more than 15 characters long", async () => {
    render(<Page />);
    const middleName = screen.getByRole("textbox", {
      name: /middle name/i,
    });
    expect(middleName).toBeInTheDocument();

    fireEvent.input(middleName, {
      target: { value: "ab12rqewjghjasdgf23t48237423kjdasf" },
    });
    await waitFor(() => {
      const middleNameErr = screen.getByText(
        /for middle name maximum 15 char allowed/i
      );
      expect(middleNameErr).toBeInTheDocument();
    });
  });

  test("shows error if area is empty on blur", async () => {
    render(<Page />);
    const areaInput = screen.getByRole("textbox", {
      name: /area/i,
    });
    fireEvent.blur(areaInput, { target: { value: "" } });
    await waitFor(() => {
      const areaErr = screen.getByText(/area is required/i);
      expect(areaErr).toBeInTheDocument();
    });
  });

  test("shows error if state is empty on blur", async () => {
    render(<Page />);
    const stateInput = screen.getByRole("textbox", {
      name: /state/i,
    });
    fireEvent.blur(stateInput, { target: { value: "" } });
    await waitFor(() => {
      const stateErr = screen.getByText(/state is required/i);
      expect(stateErr).toBeInTheDocument();
    });
  });

  test("shows error if city is empty on blur", async () => {
    render(<Page />);
    const cityInput = screen.getByRole("textbox", {
      name: /city/i,
    });
    fireEvent.blur(cityInput, { target: { value: "" } });
    await waitFor(() => {
      const cityErr = screen.getByText(/city is required/i);
      expect(cityErr).toBeInTheDocument();
    });
  });

  test("shows error if flatNumber is empty on blur", async () => {
    render(<Page />)
    const flatInput = screen.getByRole("spinbutton", {
      name: /flat number/i,
    });
    fireEvent.blur(flatInput, { target: { value: "" } });
    await waitFor(() => {
      const flatErr = screen.getByText(/flat number is required/i);
      expect(flatErr).toBeInTheDocument();
    });
  })

  test("shows error if InitiationDate is empty on blur", async () => {
    render(<Page />);
    const InitiationDate = screen.getByLabelText(/initiation date/i);
    fireEvent.blur(InitiationDate, { target: { value: "" } });
    await waitFor(() => {
      const flatErr = screen.getByText(/initiation date is required/i);
      expect(flatErr).toBeInTheDocument();
    });
  });

  test("shows error if pinCode is empty on blur", async () => {
    render(<Page />);
    const pinCode = screen.getByRole("textbox", {
      name: /pincode/i,
    });
    fireEvent.blur(pinCode, { target: { value: "" } });
    await waitFor(() => {
      const flatErr = screen.getByText(/pincode is required/i);
      expect(flatErr).toBeInTheDocument();
    });
  });

  test("shows error if Email is empty on blur", async () => {
    render(<Page />);
    const Email = screen.getByRole("textbox", {
      name: /email/i,
    });
    fireEvent.blur(Email, { target: { value: "" } });
    await waitFor(() => {
      const flatErr = screen.getByText(/email is required/i);
      expect(flatErr).toBeInTheDocument();
    });
  });
});
