import { render, screen } from "@testing-library/react";
import NewIndex from "@/pages/campaigns/new";

jest.mock("@/components/Layout", () => ({ children }) => <>{children}</>);

describe("compaign/new tests", () => {
  it("renders a compaign/new ", () => {
    render(<NewIndex />);

    // Basic tests to be updated
    expect(screen.getByText("Create Campaign")).toBeInTheDocument();
    expect(screen.getByText("Minimum Contribution")).toBeInTheDocument();
    expect(screen.getByText("Create!")).toBeInTheDocument();
  });
});
