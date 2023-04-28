import { render, screen } from "@testing-library/react";
import { Movements, MovementType } from "@/components/movements";

describe("Movements", () => {
  it("renders three columns", () => {
    render(<Movements type={MovementType.Income} />);
    const column1 = screen.getByText(/Fecha/);
    const column2 = screen.getByText(/Descripción/);
    const column3 = screen.getByText(/Valor/)

    expect(column1).toBeInTheDocument();
    expect(column2).toBeInTheDocument();
    expect(column3).toBeInTheDocument();
  });

  it("renders incomes table", () => {
    render(<Movements type={MovementType.Income} />);
    const title = screen.getByText(/Ingresos/);

    expect(title).toBeInTheDocument();
  });

  it("renders expenses table", () => {
    render(<Movements type={MovementType.Expense} />);
    const title = screen.getByText(/Egresos/);

    expect(title).toBeInTheDocument();
  });
});
