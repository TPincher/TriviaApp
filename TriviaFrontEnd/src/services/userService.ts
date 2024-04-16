export interface User {
  id?: number;
  name: string;
}

export const getAllUsers = async () => {
  const response = await fetch("http://localhost:8080/users");
  if (!response.ok) {
    throw new Error("failed to load users");
  }
  const allUsers = await response.json();
  console.log(allUsers);
  return allUsers;
};

export const addUser = async (userData: User) => {
  const response = await fetch("http://localhost:8080/users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to add user");
  }
  return response.json();
};
