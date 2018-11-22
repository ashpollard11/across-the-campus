'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
	function Validator(selector) {
		_classCallCheck(this, Validator);

		console.log('constructor from Validator', selector);

		//find the field, show an error if its not available
		this.$field = document.querySelector(selector);
		if (!this.$field) {
			console.warn('Couldn\'t find an element with selector', selector);
			return false;
		}

		// Fetch a formatted name for the field from the alt tag, and fall back to the field's name tag 
		if (this.$field.alt) {
			this.fieldName = this.$field.alt;
		} else {
			this.fieldName = this.$field.name.replace('_', ' ').replace('-', ' '); // with some formatting help
		}

		// make an element to show errors in
		this.$errorContainer = document.createElement('div');
		this.$errorContainer.classList.add('error-message');
		this.$field.parentElement.appendChild(this.$errorContainer);

		//keep track of errors. Use this instead of let so it is available to
		//the entire class, let would only make it local to the constructor
		this.errors = [];

		//event listener will only use a special version of this so it doesn't redefine this
		//add event listener to call this.validate, but overrrule it's this logic,
		//and force its this to be the Validate class instance
		this.$field.addEventListener('keyup', this.validate.bind(this));
		this.$field.addEventListener('blur', this.validate.bind(this));
	}

	_createClass(Validator, [{
		key: 'validate',
		value: function validate() {
			console.log('validate!!!!', this.$field.value);

			//empty out current errors
			this.errors = [];

			//if this field is empty, give an error
			if (!this.$field.value.length) {
				this.errors.push("You must fill out the field");
			}

			//This is a hack.
			//putting it in a 0ms timeout just moves it to the end of the
			//call stack after any and all parent/child/grandchild/etc
			setTimeout(this.showErrors.bind(this), 0);
		}
	}, {
		key: 'showErrors',
		value: function showErrors() {
			var _this = this;

			console.log('showErrors()');
			this.$errorContainer.innerHTML = "";
			if (this.errors.length) {
				this.$field.style.borderColor = 'red';

				//using an arrow function to keep this under the class
				this.errors.forEach(function (error) {
					if (!_this.$errorContainer.innerHTML.includes(error)) {
						_this.$errorContainer.innerHTML += '<p>' + error + '</p>';
					}
				});
				document.querySelector('#submit').disabled = true;
				document.querySelector('#submit').style.opacity = 0.5;
			} else {
				this.$field.style.borderColor = 'green';
				document.querySelector('#submit').disabled = false;
				document.querySelector('#submit').style.opacity = 1;
			}
		}
	}]);

	return Validator;
}();
//# sourceMappingURL=Validator.js.map
