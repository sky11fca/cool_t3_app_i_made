
import {api} from "~/trpc/react";
import { useRouter } from "next/router";

export default function UserForms() {
  const {data: allUsers} = api.signup.getUsers.useQuery();


  const router = useRouter();


  return (
    <div>
      <button>Add user</button>
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
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}