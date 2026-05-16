const CommandItem = ({ icon, title, description, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-left transition hover:bg-slate-100"
    >
      {/* Icon */}
      <div className="mt-1 rounded-xl bg-slate-100 p-3 text-slate-700">
        {icon}
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </button>
  );
};

export default CommandItem;
