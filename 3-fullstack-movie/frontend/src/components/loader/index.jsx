import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-100">
      <LoaderCircle className="text-purple-500 animate-spin size-8" />
    </div>
  );
};

export default Loader;
