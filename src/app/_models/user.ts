﻿import { Role } from './role';

export class User {
  id: string;
  name: string;
  email: string;
  role: Role;
  token?: string;
}