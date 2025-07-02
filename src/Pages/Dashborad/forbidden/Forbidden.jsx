import { Link } from "react-router";
import { FaBan } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-base-200 px-4">
      <FaBan className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold mb-2 text-error">Access Denied</h1>
      <p className="text-gray-600 mb-6">
        You do not have permission to access this page.
      </p>
      <Link to="/">
        <button className="btn btn-primary text-black">Go Home</button>
      </Link>
    </div>
  );
};

export default Forbidden;
