export interface IEntity {
  id: string;
}

export interface IRole {
  resourceId?: string;
  roles: Record<string, boolean>;
}

export interface IPrincipal extends IEntity {
  roles: IRole[];
  // parent?: IPrincipal;
  // children: IPrincipal[];
}

export interface IResource extends IEntity {
  parent?: IResource;
}

export class AuthorizationService {
  weightFn(r1: IResource): (resourceId?: string) => number {
    const knownResources = new Map<string, number>(); // évitons de recalculer le poids si la resource est connue (pointée par 2 principals)
    const fn = (r1: IResource, resourceId?: string, weight = 0): number => {
      if (!resourceId) {
        return +Infinity;
      }
      if (knownResources.has(resourceId)) {
        return knownResources.get(resourceId) as number;
      }
      if (r1.id === resourceId) {
        return weight;
      }
      if (r1.parent) {
        return fn(r1.parent, resourceId, weight + 1);
      }
      return -Infinity;
    };
    return (resourceId?: string) => fn(r1, resourceId);
  }
  checkAccess(resource: IResource, principals: IPrincipal[]): void {
    const weightFn = this.weightFn(resource);
    for (const principal of principals) {
      for (const role of principal.roles) {
        console.log(principal.id, weightFn(role.resourceId));
      }
    }
  }
}