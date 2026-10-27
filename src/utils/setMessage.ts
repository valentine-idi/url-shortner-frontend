import type { Dispatch, SetStateAction } from "react";

interface statusMessage {
  error: string;
  success: string;
}

export default (
  status: "success" | "error",
  setStatusMessage: Dispatch<SetStateAction<statusMessage>>,
  message: string,
) => {
  const defaultStatusMessage = { success: "", error: "" };
  if (status === "success") {
    setStatusMessage({
      ...defaultStatusMessage,
      success: message,
    });
  } else {
    setStatusMessage({
      ...defaultStatusMessage,
      error: message,
    });
  }

  setTimeout(() => setStatusMessage({ ...defaultStatusMessage }), 2000);
};
