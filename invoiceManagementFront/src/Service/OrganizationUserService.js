import api from "./api";

/*
=========================================
Get All Users of My Organization
GET /api/user/my-organization
=========================================
*/

export const getMyOrganizationUsers = async () => {
  const response = await api.get("/api/user/my-organization");

  return response.data;
};

/*
=========================================
Create User
POST /api/user/organization-user
=========================================
*/

export const createOrganizationUser = async (userData) => {
  const response = await api.post("/api/user/organization-user", userData);

  return response.data;
};

/*
=========================================
Activate User
PATCH
=========================================
*/

export const activateUser = async (userId) => {
  const response = await api.patch(`/api/user/${userId}/activate`);

  return response.data;
};

/*
=========================================
Deactivate User
PATCH
=========================================
*/

export const deactivateUser = async (userId) => {
  const response = await api.patch(`/api/user/${userId}/deactivate`);

  return response.data;
};

/*
=========================================
Get User By Id
=========================================
*/

export const getUserById = async (userId) => {
  const response = await api.get(`/api/user/${userId}`);

  return response.data;
};

/*
=========================================
Update User
=========================================
*/

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/api/user/${userId}`, userData);

  return response.data;
};
