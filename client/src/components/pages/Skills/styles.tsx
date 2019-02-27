import styled from 'styled-components';
import { generateBoxShadow } from '../../styles/generate';

export const Page = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	margin-top: 3em !important;
	padding-bottom: 3.5em;

	.description {
		display: block;
	}

	.search {
		width: 50%;
		min-width: 240px;
		margin: 3em 25% 3em 25%;
		text-align: center;
	}
`;

const sectionBox = {
  fade: { blur: 15, spread: 2, color: { r: 0, g: 189, b: 212, opacity: 0.5 } },
  expand: { blur: 15, spread: 3, color: { r: 0, g: 189, b: 212, opacity: 0.75 } },
};

export const Section = styled.div`
	margin: 1em;
	width: 20em;
	height: fit-content;
	max-height: 2.6em;
	padding: 0;
	border: 0.4px solid #00BDD4;
	overflow: hidden;
	${generateBoxShadow(sectionBox.fade)}
	-webkit-transition: .25s;
	transition: .25s;

	.title {
		width: 100%;
		text-align: center;
		font-size: 1.4em;
		height: 2em;
		font-style: bold;
		padding: 1.2%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		cursor: pointer;

		span {
			display: inline-block;
			&:nth-child(1) { width: 10%; }
			&:nth-child(2) { width: 80%; }
		}
	}
	.body {
		margin-left: 1em;
		margin-right: 1em;
		height: fit-content;
		-webkit-transition: .35s;
		transition: .35s;
		transform: scaleY(0);

		.subtitle {
			font-style: italic;
			text-align: center;
		}

		ul {
			width: 100%;
			margin: 0;
			padding: 0;

			li {
				display: flex;
				height: 2.5em;
				align-items: center;
				justify-content: center;
			}
		}
	}

	&.expanded {

		max-height: 50em;
		${generateBoxShadow(sectionBox.expand)}
		margin-left: calc(50% - 10em);
		margin-right: calc(50% - 10em);

		.title {
			border-bottom: 1.2px solid #00BDD4;
		}

		.body {
			margin-top: 1em;
			margin-bottom: 1em;
			display: flex;
			height: fit-content;
			/* height: 340px; */
			transform: scaleY(1);
		}
	}
`;
