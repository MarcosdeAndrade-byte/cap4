class User {
  name: string;

  age: number;

  cpf: string;

  email: string;

  password: string;

  _id: string;

  constructor(
    name: string,
    age: number,
    cpf: string,
    email: string,
    password: string,
    _id: string
  ) {
    this.name = name;
    this.age = age;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
    this._id = _id;
  }
}

export { User };
