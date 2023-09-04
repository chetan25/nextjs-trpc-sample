"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.subscription = exports.procedure = exports.router = void 0;
// import { Context } from './context';
const server_1 = require("@trpc/server");
const superjson_1 = __importDefault(require("superjson"));
// const Context
const t = server_1.initTRPC.create({
    transformer: superjson_1.default,
    errorFormatter({ shape }) {
        return shape;
    },
});
exports.router = t.router;
exports.procedure = t.procedure;
exports.subscription = t.procedure.subscription;
exports.middleware = t.middleware;
