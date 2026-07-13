const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-stone-700">{label}</label>

      {children}
    </div>
  );
};

export default Field;
