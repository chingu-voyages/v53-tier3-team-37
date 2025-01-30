import { NextApiRequest, NextApiResponse } from "next";

const notFound = (req: NextApiRequest, res: NextApiResponse) => {
  
  return res.status(404).json({ error: "ROUTE NOT FOUND: Check Your Request URL" });

  
};

export default notFound;
