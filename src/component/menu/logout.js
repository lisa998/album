import { LogoutBtn } from "./styled";
import axios from "axios";

export default function Logout({ setStatus }) {
  axios.defaults.withCredentials = true;
  return (
    <LogoutBtn
      onClick={async () => {
        let r = await axios.get("http://localhost:3001/logout");
        console.log(r.data);
        setStatus("");
      }}
    >
      <h1 style={{ margin: "auto" }}>Logout</h1>
    </LogoutBtn>
  );
}
