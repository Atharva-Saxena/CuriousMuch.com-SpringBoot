import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">CuriousMuch.com</Link>
        <div>
          <Link to="/questions" className="mx-2 text-gray-700 hover:text-primary">Questions</Link>
          <Link to="/users" className="mx-2 text-gray-700 hover:text-primary">Users</Link>
          {/* Add login/register links here */}
        </div>
      </div>
    </nav>
  );
}