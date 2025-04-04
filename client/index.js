async function main() {
  const BASE_URL = 'http://127.0.0.1:3000';

  async function connectToDB() {
    const dataDB = {
      database: 'D:\\RedDatabase\\TEST.FDB',
      user: 'SYSDBA',
      password: 'masterkey',
    };

    try {
      const response = await fetch(`${BASE_URL}/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataDB),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  await connectToDB();

  const list = document.querySelector('.list');

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

  async function renderData() {
    const result = await getData({ query: 'SELECT * FROM COUNTRIES' });
    result.forEach((item) => {
      const el = document.createElement('div');
      el.innerText = item.NAME;
      list.appendChild(el);
    });
  }

  renderData();
}

main();
