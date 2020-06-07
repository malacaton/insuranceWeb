import { User } from '@app/_models';
import { first } from 'rxjs/operators';

let users: User[] = [];

export function setUsers(usersReceived: User[]) {
  users = usersReceived;
}
export function getUsers(): User[] {
  return users;
}