import { LogoutBtn } from "./styled";
import axios from "axios";
import { getApiUrl } from "../../conn";

export default function Logout({ setStatus }) {
  axios.defaults.withCredentials = true;
  return (
    <LogoutBtn
      onClick={async () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setStatus("");
      }}
    >
      <h1 style={{ margin: "auto" }}>Logout</h1>
    </LogoutBtn>
  );
}
