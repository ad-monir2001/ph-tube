fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then((res) => res.json())
  .then((data) => categories(data));

const categories = (data) => {
  const categoryList = data.categories;

  for (let x of categoryList) {
    // console.log(x);
    const catagoryContainer = document.getElementById('catagory-container');
    let div = document.createElement('div');
    div.innerHTML = `
      <button class="btn" onclick="showId(${x.category_id})" >${x.category}</button>
    `;

    catagoryContainer.appendChild(div);
  }
};

const showId = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => videos(data.category));
};

const loadVideos = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => videos(data.videos))
    .catch((error) => console.log(error));
};

// time conversion
const convertTime = (time) => {
  const timeNumber = parseInt(time);
  const day = parseInt(timeNumber / 86400);
  let remainingSecond = timeNumber % 86400;
  const hour = parseInt(remainingSecond / 3600);
  remainingSecond = remainingSecond % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  const second = remainingSecond;

  return `${day} day ${hour} Hour ${minute} Minute ${second} second`;
};

const videos = (data) => {
  const videoContainer = document.getElementById('videos-container');
  videoContainer.innerHTML = '';

  if (data.length == 0) {
    videoContainer.classList.remove('grid');
    videoContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center mt-5">
        <img src="Icon.png">
        <h1 class="text-2xl font-bold text-red-500 mt-2">NO videos on this categories.</h1>
      </div>
    `;
  } else {
    videoContainer.classList.add('grid');
  }

  for (let video of data) {
    let div = document.createElement('div');
    div.classList.add('p-4', 'm-4', 'rounded-lg');
    div.innerHTML = `
    <div class="relative">
      <img src="${video.thumbnail}" class="rounded-lg w-80 h-52">
      ${
        video.others.posted_date?.length == 0
          ? ''
          : `<span class="absolute bg-slate-700 text-white font-medium rounded-lg p-1 right-14 bottom-3 text-xs">${convertTime(
              video.others.posted_date
            )}</span> `
      }
    </div>
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

    videoContainer.appendChild(div);
  }
};

loadVideos();
