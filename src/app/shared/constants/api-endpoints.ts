export const ApiEndpoints = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    UPDATE_USER: (id: number) => `/auth/update/${id}`,
  },
};
