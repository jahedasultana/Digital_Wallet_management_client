import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTransactions: builder.query({
      query: () => ({
        url: "/transaction/me",
        method: "GET",
      }),
      providesTags: ["TRANSACTION", "WALLET", "USER"],
    }),

    getAgentTransactions: builder.query({
      query: () => ({
        url: "/transaction/agent/me",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),

    cashIn: builder.mutation({
      query: (data) => ({
        url: "/transaction/cash-in",
        method: "POST",
        data,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),

    cashOut: builder.mutation({
      query: (data) => ({
        url: "/transaction/cash-out",
        method: "POST",
        data,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),

    getAllTransactions: builder.query({
      query: () => ({
        url: "/transaction",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),

    getAdminTransactions: builder.query({
      query: () => ({
        url: "/transaction/admin",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const {
  useGetMyTransactionsQuery,
  useGetAgentTransactionsQuery,
  useCashInMutation,
  useCashOutMutation,
  useGetAllTransactionsQuery,
  useGetAdminTransactionsQuery,
} = transactionApi;
