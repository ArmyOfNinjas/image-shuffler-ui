import { createSlice } from '@reduxjs/toolkit';

export const filesSlice = createSlice({
    name: "files",
    initialState: {
        value: [],
    },
    reducers: {
        setSelectedFiles: (state, action) => {
            console.log("setting files:")
            console.log(action.payload)
            // var result = getFields(action.payload, "name")
            // console.log(result)
            // state.value = result;
            state.value = action.payload;
            // state.value = action.payload[0].name;
        },
    },
});

// function getFields(input, field) {
//     var output = [];
//     for (var i = 0; i < input.length; ++i)
//         output.push(input[i][field]);
//     return output;
// }

export const { setSelectedFiles } = filesSlice.actions;

export const selectFiles = (state) => state.files.value;

export default filesSlice.reducer;
