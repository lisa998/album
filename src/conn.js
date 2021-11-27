export const getApiUrl = (path) =>
  process.env["API_URL"]
    ? `${process.env["API_URL"]}/${path}`
    : `http://localhost:3001/${path}`;
