import React from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

export default function FilterSection({
  title,
  name,
  toggle,
  showSection,
  optionValues,
  selectedValue,
  handleCheckboxChange,
}) {
  return (
    <div className="border-black border-b-2 py-4">
      <div
        className="flex justify-between items-center hover:cursor-pointer"
        onClick={toggle}
      >
        <h1 className="text-xl font-[Kinfolk-Serif-Text]">{title}</h1>
        <span>
          {showSection ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
        </span>
      </div>
      {showSection && (
        <div className="flex flex-col gap-1 mt-2">
          {optionValues.map((el) => {
            const checkBoxId = `${el.name}-${el.id}`;
            return (
              <div key={el.id} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id={checkBoxId}
                  name={name}
                  value={el.id}
                  checked={selectedValue.includes(String(el.id))}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 bg-black border-gray-300 focus:-ring-black-500 accent-black hover:cursor-pointer"
                ></input>
                <label htmlFor={checkBoxId} className="hover:cursor-pointer">
                  {el.name}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
