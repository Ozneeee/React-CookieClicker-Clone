const Primary = ({ value, center, onClick }) => {
  return (
    <div
      className={`h-fit w-fit bg-[#f1f1f1] py-1 px-8 rounded-lg text-sm font-semi-bold select-none cursor-pointer shadow-second ${
        center && "mx-auto"
      }`}
      onClick={() => onClick()}
    >
      <p>{value}</p>
    </div>
  );
};

export { Primary };
