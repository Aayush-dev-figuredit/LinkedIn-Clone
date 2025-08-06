const BioSection = ({ bio }) => {
  return (
    <div className="bg-purple-100 p-4 rounded-xl shadow-sm mt-4">
      <h2 className="text-xl font-semibold mb-2">About</h2>
      <p className="text-gray-700">{bio}</p>
    </div>
  );
};

export default BioSection;
