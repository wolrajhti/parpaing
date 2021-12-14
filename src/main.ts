import { AuthorizationService, IPrincipal, IResource } from "./libs/authorization/authorization.service";

const authorizationService = new AuthorizationService();

const principals: IPrincipal[] = [
  {id: 'p1', roles: [{roles: {'CREATE': true}}]},
  {id: 'p2', roles: [{resourceId: 'DOC', roles: {'READ': true}}]}
];

const root: IResource = {id: 'ROOT'};
const dir: IResource = {id: 'DIR', parent: root};
const doc: IResource = {id: 'DOC', parent: dir};
const ver: IResource = {id: 'VER', parent: doc};
const vis: IResource = {id: 'VIS', parent: ver};

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