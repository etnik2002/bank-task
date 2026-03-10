import { Request, Response } from "express";
import { branchService } from "../services/branch.service";
import { getBranchesQuerySchema, createBranchSchema, updateBranchSchema } from "../schemas/branch.schema";

export class BranchController {
    async getBranches(req: Request, res: Response): Promise<void> {
        try {
            const parsedQuery = getBranchesQuerySchema.safeParse(req.query);

            if (!parsedQuery.success) {
                res.status(400).json({ error: "Nevalidni parametri za prebaruvanje", details: parsedQuery.error.format() });
                return;
            }

            const { page, limit, city, hasAtm } = parsedQuery.data;

            const result = await branchService.getBranches(
                { page, limit },
                { city, hasAtm }
            );

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Vnatresna serverska greska" });
        }
    }

    async getBranchById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const branch = await branchService.getBranchById(id as string);

            if (!branch) {
                res.status(404).json({ error: "Filijalata ne e pronajdena" });
                return;
            }

            res.json(branch);
        } catch (error) {
            res.status(500).json({ error: "Vnatresna serverska greska" });
        }
    }

    async createBranch(req: Request, res: Response): Promise<void> {
        try {
            const parsedBody = createBranchSchema.safeParse(req.body);

            if (!parsedBody.success) {
                res.status(400).json({ error: "Nevalidni podatoci za filijala", details: parsedBody.error.format() });
                return;
            }

            const newBranch = await branchService.createBranch(parsedBody.data);
            res.status(201).json(newBranch);
        } catch (error) {
            res.status(500).json({ error: "Vnatresna serverska greska" });
        }
    }

    async updateBranch(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const parsedBody = updateBranchSchema.safeParse(req.body);

            if (!parsedBody.success) {
                res.status(400).json({ error: "Nevalidni podatoci", details: parsedBody.error.format() });
                return;
            }

            const updatedBranch = await branchService.updateBranch(id as string, parsedBody.data);

            if (!updatedBranch) {
                res.status(404).json({ error: "Filijalata ne e pronajdena" });
                return;
            }

            res.json(updatedBranch);
        } catch (error) {
            res.status(500).json({ error: "Vnatresna serverska greska" });
        }
    }

    async deleteBranch(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await branchService.deleteBranch(id as string);

            if (!deleted) {
                res.status(404).json({ error: "Filijalata ne e pronajdena" });
                return;
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Vnatresna serverska greska" });
        }
    }
}

export const branchController = new BranchController();
