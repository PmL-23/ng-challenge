import type { Candidate, Job, ApplyRequest } from "../types/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const CANDIDATE_EMAIL = import.meta.env.VITE_API_CANDIDATE_EMAIL ?? "";

export const getCandidateByEmail = async (): Promise<Candidate> => {

    const response = await fetch(
        `${BASE_URL}/api/candidate/get-by-email?email=${CANDIDATE_EMAIL}`
    );

    const textResponse = await response.text();

    if (!response.ok) {

        let errorMessage = `Request failed with status ${response.status}`;

        try {

            const parsed = JSON.parse(textResponse);

            if (parsed.error) {
                errorMessage = parsed.error;
            }
            
        } catch {
            // default message
        }

        throw new Error(errorMessage);
    }

    try {
        return JSON.parse(textResponse);
    } catch {
        throw new Error("Server did not return valid JSON");
    }

};

export const getJobs = async (): Promise<Job[]> => {

    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

    const textResponse = await response.text();

    if (!response.ok) {

        let errorMessage = `Request failed with status ${response.status}`;

        try {

            const parsed = JSON.parse(textResponse);

            if (parsed.error) {
                errorMessage = parsed.error;
            }
            
        } catch {
            // default message
        }

        throw new Error(errorMessage);
    }

    try {
        return JSON.parse(textResponse);
    } catch {
        throw new Error("Server did not return valid JSON");
    }

};

export const applyToJob = async (
    data: ApplyRequest
): Promise<{ ok: boolean }> => {

    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const textResponse = await response.text();

    if (!response.ok) {

        let errorMessage = `Request failed with status ${response.status}`;

        try {

            const parsed = JSON.parse(textResponse);

            if (parsed.error) {
                errorMessage = parsed.error;
            }
            
        } catch {
            // default message
        }

        throw new Error(errorMessage);

    }

    try {
        return JSON.parse(textResponse);
    } catch {
        throw new Error("Server did not return valid JSON");
    }

};