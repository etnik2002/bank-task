import { branchRepository } from "../repositories/branch.repository";
import { Branch, PaginationParams, BranchFilters, PaginatedResult } from "../types";

export class BranchService {
    async getBranches(
        params: PaginationParams,
        filters?: BranchFilters
    ): Promise<PaginatedResult<Branch>> {
        let branches = await branchRepository.getAll();

        if (filters?.city) {
            branches = branches.filter(
                (b) => b.city.toLowerCase() === filters.city!.toLowerCase()
            );
        }
        if (filters?.hasAtm !== undefined) {
            branches = branches.filter((b) => b.hasAtm === filters.hasAtm);
        }

        const { page, limit } = params;
        const total = branches.length;
        const totalPages = Math.ceil(total / limit);
        const offset = (page - 1) * limit;

        const data = branches.slice(offset, offset + limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async getBranchById(id: string): Promise<Branch | null> {
        return branchRepository.getById(id);
    }

    async createBranch(data: Omit<Branch, "id">): Promise<Branch> {
        return branchRepository.create(data);
    }

    async updateBranch(id: string, data: Partial<Branch>): Promise<Branch | null> {
        return branchRepository.update(id, data);
    }

    async deleteBranch(id: string): Promise<boolean> {
        return branchRepository.delete(id);
    }
}

export const branchService = new BranchService();
