import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect, describe, it } from "vitest";
import SignUp from "../pages/SignUp/SignUp";

test("SignUp", () => {
  it("redirects to login page after successful signup", async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    // Fill out the signup form
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "Password123!" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Wait for the success toast message to appear
    await waitFor(() =>
      expect(screen.getByText("Welcome to Galvanize! Redirecting to Login...")).toBeInTheDocument()
    );

    // Check if the redirection occurred
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});