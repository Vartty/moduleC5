const parser = new DOMParser();
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

//console.log('xmlString' , xmlString);

const xmlDOM =
parser.parseFromString(xmlString,"text/xml");
const listNode = xmlDOM.querySelector("list");

const arr = Array.from(listNode.querySelectorAll("student"));
let lengthOfArr = Number(arr.length);
let listResult = [];
for (let i=0;i < lengthOfArr;i++) {
  var nameNode = arr[i].querySelector("name");
  var firstNameNode = nameNode.querySelector("first");
  var secondNameNode = nameNode.querySelector("second");
  var ageNode = arr[i].querySelector("age");
  var profNode = arr[i].querySelector("prof");

  var langAttr = nameNode.getAttribute("lang");

  var result = {
    name : firstNameNode.textContent + " " + secondNameNode.textContent,
    age : Number(ageNode.textContent),
    prof : profNode.textContent,
    langAttr : langAttr,
  };
  listResult.push(result);
};


// const studentNode = listNode.querySelector("student");
// const nameNode = studentNode.querySelector("name");
// const firstNameNode = nameNode.querySelector("first");
// const secondNameNode = nameNode.querySelector("second");
// const ageNode = studentNode.querySelector("age");
// const profNode = studentNode.querySelector("prof");

// const langAttr = nameNode.getAttribute("lang");

// const result = {
//   name : firstNameNode.textContent + " " + secondNameNode.textContent,
//   age : Number(ageNode.textContent),
//   prof : profNode.textContent,
//   lang : langAttr,
// };

console.log("result",listResult);