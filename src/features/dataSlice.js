import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    artId: 10205,
    apiData: {},
}
const getAPIUrl = artId => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, { payload }) => {
            state.apiData = payload
        },

        clearData: () => {
            return initialState
        },
        inputId: (state, { payload }) => {
            state.artId = Number(payload)
        },
        nextId: (state) => {
            state.artId++
        },
        prevId: (state) => {
            state.artId--
        },
    }
})

export const { setData, clearData, inputId, nextId, prevId } = dataSlice.actions

//this is the thunk
export const fetchData = () => {
    const dataThunk = async (dispatch, getState) => {
        const stateData = getState();
        const { data } = stateData;
        const { artId } = data;
        const response = await fetch(getAPIUrl(artId))
        const json = await response.json();
        dispatch(setData(json))
    }
    return dataThunk
}

export default dataSlice.reducer