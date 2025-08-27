import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWalletMe: builder.query({
      query: () => ({
        url: "/wallet/me",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),

    getAgentWalletMe: builder.query({
      query: () => ({
        url: "/wallet/agent/me",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),

    topUpWallet: builder.mutation({
      query: (data) => ({
        url: "/wallet/top-up",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["WALLET"],
    }),

    withdrawWallet: builder.mutation({
      query: (data) => ({
        url: "/wallet/withdraw",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["WALLET"],
    }),

    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/wallet/send",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["WALLET"],
    }),

    getAllWallets: builder.query({
      query: () => ({
        url: "/wallet",
        method: "GET",
      }),
      providesTags: ["WALLET", "USER"],
    }),

    getAdminWalletStats: builder.query({
      query: () => ({
        url: "/wallet/admin/stats",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
  }),
});

export const {
  useGetWalletMeQuery,
  useGetAgentWalletMeQuery,
  useTopUpWalletMutation,
  useWithdrawWalletMutation,
  useSendMoneyMutation,
  useGetAllWalletsQuery,
  useGetAdminWalletStatsQuery,
} = walletApi;
