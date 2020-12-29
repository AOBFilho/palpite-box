import { getSheetConfig, newRowInSheetResult } from '../../services/LoadGoogleSheetService'
import { ValidFormPesquisa, ValidationException } from '../../utils/ValidFormPesquisa'
import moment from 'moment'

const getCoupon = () => {
	const code = parseInt(moment().format('YYMMDDHHmmssSS')).toString(16).toUpperCase()
	return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}

export default async (req, res) => {
	const response = (statusCode, message, coupon, error) => {
		res.status(statusCode).json({
			message, coupon, error
		})
	}

	const coupon = {
		showCoupon: false,
		code: '',
		promo: ''
	}

	try {
		const validator = new ValidFormPesquisa()
		validator.validarTudo(req.body)

		const sheetConfig = await getSheetConfig()
		const showCoupon = sheetConfig.showCoupon
		const messageCoupom = sheetConfig.messageCoupom

		if (showCoupon) {
			coupon.showCoupon = true
			coupon.code = getCoupon()
			coupon.promo = messageCoupom
		}

		const newRow = {
			Nome: req.body.Nome,
			Email: req.body.Email,
			Whatsapp: req.body.Whatsapp,
			Nota: req.body.Nota,
			'Data de Preenchimento': moment().format('DD/MM/YYYY HH:mm:ss'),
			Cupom: coupon.code,
			Promo: coupon.promo
		}

		await newRowInSheetResult(newRow)
		response(200, 'Inclusão realizada com sucesso!', coupon)
	} catch (error) {
		console.log(error)
		if (error instanceof ValidationException) {
			response(400, 'Dados inconsistentes!', {}, error.validations)
		} else {
			response(500, error.message, coupon)
		}
	}
}