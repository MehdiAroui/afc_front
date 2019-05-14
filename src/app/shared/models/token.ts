import { User } from './user';

export class Token {
	token : string;
	token_type : string;
	user: User;
	expires_in: number;
}