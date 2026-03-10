import fs from "fs/promises";
import path from "path";
import { Branch } from "../types";

const dataPath = path.join(__dirname, "../data/branches.json");

export class BranchRepository {
    private async readData(): Promise<Branch[]> {
        try {
            const data = await fs.readFile(dataPath, "utf-8");
            return JSON.parse(data) as Branch[];
        } catch {
            return [];
        }
    }

    async getAll(): Promise<Branch[]> {
        return this.readData();
    }

    async getById(id: string): Promise<Branch | null> {
        const branches = await this.readData();
        return branches.find((b) => b.id === id) || null;
    }

    private async writeData(data: Branch[]): Promise<void> {
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
    }

    async create(branchData: Omit<Branch, "id">): Promise<Branch> {
        const branches = await this.readData();
        const newBranch: Branch = {
            id: Date.now().toString(),
            ...branchData,
        };
        branches.push(newBranch);
        await this.writeData(branches);
        return newBranch;
    }

    async update(id: string, updates: Partial<Branch>): Promise<Branch | null> {
        const branches = await this.readData();
        const index = branches.findIndex((b) => b.id === id);
        if (index === -1) return null;

        branches[index] = { ...branches[index], ...updates };
        await this.writeData(branches);
        return branches[index];
    }

    async delete(id: string): Promise<boolean> {
        const branches = await this.readData();
        const initialLength = branches.length;
        const filtered = branches.filter((b) => b.id !== id);

        if (filtered.length === initialLength) return false;

        await this.writeData(filtered);
        return true;
    }
}

export const branchRepository = new BranchRepository();
