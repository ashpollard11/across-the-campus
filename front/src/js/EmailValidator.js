class EmailValidator extends Validator {
	constructor(selector) {
		super(selector); //call constructor in validator()
		console.log('constructor from EmailValidator')
		//we dont need this constructor. It doesnt do anything different from the 
		//parent class constructor. It's here for illustrative purposes.
	}

	validate() {
		super.validate();
		
		// if (!this.$field.value.includes('@')) {
		// 	this.errors.push("Your email must include an @");
		// }
		// if (!this.$field.value.includes('.')) {
		// 	this.errors.push("Your email must include a .");
		// }

		let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!this.$field.value.match(emailRegex)) {
		 	this.errors.push("Your email is not valid");
		}


	}

}