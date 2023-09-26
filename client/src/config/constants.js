import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt1",
    icon: logoShirt,
  },
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "logoShirt2",
    icon: logoShirt,
  }
  // {
  //   name: "stylishShirt",
  //   icon: stylishShirt,
  // },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  logo1: {
    stateProperty: "logoDecal1",
    filterTab: "logoShirt1",
  },
  logo2: {
    stateProperty: "logoDecal2",
    filterTab: "logoShirt2",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
