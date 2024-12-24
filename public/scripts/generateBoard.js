import BINGOFILE from '../../src/assets/_default.js'
import fs from 'fs'

export const GENERATE = {
	...BINGOFILE,
	writeFile(url) {
		let dirList = fs.readdir(ROOT+'/ready')
		try {
			return this.get(`${url}.txt`)
		}
		catch(err) {
			// current week doesn't exist
			// so create it
			let defaultSquares = this.get(`squares.txt`)

			shuffle(defaultSquares)
			defaultSquares = defaultSquares.slice(0, 24)
			BINGOFILE.write(url, defaultSquares)

			return defaultSquares
		}
	},
}

GENERATE.writeFile()
