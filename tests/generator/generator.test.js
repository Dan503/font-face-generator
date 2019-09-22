import { get_expected_output, readFile } from "../helpers"

test('generator', () => {
	return Promise.all([readFile('./tests/generator/generator.test.css'), get_expected_output()])
	.then((results => {
		const [ compiledCSS, expectedOutput ] = results
		expect(compiledCSS).toBe(expectedOutput)
	}))
})

