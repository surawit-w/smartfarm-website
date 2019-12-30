// export const _ip = "http://localhost:3053";
// export const _ip = 'http://172.16.63.9:4000';

export const _ip = "https://line-smartfarm-api.herokuapp.com";

export const ip = _ip + "";

export const GET = path => {
  return new Promise((resolve, reject) => {
    fetch(ip + path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

export const POST = (path, obj, formData) => {
  return new Promise((resolve, reject) => {
    fetch(ip + path, {
      method: "POST",
      headers: formData
        ? {}
        : {
            "Content-Type": "application/json"
          },
      body: formData ? obj : JSON.stringify(obj),
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};
