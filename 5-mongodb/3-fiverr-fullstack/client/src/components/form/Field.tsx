import type { FC } from "react";

interface Props {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  multiple?: boolean;
  options?: string[];
}

const Field: FC<Props> = ({
  label,
  name,
  type,
  required = true,
  disabled,
  placeholder,
  min,
  max,
  multiple,
  options,
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="text-sm font-medium text-gray-900">
        {label}
      </label>

      {type === "select" ? (
        <select id={name} name={name} required={required} disabled={disabled} className="field">
          {options?.map((item, key) => (
            <option key={key} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className="field min-h-25 max-h-62.5"
        />
      ) : (
        <input
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          min={min}
          max={max}
          multiple={multiple}
          type={type}
          className="field"
        />
      )}
    </div>
  );
};

export default Field;
