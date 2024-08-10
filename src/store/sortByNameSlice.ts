import { createSlice } from '@reduxjs/toolkit'
// интерфейс - объект для сортировки
interface ISortByName {
	countForks: boolean
	countStars: boolean
	date: boolean
}

const initialState: ISortByName = {
	countForks: false,
	countStars: false,
	date: false
}

export const sortByNameSlice = createSlice({
	name:'sortByName',
	initialState,
	reducers: {
		sortForks: ((state) => {
			return { ...state, countForks: !state.countForks }
		}),
		sortStars: ((state) => {
			return { ...state, countStars: !state.countStars }
		}),
		sortDate: ((state) => {
			return { ...state, date: !state.date }
		}),

	}
})

export const {sortForks, sortDate, sortStars} = sortByNameSlice.actions
export default sortByNameSlice.reducer