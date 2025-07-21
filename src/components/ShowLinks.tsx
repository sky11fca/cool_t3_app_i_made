import {api} from "~/trpc/react";
import { useRouter } from "next/router";
import Popup from "reactjs-popup";
import { useState } from "react";

type Link = {
  id: string;
  name: string | null;
  url: string;
  requireslogin: boolean;
}


export default function ShowLinks() {
  const{data: allLinks} = api.getLinks.getAllLinks.useQuery();
  const [popupData, setPopupData] = useState({
    name: "",
    url: "",
    requireslogin: false,
  });

  const [truth, setTruth] = useState("false");
  const router = useRouter();

  const deleteMutation = api.getLinks.deleteLink.useMutation({
    onSuccess: () => {
      void router.push("/admin-space");
    },
    onError: () => {
      alert("An error occurred. Please try again.");
    }
  });

  const updateMutation = api.getLinks.updateLink.useMutation({
    onSuccess: () => {
      void router.push("/admin-space");
    },
    onError: () => {
      alert("An error occurred. Please try again.");
    }
  })


  const handleDelete = (link: Link) => {
    alert("Are you sure?");

    deleteMutation.mutate({
      id: link.id,
    });

  };

  const handleUpdate = (link: Link) => {
    console.log(link);
    console.log(popupData);
    console.log(truth);

    updateMutation.mutate({
      id: link.id,
      name: popupData.name,
      url: popupData.url,
      requireslogin: truth == "true",
    })

  }

  return(
    <div>
      <p>Show Links</p>
      <ul>
      {allLinks?.map((link) => (
          <li key={link.id}>
            {link.id} |
            {link.name} |
            {link.url} |
            {link.requireslogin ? "TRUE" : "FALSE"} |
            <button
              onClick={() => handleDelete(link)}
            >Delete</button> |
            <Popup
            trigger={<button>Edit</button>}
            position="top center">
              <form method="POST">
                <input
                  type="text"
                  placeholder="Name"
                  value={link.name!}
                  onChange={(e) => setPopupData({...popupData, name: e!==null ? e.target.value : link.name!})}
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => setPopupData({...popupData, url: e!==null? e.target.value : link.url})}
                />
                <select
                  value={truth}
                  onChange={(e) => setTruth(e.target.value)}
                >
                  <option value="true">ONLINE</option>
                  <option value="false">OFFLINE</option>
                </select>

                <button
                onClick={() => handleUpdate(link)}>
                    Modify
                </button>

              </form>
            </Popup>
          </li>
      ))}
      </ul>
    </div>
  )
}