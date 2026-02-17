export interface Candidate {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Job {
  id: string;
  title: string;
}

export interface ApplyRequest {
  uuid: string;
  jobId: string;
  candidateId: string;
  applicationId: string;
  repoUrl: string;
}