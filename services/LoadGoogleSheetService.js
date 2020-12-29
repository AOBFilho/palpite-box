import { GoogleSpreadsheet } from 'google-spreadsheet'

const getDocument = async () => {
	const data = new GoogleSpreadsheet(process.env.SHEET_ID)
	await data.useServiceAccountAuth({
		client_email: process.env.SHEET_CLIENT_EMAIL,
		private_key: process.env.SHEET_PRIVATE_KEY
	})
	await data.loadInfo()
	return data
}

const getSheetConfig = async () => {
	const document = await getDocument()
	const sheet = document.sheetsById[process.env.SHEET_CONFIG_ID]
	await sheet.loadCells('A3:B3')
	return {
		showCoupon: sheet.getCellByA1('A3').value === 'VERDADEIRO',
		messageCoupom: sheet.getCellByA1('B3').value
	}
}

const newRowInSheetResult = async (obj) => {
	const document = await getDocument()
	const sheet = document.sheetsById[process.env.SHEET_RESULT_ID]
	await sheet.addRow(obj)
}

export { getSheetConfig, newRowInSheetResult }