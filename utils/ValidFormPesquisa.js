
const validEmailRegex =
	RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validTelefoneRegex =
	RegExp(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/)

class ValidationException extends Error {
	constructor(validations) {
		super('')
		this.name = 'ValidationException'
		this.validations = validations
	}
}

class ValidationFieldException extends Error {
	constructor(message) {
		super('')
		this.name = 'ValidationException'
		this.message = message
	}
}
class Errors {
	constructor() {
		this.NomeObrigatorio = ''
		this.EmailObrigatorio = ''
		this.WhatsappObrigatorio = ''
		this.NotaObrigatorio = ''
	}

	hasError() {
		return this.NomeObrigatorio.length > 0 ||
			this.EmailObrigatorio.length > 0 ||
			this.WhatsappObrigatorio.length > 0 ||
			this.NotaObrigatorio.length > 0
	}
}

class ValidFormPesquisa {
	constructor() { }

	validarTudo(form) {
		const errors = new Errors()
		if (form.Nome.trim() === '') {
			errors.NomeObrigatorio = 'Nome dever ser preenchido!'
		}
		if (!validEmailRegex.test(form.Email)) {
			errors.EmailObrigatorio = 'Email inválido!'
		}
		if (!validTelefoneRegex.test(form.Whatsapp)) {
			errors.WhatsappObrigatorio = 'Whatsapp inválido!'
		}
		if (form.Nota === -1) {
			errors.NotaObrigatorio = 'Nota deve ser informada!'
		}

		if (errors.hasError()) {
			throw new ValidationException(errors)
		}
	}

	validar(field, value) {
		switch (field) {
			case 'Nome':
				if (value.trim() === '') {
					throw new ValidationFieldException('Nome dever ser preenchido!')
				}
				break
			case 'Email':
				if (!validEmailRegex.test(value)) {
					throw new ValidationFieldException('Email inválido!')
				}
				break
			case 'Whatsapp':
				if (!validTelefoneRegex.test(value)) {
					throw new ValidationFieldException('Whatsapp inválido!')
				}
				break
			case 'Nota':
				if (value === -1) {
					throw new ValidationFieldException('Nota deve ser informada!')
				}
				break
			default:
				break;
		}
	}
}

export { ValidFormPesquisa, ValidationException, Errors }