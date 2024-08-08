import "@testing-library/jest-dom";
import { TextEncoder } from "util";
import "@inrupt/jest-jsdom-polyfills";
global.TextEncoder = TextEncoder;
