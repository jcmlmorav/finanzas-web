import { render, screen } from "@testing-library/react";
import { Balance } from "@/components/balance";

describe("Balance", () => {
  it("renders title correctly", () => {
    render(<Balance />);
    const heading = screen.getByText(/Balance/);
    expect(heading).toBeInTheDocument();
  });
});
