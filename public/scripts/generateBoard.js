import DefaultValues from '../../src/assets/_default.js'
import fs from 'fs'

class Generate extends BINGOFILE {
	constructor(ROOT) {
		this.ROOT = ROOT
	}
	write (url, content) {
		fs.open(url, 'r', (error, content) => {
			console.log(content)
		})
	}
}

console.log('!!!',process.cwd())
let generate = new Generate(process.cwd())
