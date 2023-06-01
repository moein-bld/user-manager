export interface User {
	uid: string;
	email: string;
	displayName: string;
	photoURL: string;
	emailVerified: boolean;
}

export interface UserLogin {
	email: string;
	password: string;
}
