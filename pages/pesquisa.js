import React, { useState } from 'react'
import ReactLoading from "react-loading";
import { ValidFormPesquisa, Errors } from '../utils/ValidFormPesquisa'
import PageTitle from '../components/PageTitle'

const Pesquisa = () => {
	const [form, setForm] = useState({
		Nome: '',
		Email: '',
		Whatsapp: '',
		CriticaSugestao: '',
		Nota: -1
	})

	const [sucess, setSucess] = useState()
	const [errorMessage, setErrorMessage] = useState(new Errors())
	const [processing, setProcessing] = useState(false)

	const notas = [0, 1, 2, 3, 4, 5]
	const validator = new ValidFormPesquisa()

	const onChange = evento => {
		const { value, name: key } = evento.target
		if (key != 'CriticaSugestao') {
			let messageError = ''
			try {
				validator.validar(key, value)
			} catch (error) {
				messageError = error.message
			}

			setErrorMessage(old => ({
				...old,
				[key + 'Obrigatorio']: messageError
			}))
		}
		setForm(old => ({
			...old,
			[key]: value
		}))
	}

	const save = async () => {
		try {
			setProcessing(true)

			const response = await fetch('/api/save', {
				method: 'POST',
				body: JSON.stringify(form),
				headers: { 'Content-Type': 'application/json' }
			})
			const data = await response.json();

			if (data.error) {
				setErrorMessage(data.error)
			} else {
				setErrorMessage(new Errors())
				setSucess(data.coupon)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setProcessing(false)
		}
	}

	const Input = (name, value, label) => {
		let inputType
		switch (name) {
			case 'Email':
				inputType = 'email'
				break;
			case 'Whatsapp':
				inputType = 'tel'
				break;

			default:
				inputType = 'text'
				break;
		}
		return (
			<div>
				<label className="font-bold">{label}</label>

				{name == "Nome" && errorMessage && errorMessage.NomeObrigatorio.length > 0 &&
					<p className="italic text-red-500">{"*** " + errorMessage.NomeObrigatorio}</p>}

				{name == "Email" && errorMessage && errorMessage.EmailObrigatorio.length > 0 &&
					<p className="italic text-red-500">{"*** " + errorMessage.EmailObrigatorio}</p>}

				{name == "Whatsapp" && errorMessage && errorMessage.WhatsappObrigatorio.length > 0 &&
					<p className="italic text-red-500">{"*** " + errorMessage.WhatsappObrigatorio}</p>}

				<input
					name={name}
					value={value}
					type={inputType}
					className="mt-2 mb-2 p-2 h-10 w-full bg-blue-50 rounded shadow"
					id={name}
					onChange={onChange}>
				</input >
			</div>
		)
	}

	const Nota = () => {
		return (
			<div>
				<label className="font-bold pl-1">Nota:</label>

				{errorMessage && errorMessage.NotaObrigatorio.length > 0 &&
					<p className="italic text-red-500">{"*** " + errorMessage.NotaObrigatorio}</p>}

				<div className="p-2 flex text-center">
					{
						notas.map(nota => (
							<div className="block w-1/5 mx-auto" key={"Nota" + nota} >
								<label>{nota}</label>
								<br />
								<input type="radio" value={nota} name="Nota" onChange={onChange}></input>
							</div>
						))
					}
				</div>
			</div >
		)
	}

	return (
		<div className="pt-6">
			<PageTitle title="Pesquisa"></PageTitle>
			<h1 className="text-center font-bold">
				Críticas e sugestões
			</h1>
			<p className="text-center font-bold pt-6">
				Estamos sempre buscando atender melhor nossos clientes. <br />
				Por isso, estamos sempre abertos a ouvir a sua opinião.
			</p>
			{
				!sucess &&
				<div className="block w-3/4 lg:w-2/4 xl:w-1/4 mx-auto pt-2 p-6">
					{Input("Nome", form.Nome, "Seu nome:")}
					{Input("Email", form.Email, "E-mail:")}
					{Input("Whatsapp", form.Whatsapp, "Whatsapp:")}
					{Input("CriticaSugestao", form.CriticaSugestao, "Sua crítica ou sugestão:")}
					{Nota()}
					<div className="shadow-lg w-full bg-blue-300 py-4 rounded-lg hover:shadow grid justify-items-center">
						{processing && <ReactLoading type="spokes" color="#fff" height="13%" width="13%" />}
						{!processing && <button className="font-bold w-full h-full text-lg text-center" onClick={save}>Enviar</button>}
					</div>
				</div>
			}
			{
				sucess && sucess.showCoupon
				&&
				<div className="w-1/4 mx-auto text-center p-4">
					<div>
						<p className="bg-blue-200 border-t border-b border-blue-700 p-6 text-blue-700">
							Muito obrigado pela sua sugestão ou crítica!
						</p>
					</div>
					<div className="mt-6 p-4 border rounded">
						<p>Seu cupom</p>
						<span className="font-bold text-2xl">{sucess.code}</span>
					</div>
					<div className="mt-6 p-4 border rounded">
						<p className="font-bold">{sucess.promo}</p>
					</div>
					<p className="mt-6 italic">***Por favor tire um print ou uma foto desta tela e apresente ao atendente.</p>
				</div>
			}
		</div >
	)
}

export default Pesquisa