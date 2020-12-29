import React from 'react'
import Style from './style.module.css'
import Link from 'next/link'

const Header = () => {
	return (
		<div>
			<div className={Style.wrapper}>
				<div className="container mx-auto">
					<Link href="/">
						<a><img className="mx-auto" src="/logo_palpitebox.png" alt="PalpiteBox"></img></a>
					</Link>
				</div>
			</div>
			<div className={Style.wrapper + " shadow-inner text-center font-bold"}>
				<Link href="/sobre">
					<a className="p-2 hover:underline">Sobre</a>
				</Link>
				<Link href="/pesquisa">
					<a className="p-2 hover:underline">Pesquisa</a>
				</Link>
				<Link href="/contato">
					<a className="p-2 hover:underline">Contato</a>
				</Link>
			</div>
		</div>
	)
}

export default Header