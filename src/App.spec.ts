import { render } from "@testing-library/vue";
import App from "./App.vue";
import * as Tracking from "./lib/tracking/analytics-api";
import STORAGE_KEYS from "./lib/storage/keys";

describe("A/B Test", () => {
  const trackPageview = vi.fn();
  const renderComponent = () => render(App);

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Tracking, "trackPageview").mockImplementationOnce(trackPageview);
  });

  afterEach(() => {
    trackPageview.mockClear();
  });

  it.each([
    { type: "variation", content: /18 million users/ },
    {
      type: "control",
      content: /revolutionized reading/
    }
  ])("should display the correct content for $type page", ({ content, type }) => {
    localStorage.setItem(STORAGE_KEYS.DISPLAY_VARIATION, JSON.stringify(type === "variation"));
    const { getByText } = renderComponent();
    expect(getByText(content)).toBeTruthy();
  });

  it.each([
    { type: "variation" },
    {
      type: "control"
    }
  ])("should track the pageview correctly", ({ type }) => {
    const variation = type === "variation";
    localStorage.setItem(STORAGE_KEYS.DISPLAY_VARIATION, JSON.stringify(variation));
    renderComponent();
    expect(trackPageview).toHaveBeenCalledWith(
      expect.objectContaining({
        variation
      })
    );
  });
});
