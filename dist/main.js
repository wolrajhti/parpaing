"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_service_1 = require("./libs/authorization/authorization.service");
const authorizationService = new authorization_service_1.AuthorizationService();
const principals = [
    { id: 'p1', roles: [{ roles: { 'CREATE': true } }] },
    { id: 'p2', roles: [{ resourceId: 'DOC', roles: { 'READ': true } }] }
];
const root = { id: 'ROOT' };
const dir = { id: 'DIR', parent: root };
const doc = { id: 'DOC', parent: dir };
const ver = { id: 'VER', parent: doc };
const vis = { id: 'VIS', parent: ver };
console.log('root');
authorizationService.checkAccess(root, principals);
console.log('dir');
authorizationService.checkAccess(dir, principals);
console.log('doc');
authorizationService.checkAccess(doc, principals);
console.log('ver');
authorizationService.checkAccess(ver, principals);
console.log('vis');
authorizationService.checkAccess(vis, principals);
