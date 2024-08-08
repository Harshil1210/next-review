import Page from "@/app/devotee/payonline/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@inrupt/jest-jsdom-polyfills";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => require("next-router-mock"));

describe('payonline', () => { 
    test("renders the page correctly", async () => {
      render(<Page />);

      const heading = screen.getByRole("heading", {
        name: /pay online/i,
      });
      expect(heading).toBeInTheDocument();
    });

    test("renders all the input elements", async () => {
      render(<Page />);
      const monthInput = screen.getByRole("combobox", {
        name: /month/i,
      });
      const yearInput = screen.getByRole("combobox", {
        name: /year/i,
      });
      const amountInput = screen.getByRole("spinbutton", {
        name: /amount/i,
      });

      expect(monthInput).toBeInTheDocument();
      expect(yearInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
    });

    test("shows error messages for empty required fields", async () => {
      render(<Page />);

      const submitButton = screen.getByRole("button", {
        name: /make donation/i,
      });
      expect(submitButton).toBeInTheDocument();
      fireEvent.click(submitButton);

      await waitFor(() => {
        const monthErr = screen.getByText(/month is required/i);
        const yearErr = screen.getByText(/year is required/i);
        const amountErr = screen.getByText(/amount is required/i);

        expect(monthErr).toBeInTheDocument();
        expect(yearErr).toBeInTheDocument();
        expect(amountErr).toBeInTheDocument();
      });
    });

    test("shows error for amount less than 100", async () => {
      render(<Page />);
      const amountInput = screen.getByRole("spinbutton", {
        name: /amount/i,
      });
      fireEvent.blur(amountInput, { target: { value: 12 } });
      await waitFor(() => {
        const amountErr = screen.getByText(
          /amount should not be less than 100/i
        );
        expect(amountErr).toBeInTheDocument();
      });
    });

    test("shows error for empty month field", async () => {
      render(<Page />);
      const monthInput = screen.getByRole("combobox", {
        name: /month/i,
      });
      fireEvent.blur(monthInput, { target: { value: "" } });
      await waitFor(() => {
        const monthErr = screen.getByText(/month is required/i);
        expect(monthErr).toBeInTheDocument();
      });
    });

    test("shows error for empty year field", async () => {
      render(<Page />);
      const yearInput = screen.getByRole("combobox", {
        name: /year/i,
      });
      fireEvent.blur(yearInput, { target: { value: "" } });
      await waitFor(() => {
        const yearErr = screen.getByText(/year is required/i);
        expect(yearErr).toBeInTheDocument();
      });
    });

    test("shows error for empty amount field", async () => {
      render(<Page />);
      const amountInput = screen.getByRole("spinbutton", {
        name: /amount/i,
      });
      fireEvent.blur(amountInput, { target: { value: "" } });
      await waitFor(() => {
        const amountErr = screen.getByText(/amount is required/i);
        expect(amountErr).toBeInTheDocument();
      });
    });
 })