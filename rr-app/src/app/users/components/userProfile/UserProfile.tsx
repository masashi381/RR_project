"use client";
import User from "@/components/common/User";
import { Button, BtnType } from "@/components/common/Button";
import React, { useContext, useRef } from "react";
import { DropDownContext } from "@/context/DropDownContext";
import DeleteAccount from "./DeleteAccount";
import { UserContext } from "@/context/UserContext";

const UserProfile = () => {
  const { changedTabs } = useContext(DropDownContext);
  const { user } = useContext(UserContext);
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="bg-accent">
      <h2 className="text-center text-3xl my-8">User Profile</h2>
      <div className="w-64 mx-auto mt-10">
        <User uid={user?._id} />
        <Button type={BtnType.submit} className="btn block mx-auto mt-10" onClick={() => changedTabs("userEdit")}>
          Edit
        </Button>
      </div>
      <div className="w-64 mt-48 mx-auto text-center">
        <a
          className="link link-warning"
          onClick={() => {
            if (modalRef.current) {
              modalRef.current.showModal();
            }
          }}
        >
          Delete account
        </a>
        <DeleteAccount modalRef={modalRef} />
      </div>
    </div>
  );
};

export default React.memo(UserProfile);
