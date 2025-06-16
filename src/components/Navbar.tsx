interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ search, setSearch }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="text-xl font-bold">Welcome User</div>
      <input
        type="text"
        className="bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
      />
    </nav>
  );
};


export default Navbar;
