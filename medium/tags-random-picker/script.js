const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value);

  if (e.key === 'Enter') {
    setTimeout(() => {
      e.target.value = '';
    }, 10);

    randomChoose();
  }
});

function createTags(input) {
  const tags = input.split(',').filter((tag) => tag.trim());
  tagsEl.innerHTML = '';

  tags.forEach((tag) => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

function randomChoose() {
  const times = 30;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    coloredTag(randomTag);
    setTimeout(() => {
      unColoredTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const randomTag = pickRandomTag();
      coloredTag(randomTag);
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)];
}

function coloredTag(tag) {
  tag.classList.add('colored');
}

function unColoredTag(tag) {
  tag.classList.remove('colored');
}
