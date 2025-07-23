
import {api} from "~/trpc/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Popup from "reactjs-popup";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export default function UserForms() {
  const {data: allUsers, refetch} = api.signup.getUsers.useQuery();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })


  const router = useRouter();


  const addUserMutation = api.signup.register.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const deleteUserMutation = api.signup.deleteUser.useMutation({
    onSuccess: () => {
      void refetch();
    },
  })


  const handleAddUser = () => {
    addUserMutation.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    })
  }

  const handleDeleteUser = (user: User) => {
    if(confirm("Are you sure?")){
      deleteUserMutation.mutate(user)
    }

  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          onClick={() => {
            handleAddUser();
          }}
        >
          Add user
        </button>
      </form>
      <button onClick={() => router.push("/")}>GO BACK</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button
                  onClick={() => {handleDeleteUser(user as User);}}
                >
                  Delete
                </button>
              </td>
              <td>
                <Popup
                  trigger={<button>Edit</button>}
                  position={"top center"}>
                  <p>This functionality is unavalable now</p>
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}