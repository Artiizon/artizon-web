import { proxy } from "valtio";

const state = proxy({
    // intro: true,
    // makeOrder: false,
    page: 'home',
    color: '#3d3d3d',
    tcolor: '#cf1f1f',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './Logo.png',
    fullDecal: './Logo.png',
});

export default state;