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

fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
  .then((res) => res.json())
  .then((data) => videos(data));

const videos = (data) => {
  const videos = data.videos;
  for (let video of videos) {
    let div = document.createElement('div');
    div.classList.add('p-4', 'm-4', 'rounded-lg');
    div.innerHTML = `
    <img src="${video.thumbnail}" class="rounded-lg w-80 h-52">
    <div class="flex gap-2 mt-4 items-start">
        <img src="${
          video?.authors[0]?.profile_picture
        }" class="w-8 h-8 rounded-full">
        <div class="space-y-1">
            <h1 class="font-bold text-base">${video.title}</h1>
            <div class='flex gap-1'>
              <p class="font-medium text-sm text-[#171717B2]">${
                video?.authors[0]?.profile_name
              }</p>

              ${
                video.authors[0].verified == true
                  ? `<img src="./verified.svg" id='verify-el'/>`
                  : ''
              }
            </div>
            <p class="font-medium text-sm text-[#171717B2]">${
              video?.others?.views
            } views</p>
        </div>
    </div>
  `;
    const videoContainer = document.getElementById('videos-container');
    videoContainer.appendChild(div);
  }
};
