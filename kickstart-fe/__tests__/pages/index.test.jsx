import { render, screen } from "@testing-library/react";
import Index from "@/pages/index";

jest.mock("@/components/Layout", () => ({ children }) => <>{children}</>);

describe("Index", () => {
  it("renders an Index", () => {
    render(<Index />);
    const heading = screen.getByText("Next image stub");
    expect(heading).toBeInTheDocument();
  });
});
