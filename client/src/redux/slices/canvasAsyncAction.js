import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const canvasAsyncUndo = createAsyncThunk(
    'canvas/undo',
    async (id,canvas, thunkAPI) => {
        console.log(1)
        const dataUrl = canvas
        console.log(2)
        let img = new Image();
        img.src = dataUrl;
        
        console.log(dataUrl)
        await axios.post(`http://localhost:5000/image?id=${id}`, {
            img: dataUrl
        })
        const response = await axios.get(`http://localhost:5000/image?id=${id}`)
        return response.data
    }
)

