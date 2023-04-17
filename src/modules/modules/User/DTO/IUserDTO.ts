interface IUserDTO {
  _id: string;
  name: string;
  age: number;
  cpf: string;
  email: string;
  password: string;
  refreshToken: {
    refToken: string;
    createdAt: Date;
  };
}

export { IUserDTO };
