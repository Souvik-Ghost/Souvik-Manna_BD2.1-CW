const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.listen(port, () => {
  console.log("Server running on port: " + port);
});

//1
let person = {
  firstName: "Amit",
  lastName: "Sharma",
  gender: "male",
  age: 30,
  isMember: true
}

app.get('/person', (req, res) => {
  res.json(person);
});
//person

//2
function getFullName(person) {
  return person.firstName + " " + person.lastName;
}
app.get('/person/fullname', (req, res) => {
  let fullName = getFullName(person);
  res.json({fullName: fullName});
});
//person/fullName

//3
function getFirstNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender
  };
}
app.get('/person/firstname-gender', (req, res) => {
  let firstNameAndGender = getFirstNameAndGender(person);
  res.json(firstNameAndGender);
});
//person/firstName-gender

//4
function incrmentAge(person) {
  person.age +=1;
  return person;
}
app.get('/person/increment-age', (req, res) => {
  let updatedPerson = incrmentAge(person);
  res.json(updatedPerson);
});
//person/increment-age

//5
function getFullNameAndMembership(person) {
  return {
    firstName: getFullName(person),
    isMember: person.isMember
  }
}
app.get('/person/fullname-membership', (req, res) => {
  let fullNameAndMembership = getFullNameAndMembership(person);
  res.json(fullNameAndMembership);
});
//person/fullname-membership

//6
function getFinalPrice(cartTotal, isMember) {
  let discount = 0.10;
  let finalPrice;
  if (isMember) {
    finalPrice = cartTotal * (1 - discount);
  }
  else {
    finalPrice = cartTotal;
  }
  return {finalPrice: finalPrice.toFixed(2)}
}
app.get('/person/final-price',(req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);
  res.json(finalPrice);
});
//person/final-price?cartTotal=1000

//7
function getShippingCost(cartTotal, isMember){
  let shippingCost;
  if (cartTotal > 500 && isMember) {
    shippingCost = 0;
  }
  else {
    shippingCost = 99;
  }
  return {shippingCost: shippingCost.toFixed(2)};
}

app.get('/person/shipping-cost', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getShippingCost(cartTotal, person.isMember);
  res.json(shippingCost);
});
//person/shipping-cost?cartTotal=600