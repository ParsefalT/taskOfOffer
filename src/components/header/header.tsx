import { useEffect, useState } from 'react'
import { setText } from '../../store/searchSlice'
import { useAppDispatch } from '../../store/store'
import st from './header.module.sass'
import Button from '@mui/material/Button'
const Header = () => {
	// хук для контролирования инпута
	const [changeText, setChangeText] = useState<string>("")
	// функиця для вызова редурсера редакса
	const dispatch = useAppDispatch()

	// хук для сброса значения текста 
	useEffect(() => {
    if (changeText === "") {
      dispatch(setText())
    }
  }, [changeText, dispatch])

	return (
		<header className={st.header}>
			<input
				className={st.searchInput}
				type="text"
				placeholder="type your query"
				value={changeText}
				onChange={e => setChangeText(e.target.value)}
			/>
			<Button onClick={() => dispatch(setText(changeText))} className={st.btn} variant="contained">
				Search
			</Button>
		</header>
	)
}

export default Header
