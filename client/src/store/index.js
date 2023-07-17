import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: '#ff2e4a',
    tcolor: '#3d3d3d',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './Logo.png',
    fullDecal: './Logo.png',
});

export default state;