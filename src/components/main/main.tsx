import { useState } from 'react'
import CustomTable from '../table/table'
import st from './main.module.sass'
import { useGetRepositoryDetailsQuery } from '../../api/api'
import { useAppSelector } from '../../store/store'

const Main = () => {
	// хук состояния айди для выборки активной строки
	const [id, setId] = useState<number>()
	// хук ртк для получения развернутой информации выбранного репазитория
	const { data } = useGetRepositoryDetailsQuery(Number(id))
	// хук начального состояния приложения
	const welcome = useAppSelector(state => state.searchText.welcome)
	return (
		<>
			{welcome ? (
				<h2 className={st.center}>Welcome to the club body</h2>
			) : (
				<main className={st.main}>
					<section className={st.main__content}>
						<h1 className={st.main__title}>Result of search</h1>
						<CustomTable setId={setId} id={id} />
					</section>

					<section className={st.main__sidebar}>
						{!data ? (
							<h2
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
									margin: 0,
									height: '100%',
									color: '#4F4F4F'
								}}
							>
								Choice repository
							</h2>
						) : (
							<>
								<h2>Name of repo: {data.name.toUpperCase()}</h2>
								<p>
									<strong>Description:</strong> {data.description}
								</p>
								<div className={st.main__wrapper}>
									<h3 className={st.main__language}>
										{data.language ? data.language.toUpperCase() : 'empty'}
									</h3>
									<div className={st.main__rating}>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z"
												fill="#FFB400"
											/>
										</svg>

										<span className={st.main__starCount}>
											{data.stargazers_count}
										</span>
									</div>
								</div>
								<div className={st.tags}>
									{data.topics.map(tag => (
										<span key={tag} className={st.tags__tag}>
											{tag}
										</span>
									))}
								</div>
								<span>
									{data?.license ? data.license.name : "don't have license"}
								</span>
							</>
						)}
					</section>
				</main>
			)}
		</>
	)
}

export default Main

{
	/* <h2 className={st.center}>Welcome to the club body</h2> */
}
