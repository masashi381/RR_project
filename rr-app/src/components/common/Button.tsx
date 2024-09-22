"use client";
import { ReactNode } from "react";
export enum BtnType {
  submit, // login, signup, next, etc...
  regular_google, // google login, signup, etc...
  cancel,
  delete,
  logIn,
}

export type BtnProps = {
  type?: BtnType;
  className?: string;
  isSubmit?: boolean;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

// button styles
const SUBMIT_STYLE = "btn btn-primary sm:btn-wide text-white text-base mb-4 ";
const REGULAR_GOOGLE_STYLE = "btn btn-outline btn-primary btn-wide text-base mb-4 ";
const CANCEL_STYLE = "btn btn-outline btn-error text-base mb-4 ";
const DELETE_STYLE = "btn bg-outline btn-warning text-white text-base mb-4 ";
const LOGIN_STYLE = "btn btn-secondary btn-md text-black text-base";

export const Button = (props: BtnProps) => {
  //change button style
  let btnClass = "";
  switch (props.type) {
    case BtnType.submit:
      btnClass = SUBMIT_STYLE;
      break;
    case BtnType.regular_google:
      btnClass = REGULAR_GOOGLE_STYLE;
      break;
    case BtnType.cancel:
      btnClass = CANCEL_STYLE;
      break;
    case BtnType.delete:
      btnClass = DELETE_STYLE;
      break;
    case BtnType.logIn:
      btnClass = LOGIN_STYLE;
      break;
  }
  btnClass += `${props.className ?? ""}`;

  return (
    <button className={btnClass} onClick={props.onClick} type={props.isSubmit ? "submit" : "button"}>
      {props.children}
    </button>
  );
};
