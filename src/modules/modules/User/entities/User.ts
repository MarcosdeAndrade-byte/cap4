class User {
  name: string;

  age: number;

  cpf: string;

  email: string;

  password: string;

  constructor(
    name: string,
    age: number,
    cpf: string,
    email: string,
    password: string
  ) {
    this.name = name;
    this.age = age;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
  }
}

export { User };
