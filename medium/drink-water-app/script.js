const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const text = document.querySelector('.text');

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(index) {
  if (
    smallCups[index].classList.contains('full') &&
    !smallCups[index].nextElementSibling.classList.contains('full')
  ) {
    index--;
  }

  smallCups.forEach((cup, secondIndex) => {
    if (secondIndex <= index) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  fillBigCup();
}

function fillBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    percentage.style.height = `${(fullCups / totalCups) * 400}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
    text.classList.add('reached-text');
    text.innerHTML = 'You have reached the goal';
  } else {
    remained.style.visibility = 'visible';
    liters.innerText = `${(2 - (200 * fullCups) / 1000).toFixed(1)}L`;
    text.classList.remove('reached-text');
    text.innerHTML = 'Select how many glasses of water that you have drank';
  }
}
