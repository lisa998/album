export const getApiUrl = (path) =>
  process.env["REACT_APP_API_URL"]
    ? `${process.env["REACT_APP_API_URL"]}/${path}`
    : `http://localhost:3001/${path}`;
