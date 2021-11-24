import Menu from "./menu";
import SwitchMenu from "./switchMenu";
import { useState } from "react";

export default function MenuAndBtn() {
  const [openMenu, setOpenMenu] = useState(0);
  return (
    <>
      <Menu open={openMenu} />
      <SwitchMenu setOpenMenu={setOpenMenu} open={openMenu} />
    </>
  );
}
