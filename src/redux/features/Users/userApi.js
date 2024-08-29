import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByToken: builder.query({
      query: () => {
        return {
          url: "/auth/session",
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    getAdminNotification: builder.query({
      query: ({ id, args }) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/notifications/${id}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["notification"],
    }),
    getUserStatus: builder.query({
      query: () => ({
        url: `/users/totals`,
      }),
      providesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/users",
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    upadateProfile: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserByTokenQuery,
  useGetAdminNotificationQuery,
  useGetUserStatusQuery,
  useGetAllUserQuery,
  useUpadateProfileMutation,
} = usersApi;
