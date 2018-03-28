#!/usr/bin/env node
const locale = require('./locale')
const state = require('./store').state

// The first option that is shown to users
const firstOption = [
	{
		type: 'list',
		name: 'init',
		message: locale['en'].firstMethod,
		choices: locale['en'].primaryOptions
	}
]

const capitalize = str => str[0].toUpperCase() + str.slice(1)

// This has the localMethods names
const localeMethods = Object.keys(state).slice(1)

// Picks the methodVerbs
const methodVerbs = {
	createObj: '',
	createProp: locale['en'].methodTypes.create,
	infoObj: locale['en'].methodTypes.determine,
	noChange: '',
	createString: locale['en'].methodTypes['return a'],
	infoProp: locale['en'].infoPropMethod,
	infoPropList: locale['en'].methodTypes['get an array of all of the'],
	infoPropDetails: locale['en'].methodTypes['find out'],
	prototype: ''
}

// Maps method to primary option index
const mapMethodToIndex = {
	createObj: 0,
	createProp: 1,
	infoObj: 2,
	noChange: 4,
	createString: 5,
	infoProp: 3,
	prototype: 6
}

function generateOptions() {
	let lang = locale['en']

	function singleOption(type, name, message, choices, when) {
		return {
			type,
			name,
			message,
			choices,
			when
		}
	}

	const options = localeMethods.map(method => {
		const methodIndex = mapMethodToIndex[method]
		const methodVerb = methodVerbs[method]

		let methodOptions = lang.methodOptions
		let choices

		if (method === 'infoProp') {
			choices = [lang.details, lang.list]
			methodOptions = lang.infoPropMethod
		} else {
			choices = state[method].map(s => s.shortDesc)
		}

		return singleOption(
			'list',
			method,
			method === 'infoProp' ? methodVerb : methodOptions + ' ' + methodVerb,
			choices,
			answers => answers.init === lang.primaryOptions[methodIndex]
		)
	})

	return options.concat(
		Object.keys(state.infoProp).map(method => {
			return singleOption(
				'list',
				method,
				lang.methodOptions + ' ' + methodVerbs['infoProp' + capitalize(method)],
				state.infoProp[method].map(s => s.shortDesc),
				answers => answers.infoProp === lang[method]
			)
		})
	)
}

module.exports = () => firstOption.concat(...generateOptions())
