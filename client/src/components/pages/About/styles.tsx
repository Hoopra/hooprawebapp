import { generateBoxShadow } from 'src/components/styles/generate';
import styled from 'styled-components';

const constrainWidth = `
	width: 80%;
	min-width: 320px;
	max-width: 800px;
`;
const center = `
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
const bottomBorder = `border-bottom: 1.2px solid #00BDD4;`;

export const Page = styled.div`
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	padding-bottom: 2em;

	.start {
		.description {
			${constrainWidth}
			margin: .5em 1em .5em 1em;
		}
		margin: 0 0 25em 0;
	}
`;

const sectionBox = {
  fade: { blur: 15, spread: 2, color: { r: 0, g: 189, b: 212, opacity: 0.5 } },
  expand: { blur: 15, spread: 3, color: { r: 0, g: 189, b: 212, opacity: 0.75 } },
};

export const Section = styled.div`
	flex-flow: column wrap;
	margin: 10em 0;
	padding-bottom: 1em;
	${constrainWidth}

	${generateBoxShadow(sectionBox.expand)}

	.title {
		${center}
		width: 100%;
		font-size: 1.4em;
		font-style: bold;
		&.underline {
			height: 2em;
			${bottomBorder}
		}
	}
	.subtitle {
		${center}
		padding-bottom: .4em;
		font-style: italic;
		${bottomBorder}
	}

	.description {
		margin: .7em 1em 0 1em;
	}

	ul {
		margin: 1em 1em 0 1em;
		li {
			list-style-type: circle !important;
			margin: 0.5em 0 0 1.5em;
		}
	}
`;
