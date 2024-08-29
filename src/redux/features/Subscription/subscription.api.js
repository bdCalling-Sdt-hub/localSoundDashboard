import { baseApi } from "../../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postSubscription: builder.mutation({
      query: (data) => ({
        url: `/subscriptions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),
    updateSubscription: builder.mutation({
      query: ({ id, body }) => ({
        url: `/subscriptions/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["subscription"],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subscription"],
    }),
    getAllSubscription: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/subscriptions",
          method: "GET",
          params,
        };
      },
      providesTags: ["subscription"],
    }),
    getSingleSubscription: builder.query({
      query: (id) => {
        return {
          url: `/subscriptions/${id}`,
          method: "GET",
        };
      },
      providesTags: ["subscription"],
    }),
  }),
});

export const {
  useGetAllSubscriptionQuery,
  useGetSingleSubscriptionQuery,
  usePostSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
