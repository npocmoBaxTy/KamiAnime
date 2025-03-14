import { ChangeEvent, FC } from "react";

interface ICustomInput {
  label: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type: string;
  className?: string;
  labelClassName?: string;
  value?: string;
  required?: boolean;
  withLabel?: boolean;
}

const Input: FC<ICustomInput> = ({
  label,
  type,
  placeholder,
  className,
  labelClassName,
  onChange,
  value,
  required,
  withLabel,
}) => {
  return (
    <div className="custom--input--block flex flex-col w-full">
      {withLabel && (
        <label
          htmlFor={label}
          className={`custom--input__label text-sm mb-1 bold-purple-text ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        onChange={onChange}
        required={required || false}
        value={value}
        className={`custom--input outline-none rounded-md p-2 border border-gray-300 ${className}`}
        type={type}
        id={label}
        placeholder={placeholder || ""}
      />
    </div>
  );
};

export default Input;
