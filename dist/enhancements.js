document.addEventListener('DOMContentLoaded', () => {
  const profiles = [
    { name: 'Dou Dou', gender: 'Male' },
    { name: 'Fu', gender: 'Male', breed: 'Bulldog mix' },
    { name: 'Milo', gender: 'Female', breed: 'Beagle' },
    { name: 'Wheat', gender: 'Female' },
    { name: 'Poppy', gender: 'Female' }
  ];

  const cards = [...document.querySelectorAll('.dog')];
  const dogs = profiles.map((profile, index) => {
    const card = cards[index];
    const facts = card.querySelector('.facts');
    const breed = facts.querySelector('dd');
    if (profile.breed) breed.textContent = profile.breed;

    const genderLabel = document.createElement('dt');
    genderLabel.textContent = 'Gender';
    const genderValue = document.createElement('dd');
    genderValue.textContent = profile.gender;
    const healthLabel = [...facts.querySelectorAll('dt')].find(item => item.textContent === 'Health');
    facts.insertBefore(genderLabel, healthLabel);
    facts.insertBefore(genderValue, healthLabel);

    return {
      name: profile.name,
      image: card.querySelector('img').src,
      breed: breed.textContent,
      age: facts.querySelectorAll('dd')[1].textContent,
      gender: profile.gender,
      health: [...facts.querySelectorAll('dd')].at(-1).textContent
    };
  });

  const badge = document.querySelector('.dog-note');
  const badgeImage = badge.querySelector('img');
  const badgeName = badge.querySelector('b');
  const badgeDetails = badge.querySelector('small');
  let current = 0;
  const showDog = dog => {
    badgeImage.src = dog.image;
    badgeImage.alt = dog.name;
    badgeName.textContent = `${dog.name} is waiting for you`;
    badgeDetails.textContent = `${dog.age} · ${dog.breed} · ${dog.gender} · ${dog.health}`;
    badge.classList.remove('is-changing');
    void badge.offsetWidth;
    badge.classList.add('is-changing');
  };
  showDog(dogs[current]);
  window.setInterval(() => {
    current = (current + 1) % dogs.length;
    showDog(dogs[current]);
  }, 3000);
});
