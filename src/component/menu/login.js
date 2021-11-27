import { Submit } from "./styled";
import { useEffect, useState } from "react";
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
    let r = await axios.post(getApiUrl("handleLogin"), value);
    if (r.data === "login fail") {
      setStatus("fail");
    } else {
      setStatus("success");
    }
    setValue({ account: "", psw: "" });
  };
  useEffect(() => {
    (async function () {
      let r = axios.get(getApiUrl("checkLogIn"));
      r.then((r) => {
        if (r.data === "not authenticated") {
          setStatus("");
        }
        if (r.data === "authenticated") {
          setStatus("success");
        }
      });
    })();
  }, [setStatus]);
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
