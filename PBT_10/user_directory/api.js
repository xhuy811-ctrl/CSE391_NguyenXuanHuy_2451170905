const api = {
  baseURL: 'https://jsonplaceholder.typicode.com',

  async getUsers(){
    const res = await fetch(`${this.baseURL}/users`);
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async getUser(id){
    const res = await fetch(`${this.baseURL}/users/${id}`);
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async createUser(data){
    const res = await fetch(`${this.baseURL}/users`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async updateUser(id, data){
    const res = await fetch(`${this.baseURL}/users/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async deleteUser(id){
    const res = await fetch(`${this.baseURL}/users/${id}`,{method:'DELETE'});
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  }
};
