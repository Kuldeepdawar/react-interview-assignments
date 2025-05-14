import useFetchUsers from "./useFetchUsers";

const UserList = () => {
  // Destructure data and states from the hook
  const { users, loading, error } = useFetchUsers();

  // Show loading message if API call is in progress
  if (loading) return <p>Loading users...</p>;

  // Show error message if any
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {/* Render list of users */}
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
