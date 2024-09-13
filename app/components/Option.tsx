import { LanguageSelectProps } from "../type/type";

export const Options: React.FC<LanguageSelectProps> = ({
  label,
  data,
  name,
  id,
  defaultSelected,
}) => {
  return (
    <>
      <label htmlFor={label}></label>
      <select
        className="m-1 cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-menu dark:hover:bg-slate-700"
        name={name}
        id={id}
      >
        <option selected disabled className="text-start">
          {defaultSelected}
        </option>
        {Object.entries(data).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default Options;
