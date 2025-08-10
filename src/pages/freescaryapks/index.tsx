import NavBar from "~/components/freescaryapks/NavBar";
import { useState } from "react";

export default function FreescaryApks() {
  const [value, setValue] = useState("home");
  return(
    <div>
      <NavBar
        value={value}
        onValueChange={setValue}
      />
    </div>
  )
}