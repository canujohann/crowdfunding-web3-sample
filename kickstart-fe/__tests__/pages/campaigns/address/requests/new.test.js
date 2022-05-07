import { render, screen } from "@testing-library/react";
import New from "@/pages/campaigns/[address]/requests/new.js";

jest.mock("@/components/Layout", () => ({ children }) => <>{children}</>);

describe("Index", () => {
  it("renders an Index", () => {
    render(<New />);

    // Basic tests to update
    expect(screen.getByText("Create a Request")).toBeInTheDocument();
  });
});
