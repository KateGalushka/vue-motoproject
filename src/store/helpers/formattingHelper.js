export function maskEmail(email) {
	const [userName, domain] = email.split('@');
	const maskedUserName = userName.charAt(0) + '*'.repeat(userName.length - 2) + userName.charAt(userName.length - 1);
	return `${maskedUserName}@${domain}`;
}
