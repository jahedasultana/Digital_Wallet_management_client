import { baseApi } from "@/redux/baseApi";
import { type ApiResponse, type UserStats } from "@/types";


export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query<ApiResponse<UserStats>, void>({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getAgentStats: builder.query({
      query: () => ({
        url: "/stats/agent",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getAdminStats: builder.query({
      query: () => ({
        url: "/stats/admin",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetAgentStatsQuery,
  useGetAdminStatsQuery,
} = statsApi;
