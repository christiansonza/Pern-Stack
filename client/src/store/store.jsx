import {configureStore} from '@reduxjs/toolkit'
import {userApi} from '../slice/userSlice'

const store = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer
    },
    middleware:(gdm)=>gdm().concat(userApi.middleware)
})

export default store