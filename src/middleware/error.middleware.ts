import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("Greska:", err);
    res.status(500).json({
        error: "Se sluci neocekuvana greska. Ve molime obidete se povtorno podocna.",
    });
};

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    res.status(404).json({
        error: "Route not found",
    });
};
