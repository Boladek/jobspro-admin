import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BaseSelect } from "../../../../component/select";
import { SquareButton } from "../../../../component/square-button";
import Select from "react-select";
import { BaseInput } from "../../../../component/input";
import { use } from "react";
import { generateArray } from "../../../../helpers/function";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const ranges = ["Range Low", "Range High"];

export function Distribution({ handleForm, form, goBack }) {
  const [range, setRange] = useState(ranges[0]);
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    // register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // reset();
    // gotoNext();
  };

  return (
    <form
      className="w-full grid grid-cols-1 gap-4 mx-auto py-8 px-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-[#FFF8CD] text-[#7B7977] p-4 rounded-[8px] text-[12px] flex items-center justify-between">
        <p>Note</p>
        <div>
          <p className="text-[10px] font-[400]">Country</p>
          <p className="text-[10px] font-[700]">Nigeria</p>
        </div>
        <div>
          <p className="text-[10px] font-[400]">State</p>
          <p className="text-[10px] font-[700]">Lagos</p>
        </div>
        <div>
          <p className="text-[10px] font-[400]">Category</p>
          <p className="text-[10px] font-[700]">Enterntainment</p>
        </div>
        <div>
          <p className="text-[10px] font-[400]">Sub-Category</p>
          <p className="text-[10px] font-[700]">Musician</p>
        </div>
        <div>
          <p className="text-[10px] font-[400]">State Base Fee</p>
          <p className="text-[10px] font-[700]">NGN 20,000</p>
        </div>
        <div>
          <p className="text-[10px] font-[400]">JobsPro Commission</p>
          <p className="text-[10px] font-[700]">20%</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            className="w-full p-3 rounded-full border border-[#D3D3D3] text-[11px] text-center"
            placeholder="Search by name"
          />
        </div>
        <div className="max-w-[250px] w-full flex items-center text-[12px] text-[#1A68FF]">
          {ranges.map((item) => (
            <div
              key={item}
              className={`${
                item === range ? "bg-[#E5EEFF]" : ""
              } font-[500] px-6 py-2 rounded-full cursor-pointer`}
              onClick={() => setRange(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <table>
        <thead className="bg-[#1A68FF] text-white text-[12px]">
          <tr>
            <th className="p-2">Cities</th>
            <th className="p-2">Range</th>
            <th className="p-2">Rating 1</th>
            <th className="p-2">Rating 2</th>
            <th className="p-2">Rating 3</th>
            <th className="p-2">Rating 4</th>
            <th className="p-2">Rating 5</th>
          </tr>
        </thead>
        <tbody>
          {generateArray(8).map(() => (
            <tr key={Math.random()}>
              <td className="p-2">City</td>
              <td className="p-2">
                <input
                  type="number"
                  className="w-[80px] text-[10px] p-1 rounded-md bg-[#ECECEC] border-none px-2 text-[12px] text-center"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  className="w-[80px] text-[10px] p-1 rounded-md bg-[#ECECEC] border-none px-2 text-[12px] text-center"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  className="w-[80px] text-[10px] p-1 rounded-md bg-[#ECECEC] border-none px-2 text-[12px] text-center"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  className="w-[80px] text-[10px] p-1 rounded-md bg-[#ECECEC] border-none px-2 text-[12px] text-center"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  className="w-[80px] text-[10px] p-1 rounded-md bg-[#ECECEC] border-none px-2 text-[12px] text-center"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  className="w-[80px] text-[10px] p-1 rounded-md bg-[#ECECEC] border-none px-2 text-[12px] text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex pt-8 gap-4 max-w-[500px] w-full mx-auto">
        <div className="w-1/2">
          <SquareButton variant="sec" onClick={goBack} type="button">
            Back
          </SquareButton>
        </div>
        <div className="w-1/2">
          <SquareButton>Create Fee and Commission</SquareButton>
        </div>
      </div>
    </form>
  );
}

Distribution.propTypes = {
  gotoNext: PropTypes.func.isRequired,
  handleForm: PropTypes.func.isRequired,
  form: PropTypes.object,
  goBack: PropTypes.func.isRequired,
};
