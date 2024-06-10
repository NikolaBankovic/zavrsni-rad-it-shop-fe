import {Role} from "../enum/role";

export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  username!: string;
  email!: string;
  password!: string;
  phoneNumber!: string;
  address!: string;
  role!: Role
}
