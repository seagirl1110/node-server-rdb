const BASE_URL = 'http://127.0.0.1:3000';

const form = document.querySelector('.form');
const inputDatabase = document.querySelector('.input--database');
const inputUser = document.querySelector('.input--user');
const inputPassword = document.querySelector('.input--password');
const inputQuery = document.querySelector('.input--query');

form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    database: inputDatabase.value,
    user: inputUser.value,
    password: inputPassword.value,
    query: inputQuery.value,
  };

  const result = await getData(data);
  console.log(result);
}

async function getData(data) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
