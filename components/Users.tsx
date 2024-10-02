import { User } from "@models/user";
import React from "react";
interface UsersInterface {
  users: User[];
}
function Users({ users }: UsersInterface) {
  return (
    <div>
      {users.map((user, index) => (
        <div key={index} className="flex justify-between">
          <h1>{user.email}</h1>
          <h2>{user?.isAdmin ? "Admin" : "User"}</h2>
        </div>
      ))}
    </div>
  );
}

export default Users;
