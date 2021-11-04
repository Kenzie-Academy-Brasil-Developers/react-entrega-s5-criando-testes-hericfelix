import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "../../App";
import { LocateCepProvider } from "../../providers/CepProvider";
import MockAdapter from "axios-mock-adapter";
import api from "../../services";

const mockApi = new MockAdapter(api);

describe("App page test", () => {
  test("Should be able to get a CEP from the api", async () => {
    mockApi.onGet("80050530").replyOnce(200, {
      bairro: "Cristo Rei",
      cidade: "Curitiba",
      logradouro: "Rua João Dranka",
      estado_info: {
        area_km2: "199.307,985",
        codigo_ibge: "41",
        nome: "Paraná",
      },
      cep: "80050530",
      cidade_info: {
        area_km2: "435,036",
        codigo_ibge: "4106902",
      },
      estado: "PR",
    });
    render(<App />, { wrapper: LocateCepProvider });

    const input = screen.getByPlaceholderText("Insira o CEP");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "80050530" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Rua João Dranka")).toBeInTheDocument();
    });
  });
});
