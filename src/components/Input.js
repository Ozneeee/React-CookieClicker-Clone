import React from "react";

const Primary = ({ label, placeholder, onChange, type, value, error }) => {
  return (
    <div className="w-full">
      <p className="text-black bg-transparent text-sm">{label}</p>
      {error ? <p className="text-[#CD1818]">{error}</p> : null}
      <div className="mt-1">
        <input
          value={value}
          type={type || "text"}
          className="w-full bg-red border-1 border-black border-solid rounded-md p-1 text-blue text-sm placeholder:text-yellow"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export { Primary };
