"use client";

export enum TextType {
  text,
  password,
  email,
  question,
}

export type TextProps = {
  textType: TextType;
  className?: string;
  placeholder?: string;
  value?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input(props: TextProps) {
  let type = "";
  switch (props.textType) {
    case TextType.text:
      type = "text";
      break;
    case TextType.password:
      type = "password";
      break;
    case TextType.email:
      type = "email";
      break;
    case TextType.question:
      type = "text";
      break;
    default:
      type = "text";
      break;
  }

  const RRText = (
    <input
      type={type}
      value={props.value}
      placeholder={props.placeholder}
      className={` ${props.className} input input-bordered w-64  mb-4`}
      onChange={props.onChange}
      name={props.name}
    />
  );
  if (props.textType === TextType.question) {
    return (
      <label className="input input-bordered flex items-center gap-2 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          className={`${props.className} grow`}
          placeholder={props.placeholder}
          onChange={props.onChange}
          name={props.name}
        />
        {/* {RRText} */}
      </label>
    );
  } else {
    return RRText;
  }
}
