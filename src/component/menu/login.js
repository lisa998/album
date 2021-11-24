import { Submit } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { changeAccount, changePsw, submit, selectValue } from "./loginSlice";

export default function Login() {
  const value = useSelector(selectValue);
  const dispatch = useDispatch();
  return (
    <>
      <h1 style={{ padding: "10% 5% 5%", margin: 0 }}>Login</h1>
      <div style={{ padding: "5%" }}>
        account number:
        <input
          style={{ marginLeft: 15 }}
          value={value.account}
          onChange={(e) => dispatch(changeAccount(e.target.value))}
        />
      </div>
      <div style={{ padding: "5%" }}>
        password:
        <input
          style={{ marginLeft: 15 }}
          value={value.psw}
          onChange={(e) => dispatch(changePsw(e.target.value))}
        />
      </div>
      <Submit
        onClick={() => {
          let r = dispatch(submit({ account: value.account, psw: value.psw }));
          r.then((c) => console.log(c.payload));
        }}
      >
        submit
      </Submit>
    </>
  );
}
