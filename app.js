fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then((res) => res.json())
  .then((data) => categories(data));

const categories = (data) => {
  const categoryList = data.categories;

  for (let x of categoryList) {
    const catagoryContainer = document.getElementById('catagory-container');
    let button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = x.category;
    catagoryContainer.appendChild(button);
  }
};
