const locale = require('./locale')

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

function singleOption(type, name, message, choices, when) {
	return {
		type,
		name,
		message,
		choices,
		when
	}
}

const capitalize = str => str[0].toUpperCase() + str.slice(1)

function generateOptions(lang) {
	let localeLang = locale[lang]

	const state = require('./store')[lang].state

	// This has the localMethods names
	const localeMethods = Object.keys(state).slice(1)

	// The first option that is shown to users
	const firstOption = [
		{
			type: 'list',
			name: 'init',
			message: localeLang.firstMethod,
			choices: localeLang.primaryOptions
		}
	]

	// Picks the methodVerbs
	const methodVerbs = {
		createObj: '',
		createProp: localeLang.methodTypes.create,
		infoObj: localeLang.methodTypes.determine,
		noChange: '',
		createString: localeLang.methodTypes['return a'],
		infoProp: localeLang.infoPropMethod,
		infoPropList: localeLang.methodTypes['get an array of all of the'],
		infoPropDetails: localeLang.methodTypes['find out'],
		prototype: ''
	}

	const options = localeMethods.map(method => {
		const methodIndex = mapMethodToIndex[method]
		const methodVerb = methodVerbs[method]

		let methodOptions = localeLang.methodOptions
		let choices

		if (method === 'infoProp') {
			choices = [localeLang.details, localeLang.list]
			methodOptions = localeLang.infoPropMethod
		} else {
			choices = state[method].map(s => s.shortDesc)
		}

		return singleOption(
			'list',
			method.trim(),
			(method === 'infoProp'
				? methodVerb
				: methodOptions + ' ' + methodVerb
			).trim(),
			choices,
			answers => answers.init === localeLang.primaryOptions[methodIndex]
		)
	})

	return firstOption.concat(
		options.concat(
			Object.keys(state.infoProp).map(method => {
				return singleOption(
					'list',
					method,
					localeLang.methodOptions +
						' ' +
						methodVerbs['infoProp' + capitalize(method)],
					state.infoProp[method].map(s => s.shortDesc),
					answers => answers.infoProp === localeLang[method]
				)
			})
		)
	)
}

module.exports = generateOptions
