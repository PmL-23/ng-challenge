import { useEffect, useState } from "react";
import type { Candidate, Job } from "../types/types";
import { getCandidateByEmail, getJobs, applyToJob } from "../api/api";
import JobItem from "./JobItem";
import StatusMessage from "../components/StatusMessage";
import { Loader2 } from "lucide-react";

const JobList = () => {

    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [repoUrls, setRepoUrls] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submittingJobId, setSubmittingJobId] = useState<string | null>(null);
    const [submitErrors, setSubmitErrors] = useState<Record<string, string>>({});
    const [submitSuccess, setSubmitSuccess] = useState<Record<string, boolean>>({});

    const fetchData = async () => {

        try {

            setLoading(true);

            const candidateData = await getCandidateByEmail();
            const jobsData = await getJobs();

            setCandidate(candidateData);
            setJobs(jobsData);

        } catch (err: unknown) {

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchData();

    }, []);

    const isValidGithubRepoUrl = (url: string): boolean => {
        try {
            const parsed = new URL(url);

            // Must be https
            if (parsed.protocol !== "https:") return false;

            // Must be github.com
            if (parsed.hostname !== "github.com") return false;

            // Must have format /user/repo
            const pathParts = parsed.pathname.split("/").filter(Boolean);

            if (pathParts.length !== 2) return false;

            return true;

        } catch {
            return false;
        }
    };

    const handleInputChange = (jobId: string, value: string) => {

        setSubmitErrors((prev) => ({
            ...prev,
            [jobId]: "",
        }));

        setRepoUrls((prev) => ({
            ...prev,
            [jobId]: value,
        }));

    };

    const handleSubmit = async (jobId: string) => {

        if (!candidate) return;

        const repoUrl = repoUrls[jobId];

        if (!repoUrl) {

            setSubmitErrors((prev) => ({
                ...prev,
                [jobId]: "Please enter a repository URL",
            }));

            return;
        }

        if (!isValidGithubRepoUrl(repoUrl)) {

            setSubmitErrors((prev) => ({
                ...prev,
                [jobId]: "Please enter a valid GitHub repository URL (https://github.com/user/repo)",
            }));

            return;
        }

        try {

            setSubmittingJobId(jobId);

            await applyToJob({
                uuid: candidate.uuid,
                jobId,
                candidateId: candidate.candidateId,
                applicationId: candidate.applicationId,
                repoUrl,
            });

            setSubmitSuccess((prev) => ({
                ...prev,
                [jobId]: true,
            }));

        } catch (err: unknown) {

            const message = err instanceof Error
                ? err.message
                : "An unexpected error occurred";

            setSubmitErrors((prev) => ({
                ...prev,
                [jobId]: message,
            }));

        } finally {

            setSubmittingJobId(null);

        }

    };

    return (

        <div>

            {loading && (
                <div style={{ marginTop: "1rem" }}>
                    <Loader2
                    style={{
                        width: "24px",
                        height: "24px",
                        animation: "spin 1s linear infinite",
                    }}
                    />
                    <p>Loading...</p>
                </div>
            )}

            {!loading && error && (
                <StatusMessage
                    type="error"
                    message={error}
                    onRetry={fetchData}
                />
            )}

            {!loading && !error && jobs.length === 0 && (
                <StatusMessage
                    type="info"
                    message="There are currently no open positions."
                />
            )}

            { !loading && !error && (jobs.length > 0) && (
                <>
                    <span>Our open positions:</span>

                    {jobs.map((job) => (
                        <JobItem
                            key={job.id}
                            job={job}
                            repoUrl={repoUrls[job.id] || ""}
                            onRepoChange={(value) =>
                                handleInputChange(job.id, value)
                            }
                            onSubmit={() => handleSubmit(job.id)}
                            isSubmitting={submittingJobId === job.id}
                            isSuccess={submitSuccess[job.id]}
                            error={submitErrors[job.id]}
                        />
                    ))}
                </>
                
            )}

        </div>
    );
};

export default JobList;