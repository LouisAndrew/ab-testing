import STORAGE_KEYS from "../storage/keys";
import useStorage from "../storage";

type Params = {
  variation: boolean;
  url: string;
};

export const trackPageview = (params: Params) => {
  const uniquePageviewStorage = useStorage<boolean>(STORAGE_KEYS.UNIQUE_PAGEVIEW_TRACKED);
  const isUniquePageviewTracked = uniquePageviewStorage.get();
  if (!isUniquePageviewTracked) {
    uniquePageviewStorage.set(true);
    // API call to track unique page view
  }

  console.log(
    `--> Tracking Pageview: ${JSON.stringify(
      {
        ...params,
        uniquePageview: !isUniquePageviewTracked
      },
      null,
      2
    )}`
  );
};

export const trackEvent = (params: Params) => {
  const conversionTrackedStorage = useStorage<boolean>(STORAGE_KEYS.CONVERSION_TRACKED);
  const isConversionTracked = conversionTrackedStorage.get();
  if (!isConversionTracked) {
    conversionTrackedStorage.set(true);
    // API call to track unique conversion
  }

  console.log(
    `--> Tracking Event: ${JSON.stringify(
      {
        ...params,
        uniqueConversion: !isConversionTracked
      },
      null,
      2
    )}`
  );
};
