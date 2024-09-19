"use client";
import { Button, BtnType } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";
import React, { useContext, useState, RefObject, forwardRef } from "react";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import { getAuth, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

interface DeleteAccountProps {
  modalRef: RefObject<HTMLDialogElement>;
}

const DeleteAccount = forwardRef<HTMLDialogElement, DeleteAccountProps>(({ modalRef }, ref) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [reauthenticate, setReauthenticate] = useState(false);
  const [password, setPassword] = useState("");

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const auth = getAuth();

    if (user) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const email = currentUser.email;
        if (email) {
          const credential = EmailAuthProvider.credential(email, password);
          try {
            // Require that the user has recently signed in.
            await reauthenticateWithCredential(currentUser!, credential);

            //Delete users account from mongoDB
            await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/users/${user?._id}`);

            await deleteUser(currentUser!).then(() => {
              console.log("User deleted successfully");

              router.push("/");
            });
          } catch (error) {
            console.error("Error deleting user:", error);
          }
        }
      }
    }
  };
  return (
    <dialog ref={ref || modalRef} className="modal" id="modalDelete">
      <div className="modal-box">
        <div className="flex items-center justify-center">
          <FaExclamationTriangle className="text-warning mr-2 text-xl" />
          <p className="py-4 text-xl">Do you really want to delete your account?</p>
        </div>
        {reauthenticate && (
          <div className="flex flex-col items-center">
            <input
              type="password"
              placeholder="Re-enter your password"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <div className="flex justify-around mt-2">
          <div className="modal-action m-0">
            <form method="dialog" onSubmit={() => setReauthenticate(false)}>
              {/* if there is a button in form, it will close the modal */}
              <Button type={BtnType.cancel}>Cancel</Button>
            </form>
          </div>
          <div>
            {!reauthenticate && (
              <Button type={BtnType.delete} onClick={() => setReauthenticate(true)}>
                Confirm
              </Button>
            )}

            {reauthenticate && (
              <Button type={BtnType.delete} onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
});
DeleteAccount.displayName = "DeleteAccount";
export default React.memo(DeleteAccount);
