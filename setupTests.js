import 'jest-enzyme';
require("raf/polyfill.js");
const { configure } = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

configure({ adapter: new Adapter() });
