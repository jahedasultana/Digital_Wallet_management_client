import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -----------------------------
    // Register a new user
    // -----------------------------
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
      invalidatesTags: ["USER"],
    }),

    // -----------------------------
    // Get logged-in user info
    // -----------------------------
    getUserInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // -----------------------------
    // Update logged-in user info
    // -----------------------------
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: "/user/me",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    // -----------------------------
    // Get all users (Admin)
    // -----------------------------
    getAllUsers: builder.query({
      query: ({
        page = 1,
        limit = 10,
        role,
      }: {
        page?: number;
        limit?: number;
        role?: string;
      }) => ({
        url: "/user",
        method: "GET",
        params: {
          page,
          limit,
          ...(role ? { role } : {}), // add role filter if provided
        },
      }),
      providesTags: ["USER"],
    }),

    // -----------------------------
    // Get single user by ID (Admin)
    // -----------------------------
    getUserById: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "USER", id }],
    }),

    // -----------------------------
    // Delete user by ID (Admin)
    // -----------------------------
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
    // -----------------------------
    // Update user by ID (Admin)
    // -----------------------------
    updateUserById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`, // admin-only endpoint
        method: "PATCH",
        data,
      }),
      invalidatesTags: ({ id }) => [{ type: "USER", id }],
    }),

    // -----------------------------
    // Block user wallet (Admin)
    // -----------------------------
    blockUserWallet: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    // -----------------------------
    // Unblock user wallet (Admin)
    // -----------------------------
    unblockUserWallet: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}/unblock`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    // -----------------------------
    // Approve agent (Admin)
    // -----------------------------
    approveAgent: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    // -----------------------------
    // Suspend agent (Admin)
    // -----------------------------
    suspendAgent: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

// -----------------------------
// Export Hooks
// -----------------------------
export const {
  useRegisterMutation,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUpdateUserByIdMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useBlockUserWalletMutation,
  useUnblockUserWalletMutation,
  useApproveAgentMutation,
  useSuspendAgentMutation,
} = userApi;
