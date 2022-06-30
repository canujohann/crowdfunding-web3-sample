import { render, screen } from "@testing-library/react";
import CampaignIndex from "@/pages/campaigns";

jest.mock("@/components/Layout", () => ({ children }) => <>{children}</>);

describe("CampaignIndex tests", () => {
  it("renders a CampaignIndex", () => {
    render(<CampaignIndex />);

    // Basic tests to be updated
    expect(screen.getByText("Open Campaigns")).toBeInTheDocument();
  });
});
