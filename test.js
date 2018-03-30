const test = require('tape')
const options = require('./src/options')
let state = require('./src/store')['en'].state

let questions = options('en')

const findQuestion = name => questions.find(obj => obj.name === name)

const getOptions = name => state[name].map(s => s.shortDesc)

test('en:', t => {
	test('initial', t => {
		t.plan(3)

		let question = findQuestion('init')

		t.deepEqual(question.name, 'init', 'name should be init ')

		t.deepEqual(
			question.message,
			'I have an object, I would like to',
			'displays appropriate message'
		)

		t.deepEqual(
			question.choices,
			[
				'create an object',
				'create properties',
				'get information about an object',
				'get information about properties',
				'restrict changes to an object',
				'create a string from an object',
				'manage prototypes'
			],
			'displays the right choices'
		)
	})

	test('createObj', t => {
		t.plan(3)

		let name = 'createObj'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(question.message, 'I need to', 'displays appropriate message')

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('createProp', t => {
		t.plan(3)

		let name = 'createProp'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(
			question.message,
			'I need to create',
			'displays appropriate message'
		)

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('infoObj', t => {
		t.plan(3)

		let name = 'infoObj'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(
			question.message,
			'I need to determine',
			'displays appropriate message'
		)

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('noChange', t => {
		t.plan(3)

		let name = 'noChange'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(question.message, 'I need to', 'displays appropriate message')

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('createString', t => {
		t.plan(3)

		let name = 'createString'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(
			question.message,
			'I need to return a',
			'displays appropriate message'
		)

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	test('infoProp', t => {
		t.plan(3)

		let name = 'infoProp'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(
			question.message,
			'I need to get',
			'displays appropriate message'
		)

		t.deepEqual(
			question.choices,
			['details about the property', 'a list of all of the keys and/or values'],
			'displays the right choices'
		)
	})

	test('prototype', t => {
		t.plan(3)

		let name = 'prototype'

		let question = findQuestion(name)

		t.deepEqual(question.name, name, 'name should be ' + name)

		t.deepEqual(question.message, 'I need to', 'displays appropriate message')

		t.deepEqual(
			question.choices,
			getOptions(name),
			'displays the right choices'
		)
	})

	t.end()
})
