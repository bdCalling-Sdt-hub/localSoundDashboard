import { baseApi } from "../../api/baseApi";

const withdrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWithdrawRequest: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/withdrawals",
          method: "GET",
          params,
        };
      },
      providesTags: ["withdraw"],
    }),
    updateWithdrawStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/withdrawals/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["withdraw"],
    }),
  }),
});

export const {
  useGetAllWithdrawRequestQuery,
  useUpdateWithdrawStatusMutation,
} = withdrawApi;
