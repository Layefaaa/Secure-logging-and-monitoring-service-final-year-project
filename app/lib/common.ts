import toast from "react-hot-toast";

interface ResponseMessage {
  secure?: string;
  unsecure?: string;
  unauthenticated?: string;
  failed?: string;
}

interface ResponseType {
  message?: ResponseMessage;
  status: number;
  callback?: () => void;
}

export const handleClientResponse = ({
  message,
  status,
  callback,
}: ResponseType) => {
  switch (status) {
    case 200:
      toast.success(message?.secure ?? "successful.", {
        style: {
          borderRadius: "8px",
          background: "#4caf50",
          color: "#fff",
        },
      });
      break;
      

    case 403:
        if (callback) callback();
        toast.error(message?.unsecure ?? "Access restricted.", {
        icon: "⚠️",
        style: {
          borderRadius: "8px",
          background: "#f44336",
          color: "#fff",
        },
      });
    
      break;

    case 401:
      toast.error(message?.unauthenticated ?? "Please log in to continue.", {
        icon: "🔒",
        style: {
          borderRadius: "8px",
          background: "#1a1621",
          color: "#fff",
        },
      });
      break;

    case 400:
      toast.error(message?.unauthenticated ?? "Bad request, try again", {
          icon: "🔒",
          style: {
            borderRadius: "8px",
            background: "#1a1621",
            color: "#fff",
          },
        });
      break;
  
    case 500:
      toast.error(
        message?.failed ??
          "An unexpected error occurred. Please try again later.",
        {
          icon: "❌",
          style: {
            borderRadius: "8px",
            background: "#1a1621",
            color: "#fff",
          },
        }
      );
      break;

    default:
      toast.error("An unknown error occurred.", {
        icon: "❓",
        style: {
          borderRadius: "8px",
          background: "#9e9e9e",
          color: "#fff",
        },
      });
      console.error(`Unhandled status code: ${status}`, message);
      break;
  }
};
