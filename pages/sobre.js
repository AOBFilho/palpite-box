import React from 'react'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'

const Sobre = () => {
	return (
		<div>
			<PageTitle title="Sobre"></PageTitle>
			<div className="w-1/3 mx-auto justify-items-center p-8">
				<div className="bg-gray-100 text-center border-t border-b border-double border-gray-700 shadow-lg rounded">

					<span className="text-center font-serif italic">
						Nossa empresa visa atender nossos clientes da melhor
						forma, buscando sempre a melhor solução para o problema, com o menor custo e no menor
						tempo possível.</span>

				</div>
			</div>
		</div>
	)
}

export default Sobre