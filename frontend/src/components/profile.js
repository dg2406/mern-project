import { useAuth } from "../context/auth";
const Profile = () => {
  const [auth] = useAuth();

  return (
    <div >
      <h3 className="mb-4">User Profile</h3>

      <div className="mb-3">
        <strong>Name:</strong>
        <p className="mb-0">{auth?.user?.name}</p>
      </div>

      <div className="mb-3">
        <strong>Email:</strong>
        <p className="mb-0">{auth?.user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
