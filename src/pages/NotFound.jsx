import { Ban } from "lucide-react";

function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center w-screen bg-dark text-bolder">
      <span className="text-red-500  flex-1">
        <Ban size={30} />
        <span className="ml-1">Please provide a valid route</span>
      </span>
    </div>
  );
}

export default NotFound;
