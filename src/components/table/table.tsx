import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TablePagination } from '@mui/material'
import st from './table.module.sass'
import { useGetRepositoriesQuery } from '../../api/api'
import { useState } from 'react'
import { useAppSelector } from '../../store/store'

const CustomTable = ({
	id,
	setId
}: {
	id?: number
	setId: (id: number) => void
}) => {
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5)
	const [filtersByName, setFiltersByName] = useState({
		countForks: false,
		countStars: false,
		date: false
	})
	const text = useAppSelector(state => state.searchText.text)
	const { data, error, isLoading } = useGetRepositoriesQuery({
		page,
		sort: '',
		direction: ''
	})

	const sortForks = () => {
		setFiltersByName((prev) => {
			return {...prev, countForks: !prev.countForks }
		})
	}
	const sortStars = () => {
		setFiltersByName((prev) => {
			return {...prev, countStars: !prev.countStars }
		})
	}
	const sortDate = () => {
		setFiltersByName((prev) => {
			return {...prev, date: !prev.date }
		})
	}

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value))
	}

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (error) {
		return <div>Error</div>
	}
	return (
		<div className={st.table}>
			<TableContainer component={Paper} style={{ maxHeight: '470px' }}>
				<Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell
								className={st.table__row}
								style={{ fontWeight: 'bold' }}
							>
								<svg
									width="14"
									height="14"
									viewBox="0 0 14 14"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className={st.table__svg}
								>
									<path
										d="M0.333344 7.00001L1.50834 8.17501L6.16668 3.52501V13.6667H7.83334V3.52501L12.4833 8.18334L13.6667 7.00001L7.00001 0.333344L0.333344 7.00001Z"
										fill="black"
										fillOpacity="0.56"
									/>
								</svg>
								Name
							</TableCell>
							<TableCell style={{ fontWeight: 'bold' }} align="left">
								Language
							</TableCell>
							<TableCell style={{ fontWeight: 'bold' }} align="left">
								<button className={st.table__sortBtn} onClick={sortForks}>Count forks</button>
							</TableCell>
							<TableCell style={{ fontWeight: 'bold' }} align="left">
								<button className={st.table__sortBtn} onClick={sortStars}>Count stars</button>
							</TableCell>
							<TableCell style={{ fontWeight: 'bold' }} align="left">
								<button className={st.table__sortBtn} onClick={sortDate}>Data of update</button>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.items
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.filter(item =>
								text == ''
									? item
									: item.name.toLowerCase().includes(text.toLowerCase())
							)
							.sort((a, b) =>
								filtersByName.countForks
									? b.forks_count - a.forks_count
									: filtersByName.countStars
									? a.stargazers_count - b.stargazers_count
									: filtersByName.date
									? new Date(b.updated_at).getDate() -
									  new Date(a.updated_at).getDate()
									: 0
							)
							.map(item => (
								<TableRow
									className={id == item.id ? st.table__target : ''}
									key={item.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										<button
											aria-valuetext="button of current repository"
											className={st.table__btn}
											onClick={() => setId(item.id)}
										>
											{item.name}
										</button>
									</TableCell>
									<TableCell align="left">{item.language}</TableCell>
									<TableCell align="left">{item.forks_count}</TableCell>
									<TableCell align="left">{item.stargazers_count}</TableCell>
									<TableCell align="left">
										{new Date(item.updated_at).toLocaleDateString('ru-Ru')}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				className={st.table__pagination}
				rowsPerPageOptions={[5, 10]}
				component="div"
				count={data!.items.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	)
}
export default CustomTable
