import Menu from "./menu";
import SwitchMenu from "./switchMenu";
import { useState } from "react";

export default function MenuAndBtn() {
  const [openMenu, setOpenMenu] = useState(0);
  const [status, setStatus] = useState("");
  return (
    <>
      <Menu
        open={openMenu}
        setOpenMenu={setOpenMenu}
        status={status}
        setStatus={setStatus}
      />
      <SwitchMenu
        setOpenMenu={setOpenMenu}
        open={openMenu}
        setStatus={setStatus}
      />
    </>
  );
}
