import { Model } from "sequelize";

export interface UserAttributes {
  id?: number;
  username: string;
  password: string;
}

export interface UserCreationAttributes extends UserAttributes {}

export class User_
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
}
