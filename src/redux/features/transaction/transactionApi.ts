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
      query: ({
        page = 1,
        limit = 10,
        search,
        type,
        status,
      }: {
        page?: number;
        limit?: number;
        search?: string;
        type?: string;
        status?: string;
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (type) params.append("type", type);
        if (status) params.append("status", status);

        return {
          url: `/transaction?${params.toString()}`,
          method: "GET",
        };
      },
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
