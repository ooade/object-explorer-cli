#!/usr/bin/env node

const inquirer = require('inquirer')
const figlet = require('figlet')
const clear = require('clear')
const chalk = require('chalk')
const argv = require('minimist')(process.argv.slice(2))

clear()

const lang =
	typeof argv.lang === 'string'
		? argv.lang
		: typeof argv.l === 'string' ? argv.l : 'en'

const help = argv.help || argv.h || argv._[0] === 'help'

console.log(figlet.textSync('{ } Explorer'))

if (help) {
	const countryCodeWithLanguage = `|bg|Bulgarian|
		|cz|Czech|
		|de|German|
		|en|English(Default)|
		|es|Spanish|
		|fr|French|
		|id|Indonesian|
		|it|Italian|
		|nl|Dutch|
		|pt_pt|Portuguese (Portugal)|
		|ru|Russian|
		|zh_cn|Chinese (Simplified)|
		|zh_hk|Chinese (Traditional)|`

	console.log()

	console.log(
		'- A CLI package to help figure out what JavaScript object method would be best to use at any given time'
	)

	console.log()

	console.log(
		`${chalk.bold('usage:')} object-explorer [help] [-h | --help] <short code>`
	)

	console.log()

	console.log('<short code> can be one of the following:')

	console.log()

	countryCodeWithLanguage
		.split('\n')
		.map(s => s.split('|').slice(1, 3))
		.map(([code, lang]) => {
			console.log(`- ${chalk.bold(code)} - ${chalk.hex('#888888')(lang)}`)
		})

	console.log()

	console.log('Example: object-explorer --lang es')

	console.log()

	return
}

let questions = require('./options')(lang)
let state = require('./store')[lang].state

console.log()

inquirer.prompt(questions).then(answers => {
	let answer = Object.keys(answers).filter(answer => answer !== 'init')

	// This arr stores the container of our real answer
	let arr = []

	// if 2, it's an obj, walk through it
	if (answer.length === 2) {
		arr = state[answer[0]][answer[1]]
	} else {
		arr = state[answer[0]]
	}

	const objValue = Object.keys(answers).map(answer => answers[answer])

	const value = arr.filter(item => item.shortDesc === objValue.slice(-1)[0])[0]

	const formatCode = str =>
		str
			.replace(/\n+\t+/g, '\t')
			.replace(/<br>/g, '\n')
			.replace(/\<span\>\&nbsp\;\&nbsp\;\<\/span\>/g, '\t')
			.replace(/\<span[^>]*\>(.*?)\<\/span\>/g, (_, s) => chalk.hex('#888')(s))

	const formatDesc = str =>
		str
			.replace(/\n+\t+/g, '')
			.replace(/\<code\>(.*?)\<\/code\>/g, (_, s) => chalk.bold(s))
			.replace(/\<strong\>(.*?)\<\/strong\>/g, (_, s) => chalk.bold(s))
			.replace(/\<br\>/g, '\n')

	console.log()

	console.log(chalk.green.bold(`Object.${value.name}()`))

	console.log()

	console.log('- ' + formatDesc(value.desc))

	console.log()

	console.log(chalk.bold('USAGE:'))

	console.log(
		chalk.hex('#aeded4')('\tlet obj = {\n\t a: 1,\n\t b: 2,\n\t c: 3 \n\t};\n')
	)

	console.log('\t' + chalk.hex('#aeded4')(formatCode(value.example)))

	console.log()

	console.log(
		chalk.bold('OUTPUT:\t') + chalk.hex('#ecc2a4')(formatCode(value.output))
	)

	console.log()

	console.log(
		chalk.bold('READ MORE: ') +
			'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/' +
			value.name
	)

	console.log()
})
