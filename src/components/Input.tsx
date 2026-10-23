import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type RegisterPostData } from "../services/services";

interface Props {
  className: string;
  placeholder: string;
  type: "name" | "email" | "password";
  register: UseFormRegister<RegisterPostData>;
  errors: FieldErrors<RegisterPostData>;
}

function Input({ className, register, type, errors, placeholder }: Props) {
  return (
    <>
      <label htmlFor={type}>
        {type.charAt(0).toUpperCase()}
        {type.slice(1)}
      </label>
      <input
        id={type}
        type={type === "name" ? "text" : type}
        placeholder={placeholder}
        {...register(type)}
      />
      {errors[type] && <p className={className}>{errors[type].message}</p>}
    </>
  );
}

export default Input;
