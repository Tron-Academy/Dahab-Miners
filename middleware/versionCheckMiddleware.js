import semver from "semver";

const MIN_VERSIONS = {
  android: "1.0.0",
  ios: "1.5.0",
};

export const versionGuard = (req, res, next) => {
  const version = req.headers["app-version"];
  const platform = req.headers["platform"];

  // Old apps won't send version
  if (!version || !platform) {
    return res.status(426).json({
      code: "UPDATE_REQUIRED",
      message: "Please update the app to continue",
      storeUrl: "https://apps.apple.com/us/app/dahab-mining/id6752802798",
    });
  }

  if (semver.lt(version, MIN_VERSIONS[platform])) {
    return res.status(426).json({
      code: "UPDATE_REQUIRED",
      message: "Please update the app to continue",
      storeUrl:
        "https://play.google.com/store/apps/details?id=com.dahabminers.dahb",
    });
  }

  next();
};
