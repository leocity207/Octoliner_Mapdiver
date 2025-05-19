function copyStaticProperties(source, target) {
	const keys = [
		...Object.getOwnPropertyNames(source),
		...Object.getOwnPropertySymbols(source),
	];

	for (const key of keys) {
		if (
			key === 'name' ||
			key === 'length' ||
			key === 'prototype' ||
			key === 'caller' ||
			key === 'callee' ||
			key === 'arguments'
		)
			continue; // Skip default and non-copyable properties

		const descriptor = Object.getOwnPropertyDescriptor(source, key);
		Object.defineProperty(target, key, descriptor);
	}
}

function copyPrototypeProperties(sourceProto, targetProto) {
	const keys = [
		...Object.getOwnPropertyNames(sourceProto),
		...Object.getOwnPropertySymbols(sourceProto),
	];

	for (const key of keys) {
		if (key === 'constructor') continue; // Skip the constructor

		const descriptor = Object.getOwnPropertyDescriptor(sourceProto, key);
		Object.defineProperty(targetProto, key, descriptor);
	}
}

export default function MixHTMLElementWith(...bases) {
	class Base extends HTMLElement {}

	const MixinClass = bases.reduce((BaseClass, Mixin) => {
		class Mixed extends BaseClass {
			constructor(...args) {
				super(...args);
				const mixinInstance = new Mixin(...args);
				// Copy instance properties from the mixin instance to 'this'
				Object.assign(this, mixinInstance);
			}
		}

		// Copy static properties
		copyStaticProperties(Mixin, Mixed);

		// Copy prototype properties (instance methods)
		copyPrototypeProperties(Mixin.prototype, Mixed.prototype);

		return Mixed;
	}, Base);

	return MixinClass;
}