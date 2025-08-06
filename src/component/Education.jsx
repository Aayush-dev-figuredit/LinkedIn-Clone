const EducationSection = ({ education }) => {
  return (
    <div className="bg-blue-100 p-4 rounded-xl shadow-sm mt-4 text-black">
      <h2 className="text-xl font-semibold mb-2">Education</h2>
      <p className="list-disc pl-5">
       {education ? education:"No education available"}
      </p>
    </div>
  );
};

export default EducationSection;
