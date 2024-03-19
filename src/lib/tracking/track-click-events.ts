import { trackEvent } from "./analytics-api";

export const trackClick = (event: MouseEvent, variation: boolean) => {
  const target = event.composedPath()?.find((t: any) => {
    const tagName = t && t.tagName && t.tagName.toUpperCase();
    return tagName === "BUTTON" || tagName === "A" || tagName === "SVG";
  });

  if (!target) {
    return;
  }

  const isTargetTrackable = (target as HTMLElement).getAttribute("data-trackclick") === "true";
  if (isTargetTrackable) {
    trackEvent({
      variation,
      url: window.location.href
    });
  }
};
