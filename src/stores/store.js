import { configureStore } from '@reduxjs/toolkit'
import { dataSlice } from '../features/dataSlice'
import { logger } from '../features/middleware'


export const store = configureStore({
    reducer: {
        data: dataSlice.reducer, 
        
    },
    middleware: [
        logger
    ]
})