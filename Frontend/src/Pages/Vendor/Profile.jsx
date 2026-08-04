import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-8 text-3xl font-bold text-slate-800 dark:text-slate-100">My Profile</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Full Name</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">{user?.fullName}</h3>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">{user?.email}</h3>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">{user?.roleName}</h3>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Organization</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">{user?.organizationName || "N/A"}</h3>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
            <h3 className={`mt-1 text-lg font-semibold ${user?.active ? "text-green-600" : "text-red-600"}`}>
              {user?.active ? "Active" : "Inactive"}
            </h3>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">User ID</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">{user?.userId}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
