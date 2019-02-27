import styled from 'styled-components';

const input = `
	margin: 4px 6px;
	padding: 6px;
`;

const header = `
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	background-color: #222;
	padding: 1em;
	color: white;
`;

export const Page = styled.div`

	width: 100%;
	// display: flex;
	flex-flow: row wrap;
	text-align: center;

	.logo {
		height: 32px;
		width: auto;
		@media(max-width: 440px) {
			height: 24px;
		}

		&.wait {
			animation: logo-spin infinite 10s linear;
		}
	}

	header {

		${header}

		.title {
			font-size: 1.5em;
			width: fit-content;
			margin: 0.3em;
			margin-after: 0;

			@media(max-width: 440px) {
				font-size: 1em;
			}
		}

		// &:nth-child(2) {
		// }
	}

	.message {
		margin: 18px auto 6px;
	}

	#waypoint {
		width: 100%;
		height: 10px;
	}

	@keyframes logo-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
`;

export const InputContainer = styled.div`

	${header}

	flex-flow: row wrap;
	justify-content: flex-start;
	align-items: center;
	font-size: 12px;
	height: fit-content;
	margin: 1em 0;

	background: grey;
	padding: 1em;
	margin: 0 auto;

	@media(max-width: 440px) {
		padding: 0.6em;
		justify-content: center;
	}

	div {
		width: fit-content;
		display: flex;
		flex-flow: column wrap;
		justify-content: center;
		align-items: center;
		margin: 0 6px;

		label {
			width: fit-content;
			font-size: 12px;
		}
		@media(max-width: 440px) {
			margin: 8px 0;
		}

		input {
			${input}

			&.year { width: 4em; }

			&.search {
				width: 20em;
				// @media(max-width: 440px) {
				// 	width: calc(100% - 4em - 12px);
				// }
			}
		}
	}

	.input-description {
		width: 100%;
		font-size: 10px;
		margin: 6px 12px;
		font-style: italic;
		text-align: left;
	}
`;

export const Input = styled.input`${input}`;

const column = `
	text-align: left;
	padding: 6px 12px;
	word-wrap: default;
`;

const firstColumn = `
	text-align: center;
	padding: 6px;
	width: 2em;
`;

export const Table = styled.table`

	table-layout: fixed;
	width: 100vw;
	margin: 12px;

	tr {
		th {
			${column}

			&:nth-child(1) {
				${firstColumn}
				cursor: pointer;
			}
		}

			td {
				${column}
				line-height: 1.5;

				&:nth-child(1) {
					${firstColumn}
				}
			}
		}
	}

	ul {
		display: flex;
		flex-flow: row wrap;

		li {
			width: 100%;
		}
	}
`;
