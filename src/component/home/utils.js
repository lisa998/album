import axios from "axios";

export const uploadToImgur = async (file, name) => {
  const data = new FormData();
  data.append("image", file);
  data.append("name", name);
  let config = {
    method: "post",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: "Client-ID " + process.env.REACT_APP_CLIENT_ID,
    },
    data: data,
    withCredentials: false,
  };
  let r = await axios(config);
  return r.data.data;
};
