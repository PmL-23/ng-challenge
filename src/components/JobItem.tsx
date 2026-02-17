import type { Job } from "../types/types";

type JobItemProps = {
    job: Job;
    repoUrl: string;
    onRepoChange: (value: string) => void;
    onSubmit: () => void;
    isSubmitting: boolean;
    isSuccess: boolean;
    error?: string;
};

const JobItem = ({
    job,
    repoUrl,
    onRepoChange,
    onSubmit,
    isSubmitting,
    isSuccess,
    error,
}: JobItemProps) => {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginTop: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
            }}
        >
            <h3>{job.title}</h3>

            <input
                type="text"
                placeholder="GitHub Repository URL"
                value={repoUrl}
                onChange={(e) => onRepoChange(e.target.value)}
                disabled={isSuccess}
                style={{
                    marginRight: "1rem",
                    padding: "0.5rem",
                    width: "300px",
                }}
            />

            <button
                onClick={onSubmit}
                disabled={isSubmitting || isSuccess}
            >
                {isSubmitting
                    ? "Submitting..."
                    : isSuccess
                    ? "Submitted ✓"
                    : "Submit"}
            </button>

            {error && (
                <p
                    style={{
                        color: "#b00020",
                        marginTop: "0.5rem",
                        fontSize: "0.9rem",
                    }}
                >
                    {error}
                </p>
            )}

            {isSuccess && (
                <p
                    style={{
                        color: "green",
                        marginTop: "0.5rem",
                        fontSize: "0.9rem",
                    }}
                >
                    Application submitted successfully!
                </p>
            )}
        </div>
    );
};

export default JobItem;