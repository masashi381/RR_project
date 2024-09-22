export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/invalid-email":
      return " Incorrect email or password";
    case "auth/invalid-credential":
      return " Incorrect email or password";
    case "auth/email-already-in-use":
      return " This email is already registered";
    case "auth/weak-password":
      return "Password must be at least 6 characters long";
    case "auth/missing-password":
      return " Please enter a password";
    case "auth/user-not-found":
      return " User not found. Please sign up first.";
    default:
      return "Unexpected error. Please contact admin.";
  }
};
