import { render, screen } from "@testing-library/react";
import Adress from "@/pages/campaigns/[address]";

jest.mock("@/components/Layout", () => ({ children }) => <>{children}</>);

describe("Index", () => {
  it("renders an Index", () => {
    render(<Adress />);

    // Basic tests to update
    expect(screen.getByText("Amount to Contribute")).toBeInTheDocument();
  });
});
