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
// time conversion
const convertTime = (time) => {
  console.log(time);
  const timeNumber = parseInt(time);
  const day = parseInt(timeNumber / 86400);
  let remainingSecond = timeNumber % 86400;
  const hour = parseInt(remainingSecond / 3600);
  remainingSecond = remainingSecond % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  const second = remainingSecond;
  console.log(second);
  console.log();
  return `${day} day ${hour} Hour ${minute} Minute ${second} second`;
};

const videos = (data) => {
  const videos = data.videos;
  for (let video of videos) {
    console.log(video.others.posted_date);
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
    const videoContainer = document.getElementById('videos-container');
    videoContainer.appendChild(div);
  }
};
