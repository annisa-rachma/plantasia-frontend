export default function AdditionalInput() {
  return (
    <>
      <div className="flex flex-row">
        <input
          type="text"
          // value={input.email}
          name="image"
          // onChange={handleChange}
          placeholder="Additional image url..."
          className="w-[85%] h-10 pl-4 mt-4 bg-white border border-black text-black text-md"
        />
        <div className="w-[15%] h-10 mt-4 cursor-pointer hover:underline grid content-center text-right">remove</div>
      </div>
    </>
  );
}
