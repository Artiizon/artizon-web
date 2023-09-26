import { proxy } from "valtio";

const state = proxy({
    // intro: true,
    // makeOrder: false,
    page: 'home',
    color: '#3d3d3d',
    tcolor: '#cf1f1f',
    tstyle: 'standard',
    isLogoTexture: true,
    isLogoTexture1: false,
    isLogoTexture2: false,
    isFullTexture: false,
    logoDecal: './Logo.png',
    logoDecal1: './Logo.png',
    logoDecal2: './Logo.png',
    fullDecal: './Logo.png',
    text: 'I love Artizon'
});

export default state;