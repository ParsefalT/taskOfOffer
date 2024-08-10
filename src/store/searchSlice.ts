import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface SearchState {
  text: string
  welcome: boolean
}

// Define the initial state using that type
const initialState: SearchState = {
  text: '',
  welcome: true
}

export const searchSlice = createSlice({
  name: 'searchText',
  initialState,
  reducers: {
    // редурсер для установки текста для инпута, переиспользуется для поиска 
    setText: (state, actions:PayloadAction<string | undefined>) => {
      if(actions.payload == undefined) {
        state.text = ''
      } else {
        state.welcome = false
        state.text = actions.payload
      }
    },
  },
})

export const { setText } = searchSlice.actions
export const {text, welcome} = searchSlice.getInitialState()

export const selectSearch = (state: any) => state.text.value

export default searchSlice.reducer