import PropTypes from "prop-types";

export const Input = ({
  title,
  placeholder,
  type,
  status,
  name,
  value,
  onChange,
}) => {
  const handleInputChange = (event) => {
    const v = event.target.value;
    onChange(name, v);
  };

  return (
    <div>
      <label htmlFor={name} className="ml-1 text-sm font-light text-gray-600">
        {title + ":"}
      </label>
      {type === "radio" ? (
        status === "read" ? (
          <div className="flex h-8 w-full flex-row items-center justify-between rounded-lg bg-[#E3EDF9] px-4 py-2 text-xs text-gray-500">
            <label className="flex cursor-pointer items-center gap-1">
              <input
                type="radio"
                name={name}
                value="male"
                disabled={status === "read"}
                onChange={handleInputChange}
                className="h-4 w-4 cursor-pointer appearance-none overflow-hidden rounded-full border-2 border-[#D9D9D9] bg-[#D9D9D9] checked:bg-[#5DA646]"
                checked={value === "male"}
              />
              <h3 className="">Male</h3>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <input
                type="radio"
                name={name}
                value="female"
                disabled={status === "read"}
                onChange={handleInputChange}
                className="h-4 w-4 cursor-pointer appearance-none overflow-hidden rounded-full border-2 border-[#D9D9D9] bg-[#D9D9D9] checked:bg-[#5DA646]"
                checked={value === "female"}
              />
              <h3>Female</h3>
            </label>
          </div>
        ) : (
          <div className="flex h-8 w-full flex-row items-center justify-between rounded-lg bg-[#E3EDF9] px-4 py-2 text-xs text-gray-500">
            <label className="flex cursor-pointer items-center gap-1">
              <input
                type="radio"
                name={name}
                value="male"
                disabled={status === "read"}
                onChange={handleInputChange}
                className="h-4 w-4 cursor-pointer appearance-none overflow-hidden rounded-full border-2 border-[#D9D9D9] bg-[#D9D9D9] checked:bg-[#5DA646]"
                checked={value === "male"}
              />
              <h3 className="">Male</h3>
            </label>
            <label className="flex cursor-pointer items-center gap-1">
              <input
                type="radio"
                name={name}
                value="female"
                disabled={status === "read"}
                onChange={handleInputChange}
                className="h-4 w-4 cursor-pointer appearance-none overflow-hidden rounded-full border-2 border-[#D9D9D9] bg-[#D9D9D9] checked:bg-[#5DA646]"
                checked={value === "female"}
              />
              <h3>Female</h3>
            </label>
          </div>
        )
      ) : (
        <input
          id={name}
          disabled={status === "read"}
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder || "Enter......"}
          className={`${title === "Name" ? "h-10 text-base" : "h-8 text-xs"} w-full rounded-lg bg-[#E3EDF9] px-4 py-2 text-gray-500`}
        />
      )}
    </div>
  );
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["read", "edit", "add"]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
