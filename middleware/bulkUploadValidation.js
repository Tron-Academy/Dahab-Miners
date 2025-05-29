const requiredKeys = [
  "actualLocation",
  "currentLocation",
  "macAddress",
  "modelName",
  "serialNumber",
  "clientName",
  "temporaryOwner",
  "workerId",
];

function isStrictValidObject(obj) {
  const keys = Object.keys(obj).sort();
  const expected = [...requiredKeys].sort();

  // Check if keys match exactly
  if (keys.length !== expected.length) return false;
  for (let i = 0; i < expected.length; i++) {
    if (keys[i] !== expected[i]) return false;
  }

  // Check that all values are non-empty strings
  for (let key of requiredKeys) {
    if (typeof obj[key] !== "string" || obj[key].trim() === "") {
      return false;
    }
  }

  return true;
}

export { isStrictValidObject };
