export function maskEmail(email) {
	const [userName, domain] = email.split('@');
	const maskedUserName = userName.charAt(0) + '*'.repeat(userName.length - 2) + userName.charAt(userName.length - 1);
	return `${maskedUserName}@${domain}`;
}
// function to parse the date string in the format 'DD.MM.YYYY'
export function parseDate(dateString) {
	const parts = dateString.split('.');
	return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
}
