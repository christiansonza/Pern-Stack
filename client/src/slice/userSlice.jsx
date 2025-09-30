import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:4000',credentials:'include'}),
    tagTypes:['users'],
    endpoints:(builder)=>({
        fetchUser:builder.query({
            query:()=>({
                url:'/users/getUser',
                method:'GET'
            }),
            providesTags:['users']
        }),
        postUser:builder.mutation({
            query:(newUser)=>({
                url:'/users/postUser',
                method:'POST',
                body:newUser
            }),
            invalidatesTags:['users']
        }),
        updateUser:builder.mutation({
            query:({id,...update})=>({
                url:`/users/putUser/${id}`,
                method:'PUT',
                body:update
            }),
            invalidatesTags:['users']
        }),
        destroyUser:builder.mutation({
            query:(id)=>({
                url:`/users/deleteUser/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['users']
        }),
        getUser:builder.query({
            query: (id) => `/users/getUserId/${id}`, 
            providesTags: ['users']
        }),

    })
})

export const {
    useFetchUserQuery,
    usePostUserMutation,
    useUpdateUserMutation,
    useDestroyUserMutation,
    useGetUserQuery   
} = userApi