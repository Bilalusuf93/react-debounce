export async function getCharacter(value, signal) {
	try {
		const data = await fetch(
			`https://rickandmortyapi.com/api/character/?name=${value}`, signal
		)
		const response = await data.json()
		if (response === undefined || response.error) {
			throw new Error(`HTTP error! status: ${response.error}`);
		}
		return response
	} catch (error) {
		throw new Error(`HTTP error! status: ${error}`);
	}

}