import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  label: string;
}

const Fieldset: FC<Props> = ({ children, label }) => {
  return (
    <fieldset>
      <label className="block text-sm mb-1">
        {label}{" "}
        <span className="text-red-500" title="zorunlu">
          *
        </span>
      </label>

      {children}
    </fieldset>
  );
};

export default Fieldset;
