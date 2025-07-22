import { useState } from "react";
import {api} from "~/trpc/react";
import type { Link } from "./ShowLinks";

interface LinkFormProps {
  link?: Link;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function LinkForm({ link, onSuccess, onCancel }: Readonly<LinkFormProps>) {
  const [formData, setFormData] = useState({
    name: link?.name ?? "",
    url: link?.url ?? "",
    requireslogin: false,
  });

  const addLinkMutation = api.getLinks.addLink.useMutation({
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const updateLinkMutation = api.getLinks.updateLink.useMutation({
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (link) {
      updateLinkMutation.mutate({
        id: link.id,
        ...formData,
      });
    } else {
      addLinkMutation.mutate(formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Link"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={formData.requireslogin}
            onChange={(e) => setFormData({ ...formData, requireslogin: e.target.checked })}
          />Requires Login?
        </label>
        <button onClick={handleSubmit}>{link ? "Update" : "Add"}</button>
        {onCancel && <button onClick={onCancel}>Cancel</button>}
      </form>
    </div>
  );
}