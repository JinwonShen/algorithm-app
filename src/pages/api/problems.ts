import type { NextApiRequest, NextApiResponse } from "next";
import problems from "../../data/algorithm_problems.json"; // JSON 파일 경로 확인

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(problems);
}