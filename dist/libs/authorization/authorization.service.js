"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
class AuthorizationService {
    weightFn(r1) {
        const knownResources = new Map(); // évitons de recalculer le poids si la resource est connue (pointée par 2 principals)
        const fn = (r1, resourceId, weight = 0) => {
            if (!resourceId) {
                return +Infinity;
            }
            if (knownResources.has(resourceId)) {
                return knownResources.get(resourceId);
            }
            if (r1.id === resourceId) {
                return weight;
            }
            if (r1.parent) {
                return fn(r1.parent, resourceId, weight + 1);
            }
            return -Infinity;
        };
        return (resourceId) => fn(r1, resourceId);
    }
    checkAccess(resource, principals) {
        const weightFn = this.weightFn(resource);
        for (const principal of principals) {
            for (const role of principal.roles) {
                console.log(principal.id, weightFn(role.resourceId));
            }
        }
    }
}
exports.AuthorizationService = AuthorizationService;
