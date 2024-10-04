const people = [
  { name: "Alice", others: {age: '29k'} },
  { name: "Bob",  others: {age: '16k'} },
  { name: "Charlie",  others: {age: '22k'} }
];

const sorted = people.sort((a,b) => parseInt(a.others.age) - parseInt(b.others.age));
console.log(sorted);