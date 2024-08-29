import { baseApi } from "../../api/baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalEaring: builder.query({
      query: () => ({
        url: `/payments/totals`,
      }),
      providesTags: ["earning"],
    }),
    getChartData: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/payments/chart",
          method: "GET",
          params,
        };
      },
      providesTags: ["earning"],
    }),
    getTransection: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/payments",
          method: "GET",
          params,
        };
      },
      providesTags: ["earning"],
    }),
    //   postLogin: builder.mutation({
    //     query: (data) => {
    //         console.log("aimannnnnnnnnnnnnnnnnn",data);
    //         return {
    //           url: `/auth/login`,
    //           method: 'POST',
    //           body: data,

    //       }
    //     },
    //     // invalidatesTags: ["Portfolio"],
    //   }),
  }),
});

export const { useGetTotalEaringQuery, useGetChartDataQuery, useGetTransectionQuery } = earningApi;
