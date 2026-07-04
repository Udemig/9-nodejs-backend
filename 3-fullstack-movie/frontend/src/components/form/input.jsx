const Input = ({ name, label, min, max, step, type = "text" }) => {
  return (
    <div className="w-full relative">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        step={step}
        required
        className="block border-2 border-white/20 px-4 py-2 rounded-xl w-full focus:outline-none focus:ring-0 focus:border-purple-500 transition-all duration-300 hover:border-white/30 mt-2"
      />
    </div>
  );
};

export default Input;
