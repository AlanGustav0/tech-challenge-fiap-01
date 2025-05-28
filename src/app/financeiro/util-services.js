export async function getUserById(id) {
  const response = await fetch(`http://localhost:4000/usuarios?id=${id}`);

  if (response.ok) {
    const user = await response.json();

    return user[0];
  }

  return null;
}

export async function getUsers() {
  return fetch("http://localhost:4000/usuarios");
}

export async function createUser(data) {
  return await fetch('http://localhost:4000/usuarios',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
}

export async function getAccountUserById(id) {
  const response = await fetch(`http://localhost:4000/contas?id=${id}`);

  if (response.ok) {
    const account = await response.json();

    return account[0];
  }

  return null;
}

export async function createAccount(account) {
  return await fetch('http://localhost:4000/contas',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(account),
    });
}