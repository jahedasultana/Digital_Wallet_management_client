import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => {
        const formData = new FormData();
        Object.entries(userInfo).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formData.append(key, value as any);
          }
        });
        return {
          url: "/user/register",
          method: "POST",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        };
      },
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: "/user/me",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = userApi;
