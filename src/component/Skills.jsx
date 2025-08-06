const SkillsSection = ({ skills }) => {
  return (
    <div className="bg-green-100 p-4 rounded-xl shadow-sm mt-4">
      <h2 className="text-xl font-semibold mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
