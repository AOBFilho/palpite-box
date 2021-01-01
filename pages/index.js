import React from 'react'
import ReactLoading from "react-loading";
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from '../components/PageTitle'

const fetcher = (...args) => fetch(...args).then(response => response.json())

const Index = () => {
	const { data, error } = useSWR('/api/get-promo', fetcher)
	return (
		<div>
			<PageTitle title="Bem Vindo"></PageTitle>
			<p className="text-center font-bold text-base mt-12">
				Estamos sempre buscando atender melhor nossos clientes. <br />
				Por isso, estamos sempre abertos a ouvir a sua opinião.
			</p>
			<div className="text-center p-12">
				<Link href="/pesquisa">
					<a className="shadow-lg bg-blue-300 py-4 px-12 font-bold text-sm rounded-lg hover:shadow">
						Dar opinião ou sugestão
					</a>
				</Link>
			</div>
			<div className="grid justify-items-center text-base p-8">
				{!data && <ReactLoading type="spinningBubbles" color="#adb5bd"></ReactLoading>}
				{!error && data && data.showCoupon && <p className="max-w-sm font-bold text-center">{data.messageCoupom}</p>}
			</div>
		</div>
	)
}

export default Index