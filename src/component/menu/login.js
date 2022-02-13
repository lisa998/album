import { Submit } from "./styled";
import { useState } from "react";
import axios from "axios";
import { getApiUrl } from "../../conn";

export default function Login({ status, setStatus }) {
  const [value, setValue] = useState({ account: "", psw: "" });
  axios.defaults.withCredentials = true;
  const handleAccount = (e) =>
    setValue((value) => {
      return { ...value, account: e.target.value };
    });
  const handlePsw = (e) =>
    setValue((value) => {
      return { ...value, psw: e.target.value };
    });
  const handleSubmit = async () => {
    let r = await axios.post(getApiUrl("handleLogin"), value, {
      withCredentials: true,
    });
    if (r.data === "login fail") {
      setStatus("fail");
    } else {
      setValue({ account: "", psw: "" });
      setStatus("success");
      localStorage.setItem("token", JSON.stringify(r.data));
      axios.defaults.headers.common["Authorization"] = "Bearer " + r.data;
    }
  };

  return (
    <>
      <h1 style={{ padding: "10% 5% 5%", margin: 0 }}>Login</h1>
      <div style={{ padding: "5%" }}>
        account number:
        <input
          style={{ marginLeft: 15 }}
          value={value.account}
          onChange={handleAccount}
        />
      </div>
      <div style={{ padding: "5%" }}>
        password:
        <input
          style={{ marginLeft: 15 }}
          value={value.psw}
          type="password"
          onChange={handlePsw}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Submit onClick={handleSubmit}>submit</Submit>
        <span
          style={{
            flex: 3,
            color: "brown",
            opacity: status === "fail" ? 1 : 0,
          }}
        >
          Account Number Or Password is Wrong! Try Again!
        </span>
      </div>
    </>
  );
}
