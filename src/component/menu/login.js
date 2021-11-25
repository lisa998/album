import { Submit } from "./styled";
import { useState } from "react";
import axios from "axios";

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
    let r = await axios.post("http://localhost:3001/handleLogin", value);
    console.log(r.data);
    if (r.data === "login fail") {
      setStatus("fail");
    } else {
      setStatus("success");
    }
    setValue({ account: "", psw: "" });
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
