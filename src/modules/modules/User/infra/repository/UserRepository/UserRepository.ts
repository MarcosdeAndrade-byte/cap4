import { InsertOneResult, ObjectId } from 'mongodb';
import { databaseConnect } from '../../../../../db/Database';
import { IUserDTO } from '../../../DTO/IUserDTO';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  async updateRefreshToken(
    userId: string,
    refreshToken: string,
    date: Date
  ): Promise<void> {
    const conn = await databaseConnect();
    const filter = { _id: new ObjectId(userId) };
    const update = { refreshToken: { refToken: refreshToken, createdAt: date } };
    conn.collection('users').findOneAndUpdate(filter, { $set: update });
  }

  async delete(id: string): Promise<void> {
    const conn = await databaseConnect();
    conn.collection('users').deleteOne({ _id: new ObjectId(id) });
  }

  async updateUser(
    id: string,
    age: number,
    name: string,
    cpf: string
  ): Promise<void> {
    console.log(id, age, name, cpf);
    const filter = { _id: new ObjectId(id) };
    const conn = await databaseConnect();
    conn
      .collection('users')
      .findOneAndUpdate(filter, { $set: { age, name, cpf } });
  }

  async findByEmail(email: string): Promise<IUserDTO> {
    const conn = await databaseConnect();
    const user = conn.collection<IUserDTO>('users').findOne({ email });
    return user;
  }

  async createUser(
    age: number,
    name: string,
    cpf: string,
    email: string,
    password: string
  ): Promise<IUserDTO> {
    try {
      const conn = await databaseConnect();
      const user = conn.collection('users').insertOne({
        name,
        age,
        cpf,
        email,
        password,
        refreshToken: { refToken: null, createdAt: null },
      }) as unknown as IUserDTO;
      return user;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<IUserDTO> {
    const conn = await databaseConnect();
    const user = conn
      .collection('users')
      .findOne({ _id: new ObjectId(id) });

    return user as unknown as IUserDTO;
  }
}

export { UserRepository };
