import { render, screen } from "@testing-library/react";
import New from "@/pages/campaigns/[address]/requests/new";

jest.mock("@/components/Layout", () => ({ children }) => <>{children}</>);

describe("Index", () => {
  it("renders an New", () => {
    render(<New address="xxx" />);

    // Basic tests to update
    expect(screen.getByText("Create a Request")).toBeInTheDocument();
  });
});
