context("CEP Search", () => {
  it("Enters the landing page", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);
  });

  it("Tries to search a CEP", () => {
    cy.viewport(1440, 900);

    cy.intercept("GET", "80050530", {
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
    }).as("getCep");
    cy.get("input[type=number]").type("80050530");
    cy.get("button").click();

    cy.contains("Logradouro");
  });
});
