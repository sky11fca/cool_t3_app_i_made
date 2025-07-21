import { useState } from "react";
import {api} from "~/trpc/react";
import { useRouter } from "next/router";

export default function LinkForm() {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    requireslogin: false,
  })
  const [truth, setTruth] = useState("false");
  const router = useRouter();

  const addLinkMutation = api.getLinks.addLink.useMutation({
    onSuccess: () => {

      setFormData({
        name: "",
        url: "",
        requireslogin: false,
      })
      setTruth("");
      void router.push("/admin-space");
    },
    onError: () => {
      alert("An error occurred. Please try again.");
    }
  });


  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
    console.log(truth);

    addLinkMutation.mutate({
      name: formData.name,
      url: formData.url,
      requireslogin: truth == "true",
    });
    alert("Link added successfully");
  }
  
  
  return(
    <div>
      <form>
        <input
          type="text"
          placeholder="Link"
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <select
          value={truth}
          onChange={(e) => setTruth(e.target.value)}
        >
          <option value="true">ONLINE</option>
          <option value="false">OFFLINE</option>
        </select>
        <button
          onClick={handleSubmit}
        >Add</button>
      </form>
    </div>
  )
}