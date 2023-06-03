export interface VerifiedUser {
	id: string;
	ts: string;
	accessLevel: 'admin' | 'default' | 'l0' | 'l1' | 'l2' | 'l3';
	email: string;
	isTermsAccepted: boolean;
	phoneNumber: string;
	signUpTimeStamp: string;
	displayName: string;
	isDisabled: boolean;
	avatarFullPath: string;
}

export interface UserLogin {
	email: string;
	password: string;
}
