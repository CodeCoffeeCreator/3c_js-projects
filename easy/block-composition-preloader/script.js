const header = document.getElementById('header');
const title = document.getElementById('title');
const excerpt = document.getElementById('excerpt');
const profile_img = document.getElementById('profile_img');
const username = document.getElementById('name');
const date = document.getElementById('date');
const animated_bgs = document.querySelectorAll('.animated-bg');
const animated_bg_texts = document.querySelectorAll('.animated-bg-text');
const unsplashURL = 'https://source.unsplash.com/random/';

function getRandomSize() {
  return `${getRandomNr()}x${getRandomNr()}`;
}

function getRandomNr() {
  return Math.floor(Math.random() * 10) + 300;
}

setTimeout(getData, 2500);

function getData() {
  header.innerHTML = `<img src="${unsplashURL}${getRandomSize()}" alt="" />`;
  title.innerHTML = 'Lorem ipsum dolor sit amet';
  excerpt.innerHTML =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis';
  profile_img.innerHTML = `<img src="https://randomuser.me/api/portraits/men/${
    getRandomNr() - 300
  }.jpg" alt="" />`;
  username.innerHTML = 'Denny Pearce';
  date.innerHTML = 'Apr 19, 2023';

  animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'));
  animated_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text'));
}
