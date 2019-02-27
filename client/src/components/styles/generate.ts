
interface IBoxShadowPresets
{
    dx?: number; dy?: number;
    blur?: number; spread?: number;
    color?: { r: number, g: number, b: number, opacity: number };
}
export function generateBoxShadow(options: IBoxShadowPresets): string
{
    const dx = (options.dx) || 0;
    const dy = (options.dy) || 0;
    const blur = (options.blur) || 3;
    const spread = (options.spread) || 0;
    const color = (options.color) || { r: 0, b: 0, g: 0, opacity: 0.75 };
    const rgba = `rgba(${color.r},${color.g},${color.b},${color.opacity})`;

    const shadow = `${dx}px ${dy}px ${blur}px ${spread}px ${rgba}`;
    return `
    -webkit-box-shadow: ${shadow};
	-moz-box-shadow: ${shadow};
	box-shadow: ${shadow};
    `;
}
