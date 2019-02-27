import styled from 'styled-components';

// const input = `
// 	margin: 4px 6px;
// 	padding: 6px;
// `;

export const Navbar = styled.nav`
	margin-bottom: 20px;
`;

export const Sidebar = styled.div`

	position: absolute;
	top: 0; left: 0;
	height: 100%;
	width: 100%;

	z-index: 1000;

	div {
		background-color: #00bcd4e6;
		// background: rgba(0, 188, 212, 0.9);

		position: absolute;
		top: 0; left: 0;
		max-width: 360px;
		min-width: 240px;
		width: 100%;
		height: 100%;

		// z-index: 100;

		li {
			display: flex;
			align-self: center;
			justify-content: center;
			list-style-type: none;
			padding: 0;
			margin: 40px;
			height: fit-content;
		}
	}
`;
