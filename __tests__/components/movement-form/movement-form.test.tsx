import { render, screen } from "@testing-library/react";
import { MovementForm } from "@/components/movement-form";

describe("MovementForm", () => {
  beforeEach(() => {
    render(<MovementForm />);
  });

  it("renders type buttons correctly", () => {
    const incomeButton = screen.getByText(/Ingreso/);
    const expenseButton = screen.getByText(/Egreso/);

    expect(incomeButton).toBeInTheDocument();
    expect(expenseButton).toBeInTheDocument();
  });

  it("renders date input", () => {
    const dateInput = screen.getByLabelText(/Fecha/);
    expect(dateInput).toBeInTheDocument();
  });

  it("renders amount input", () => {
    const amountInput = screen.getByLabelText(/Valor/);
    expect(amountInput).toBeInTheDocument();
  });

  it("renders description input", () => {
    const descriptionInput = screen.getByLabelText(/Descripción/);
    expect(descriptionInput).toBeInTheDocument();
  });

  it("renders register and cancel buttons", () => {
    const registerButton = screen.getByRole("button", {
      name: "Registrar",
    });
    const cancelButton = screen.getByRole("button", {
      name: "Cancelar",
    });

    expect(registerButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});
