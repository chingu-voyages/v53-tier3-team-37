import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type Middleware = (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
) => Promise<void> | void;

export const appleMiddleware = (
    handler: NextApiHandler,
    middlewares: Middleware[]
): NextApiHandler => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        let index= -1

        const next = async () => {
            index++
            if (index >= middlewares.length) return;
            const middleware = middlewares[index]
            await middleware(req, res, next)
        }

        try {
            await next()
            if (!res.headersSent) {
                await handler(req, res)
            }
        } catch (err) {
            console.error("Middleware Error:", err)
            res.status(500).json({error: "Internal Server Error"})
        }
    }
}