import {api} from "~/trpc/react";
import { useRouter } from "next/router";
import Popup from "reactjs-popup";
import { useState } from "react";
import LinkForm from "./LinkForm";

export type Link = {
  id: string;
  name: string | null;
  url: string;
  requireslogin: boolean;
}


export default function ShowLinks() {
  const{data: allLinks, refetch} = api.getLinks.getAllLinks.useQuery();
  const [editLink, setEditLink] = useState<Link | null>(null);
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  const deleteMutation = api.getLinks.deleteLink.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleDelete = (link: Link) => {
    if(confirm("Are you sure?")){
      deleteMutation.mutate({
        id: link.id,
        name: link.name ?? "",
        url: link.url ?? "",
        requireslogin: false,
      });
    }
  };

  const handleSuccess = () => {
    setEditLink(null);
    setShowForm(false);
    void refetch();
  }


  return(
    <div>
      <button onClick={() => setShowForm(true)}>Add Link</button>
      {showForm && (
        <Popup open={showForm} position="top center" onClose={() => setShowForm(false)}>
          <LinkForm onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
        </Popup>
      )}
      <button onClick={() => void router.push("/")}>GO BACK</button>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>URL</th>
            <th>Requires Login</th>
          </tr>
            {allLinks?.map((link) => (
              <tr key={link.id}>
                <td>{link.id}</td>
                <td>{link.name}</td>
                <td>{link.url}</td>
                <td>{link.requireslogin ? "TRUE" : "FALSE"}</td>
                <td><button onClick={() => handleDelete(link)}>Delete</button></td>
                <td><button onClick={() => setEditLink(link)}>Edit</button></td>
              </tr>
            ))}
        </tbody>
      </table>


      {editLink && (
        <Popup open={!!editLink} position="top center" onClose={() => setEditLink(null)}>
          <LinkForm
            link={editLink}
            onSuccess={handleSuccess}
            onCancel={() => setEditLink(null)}
          />
        </Popup>
      )}
    </div>
  );
}