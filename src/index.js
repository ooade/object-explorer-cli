#!/usr/bin/env node

const inquirer = require('inquirer')
const figlet = require('figlet')
const clear = require('clear')
const chalk = require('chalk')
const state = require('./store').state
const text = require('./text')
const { merge, generateQuestions } = require('./utils')

clear()

console.log(figlet.textSync('{ } Explorer'))

console.log()

const keys = Object.keys(state)

const INIT_QUESTION = [
	{
		type: 'list',
		name: 'init',
		message: 'I have an object, I would like to',
		choices: keys.map(key => text[key][0])
	}
]

let questions = generateQuestions.init({ keys, state, text })

questions = INIT_QUESTION.concat(merge(questions))

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

	console.log(formatDesc(value.desc))

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