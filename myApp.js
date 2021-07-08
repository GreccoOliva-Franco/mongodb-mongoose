var dotenvConfig = require('dotenv').config();
var mongoose = require("mongoose");
var express = require("express");

// Express()
const port = 3001;
var app = express();

// Mongoose
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = mongoose.Schema({
	name: {type: String, required: true, default: "John Doe"},
	age: Number,
	favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
	const somePerson = new Person({
		name: "Some Name",
		age: 34,
		favoriteFoods: []
	})

	somePerson.save( (err, data) => {
		if (err) return console.log(err);
  		done(null, data);
	});
};

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, people) => {
		if (err) console.log(err);
		done(null, people)
	})
};

const findPeopleByName = (personName, done) => {
	const queryObject = {name: personName};
	Person.find(queryObject, (err, data) => {
		if (err) console.log(err);
		done(null, data)
	})
};

const findOneByFood = (food, done) => {
	const queryObject = {favoriteFoods: food};
	Person.findOne(queryObject, (err, data) => {
		if (err) console.log(err);
		console.log(data)
		done(null, data);
	})
};

const findPersonById = (personId, done) => {
	Person.findById(personId, (err, data) => {
		if (err) console.log(err);
		console.log(data);
		done(null, data)
	})
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
	//   console.log(person, "<==== PERSON DATA")
	  if (err) console.log(err, " <==== ERROR");
	  person.favoriteFoods.push(foodToAdd);
	//   console.log(person, "<==== PERSON DATA UPDATED")
	  person.save( (err) => {
		  if (err) console.log(err);
		  done(null, person)
	  })
	// console.log("SAVED")
  });
};

const findAndUpdate = (personName, done,) => {
  const ageToSet = 20;
  const queryObject = {name: personName};
  const newObject = {age: ageToSet};

  Person.findOneAndUpdate(queryObject, newObject, { new: true }, (err, doc) => {
	  if (err) console.log(err);
	  done(null, doc)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, doc) => {
	  if (err) console.log(err);
	  done(null, doc)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  const queryObject = {name: nameToRemove}

  const doc = Person.remove(queryObject, (err, doc) => {
	  if (err) console.log(err);
	  done(null, doc);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 'asc'}).limit(2).select("-age").exec( (err, data) => {
	  if (err) console.log(err);
	  done(null, data)
  });
};

app.listen(port)

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
