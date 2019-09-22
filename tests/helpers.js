
import fs from 'fs'

export const readFile = file => {
	return new Promise((resolve, reject)=> {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) reject(err)
			resolve(data)
		})
	})
}

export const get_expected_output = () => readFile('./tests/expectation.css')
