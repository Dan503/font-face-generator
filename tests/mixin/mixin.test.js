import { get_expected_output, readFile } from "../helpers"

test('mixin', () => {
	return Promise.all([readFile('./tests/mixin/mixin.test.css'), get_expected_output()])
	.then((results => {
		const [ compiledCSS, expectedOutput ] = results
		expect(compiledCSS).toBe(expectedOutput)
	}))
})
