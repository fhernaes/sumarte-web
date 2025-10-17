export function Button({ children, disabled, className = "", ...props }) {
  return (
    <button
      disabled={disabled}
      aria-busy={disabled}
      className={`bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition w-full disabled:opacity-50 ${
        disabled ? "cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
