type StatusMessageProps = {
  type: "error" | "info";
  message: string;
  onRetry?: () => void;
};

const StatusMessage = ({ type, message, onRetry }: StatusMessageProps) => {
  return (
    <div
      style={{
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "6px",
        backgroundColor: type === "error" ? "#ffe5e5" : "#e5f0ff",
        color: type === "error" ? "#b00020" : "#003366",
        border: "1px solid",
      }}
    >
      <p style={{ margin: 0 }}>{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{ marginTop: "0.5rem" }}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default StatusMessage;