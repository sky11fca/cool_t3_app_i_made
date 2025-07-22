import ShowLinks from "~/components/ShowLinks";
import { useState } from "react";
import UserForms from "~/components/UserForms";


export default function AdminSpace() {
  const [category, setCategory] = useState("links")

  return(
        <div>
            <div>
              <button onClick={() => setCategory("links")}>Generated Links</button>
              <button onClick={() => setCategory("users")}>Users</button>
            </div>
          {category === "links" ? (<ShowLinks/>) : (<UserForms/>)}
        </div>
    )
}