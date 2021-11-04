import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Search from "../../components/Search";
import { LocateCepProvider } from "../../providers/CepProvider";

describe("Search component", () => {
  test("should render input", () => {
    render(<Search />);

    expect(screen.getByPlaceholderText("Insira o CEP")).toBeInTheDocument();
  });

  test("should render button", () => {
    render(<Search />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("button should be disabled when input is empty", () => {
    render(<Search />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("button should be enabled when input is not empty", () => {
    render(<Search />, { wrapper: LocateCepProvider });

    const input = screen.getByPlaceholderText("Insira o CEP");

    fireEvent.change(input, { target: { value: "123" } });

    expect(screen.getByRole("button")).toBeEnabled();
  });
});
