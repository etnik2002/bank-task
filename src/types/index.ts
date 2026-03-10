export interface Branch {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    lat: number;
    lng: number;
    workingHours?: {
        weekdays: string;
        saturday: string;
        sunday: string;
    };
    hasAtm?: boolean;
}

export interface User {
    id: string;
    username: string;
    passwordHash: string;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export interface BranchFilters {
    city?: string;
    hasAtm?: boolean;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
