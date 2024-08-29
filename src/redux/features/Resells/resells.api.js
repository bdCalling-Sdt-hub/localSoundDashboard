import { baseApi } from "../../api/baseApi";

const resellsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // postSubscription: builder.mutation({
    //   query: (data) => ({
    //     url: `/subscriptions`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["subscription"],
    // }),
    resellPriceUpdate: builder.mutation({
      query: ({ data, id }) => ({
        url: `/re-sells/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["resell"],
    }),
    getAllResells: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/re-sells",
          method: "GET",
          params,
        };
      },
      providesTags: ["resell"],
    }),
  }),
});

export const { useGetAllResellsQuery, useResellPriceUpdateMutation } = resellsApi;
