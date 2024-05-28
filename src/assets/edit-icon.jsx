import PropTypes from "prop-types";

export function EditIcon({ size = 1 }) {
	return (
		<svg
			width={size * 30}
			height={size * 30}
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="16" cy="16" r="15.5" stroke="black" />
			<path
				d="M17.9987 23.1666H13.9987C10.3787 23.1666 8.83203 21.6199 8.83203 17.9999V13.9999C8.83203 10.3799 10.3787 8.83325 13.9987 8.83325H15.332C15.6054 8.83325 15.832 9.05992 15.832 9.33325C15.832 9.60659 15.6054 9.83325 15.332 9.83325H13.9987C10.9254 9.83325 9.83203 10.9266 9.83203 13.9999V17.9999C9.83203 21.0733 10.9254 22.1666 13.9987 22.1666H17.9987C21.072 22.1666 22.1654 21.0733 22.1654 17.9999V16.6666C22.1654 16.3933 22.392 16.1666 22.6654 16.1666C22.9387 16.1666 23.1654 16.3933 23.1654 16.6666V17.9999C23.1654 21.6199 21.6187 23.1666 17.9987 23.1666Z"
				fill="#161616"
			/>
			<path
				d="M13.6649 19.7934C13.2583 19.7934 12.8849 19.6467 12.6116 19.38C12.2849 19.0534 12.1449 18.58 12.2183 18.08L12.5049 16.0734C12.5583 15.6867 12.8116 15.1867 13.0849 14.9134L18.3383 9.66004C19.6649 8.33337 21.0116 8.33337 22.3383 9.66004C23.0649 10.3867 23.3916 11.1267 23.3249 11.8667C23.2649 12.4667 22.9449 13.0534 22.3383 13.6534L17.0849 18.9067C16.8116 19.18 16.3116 19.4334 15.9249 19.4867L13.9183 19.7734C13.8316 19.7934 13.7449 19.7934 13.6649 19.7934ZM19.0449 10.3667L13.7916 15.62C13.6649 15.7467 13.5183 16.04 13.4916 16.2134L13.2049 18.22C13.1783 18.4134 13.2183 18.5734 13.3183 18.6734C13.4183 18.7734 13.5783 18.8134 13.7716 18.7867L15.7783 18.5C15.9516 18.4734 16.2516 18.3267 16.3716 18.2L21.6249 12.9467C22.0583 12.5134 22.2849 12.1267 22.3183 11.7667C22.3583 11.3334 22.1316 10.8734 21.6249 10.36C20.5583 9.29337 19.8249 9.59337 19.0449 10.3667Z"
				fill="#161616"
			/>
			<path
				d="M21.233 14.5534C21.1864 14.5534 21.1397 14.5468 21.0997 14.5334C19.3464 14.0401 17.953 12.6468 17.4597 10.8934C17.3864 10.6268 17.5397 10.3534 17.8064 10.2734C18.073 10.2001 18.3464 10.3534 18.4197 10.6201C18.8197 12.0401 19.9464 13.1668 21.3664 13.5668C21.633 13.6401 21.7864 13.9201 21.713 14.1868C21.653 14.4134 21.453 14.5534 21.233 14.5534Z"
				fill="#161616"
			/>
		</svg>
	);
}

EditIcon.propTypes = {
	size: PropTypes.number,
};
