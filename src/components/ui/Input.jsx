const Input = ({
  className = "",
  ...props
}) => {
  return (
    <input
      className={`h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white ${className}`}
      {...props}
    />
  );
};

export default Input;