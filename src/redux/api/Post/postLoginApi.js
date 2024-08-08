import { baseApi } from "../baseApi";



const postLoginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      postLogin: builder.mutation({
        query: (data) => {
            console.log("aimannnnnnnnnnnnnnnnnn",data);
            return {
              url: `/auth/login`,
              method: 'POST',
              body: data,
            
          } 
        },
        // invalidatesTags: ["Portfolio"],
      }),
    }),
   
  });
  
  export const { usePostLoginMutation } = postLoginApi;