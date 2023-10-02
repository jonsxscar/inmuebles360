const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
});

const propertySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	price: {
		type: Number,
	},
	address: {
		street: String,
		city: String,
		state: String,
		zipCode: String,
	},
	bedrooms: Number,
	bathrooms: Number,
	availableDays: [
		{
			type: Date,
			
		},
	],
	images: [imageSchema],
	type: String,
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
