export interface Pagination{
    currentPage:number;
    itemsPerPage:number;
    totalItems:number;
    totalPages:number;
}

export class PaginatedResult<T>{      //used for member.service.ts
    result: T;
    pagination:Pagination;            //from above,used in member-list.component.ts
}