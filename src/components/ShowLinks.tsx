import {api} from "~/trpc/react";
import { useRouter } from "next/router";

export default function ShowLinks() {
  const{data: allLinks} = api.getLinks.getAllLinks.useQuery();

  const router = useRouter();

  const deleteMutation = api.getLinks.deleteLink.useMutation({
    onSuccess: () => {
      void router.push("/admin-space");
    },
    onError: () => {
      alert("An error occurred. Please try again.");
    }
  });


  const handleDelete = (link_id: string) => {
    alert("Are you sure?");

    deleteMutation.mutate({
      id: link_id,
    });

    void router.push("/admin-space");
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
              onClick={() => handleDelete(link.id)}
            >Delete</button> | <button>Edit</button>
          </li>
      ))}
      </ul>
    </div>
  )
}