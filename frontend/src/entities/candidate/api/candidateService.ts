import { mockCandidatesKanban } from "../lib/mockCandidates";
import { Candidate } from "../types/types";

export class CandidateService {
  public async getCandidates(): Promise<Record<string, Candidate[]>> {
    return new Promise((resolve) => {
      resolve(mockCandidatesKanban);
    });
  }

  public async getKanbanCnadidates() {}
}

export const { getCandidates } = new CandidateService();
