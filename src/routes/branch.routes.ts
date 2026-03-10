import { Router } from "express";
import { branchController } from "../controllers/branch.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", branchController.getBranches.bind(branchController));
router.get("/:id", branchController.getBranchById.bind(branchController));
router.post("/", requireAuth, branchController.createBranch.bind(branchController));
router.put("/:id", requireAuth, branchController.updateBranch.bind(branchController));
router.delete("/:id", requireAuth, branchController.deleteBranch.bind(branchController));

export default router;
