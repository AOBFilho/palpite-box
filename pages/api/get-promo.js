import { getSheetConfig } from '../../services/LoadGoogleSheetService'

export default async (req, res) => {
	let showCoupon = false
	let messageCoupom = ''

	try {
		const config = await getSheetConfig()
		showCoupon = config.showCoupon
		messageCoupom = config.messageCoupom
	} catch (error) {
		console.log('ERROR :', error)
	}

	res.end(JSON.stringify({
		showCoupon, messageCoupom
	}))
}