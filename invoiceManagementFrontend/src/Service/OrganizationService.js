import api from "./api";

export const createOrganization = async (organizationData) => {
  const response = await api.post("/api/organizations", organizationData);

  return response.data;
};

export const getAllOrganizations = async () => {
  const response = await api.get("/api/organizations");

  return response.data;
};

export const sendOnboarding = async (organizationId) => {
  const response = await api.post(
    `/api/organizations/${organizationId}/send-onboarding`,
  );

  return response.data;
};

export const activateOrganization = async (organizationId) => {
  return api.patch(`/api/organizations/${organizationId}/activate`);
};

export const deactivateOrganization = async (organizationId) => {
  return api.patch(`/api/organizations/${organizationId}/deactivate`);
};

export const getOrganizationById = async (organizationId) => {
  const response = await api.get(`/api/organizations/${organizationId}`);

  return response.data;
};
