import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BaseSelect } from "../../../../component/select";
import { SquareButton } from "../../../../component/square-button";
import Select from "react-select";
import { BaseInput } from "../../../../component/input";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export function FeesAndCommissions({ gotoNext, handleForm, form, goBack }) {
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
    gotoNext();
  };

  return (
    <form
      className="w-full max-w-[500px] grid grid-cols-1 gap-4 mx-auto p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center">
        <p className="text-[12px] font-[700]">Fees and Commissions</p>
        <p className="text-[10px] text-[#565454]">
          Make edits to country and region
        </p>
      </div>
      <div>
        <div>
          <BaseInput label="Low Range" type="number" />
        </div>
        <div>
          <BaseInput label="High Range" type="number" />
        </div>
      </div>

      <div>
        <BaseInput label="Commission" type="number" />
      </div>
      <div className="bg-[#FFF8CD] text-[#7B7977] p-4 rounded-[8px] text-[12px] py-6">
        <p>Note</p>
        <p className="text-[10px]">
          Fees and commissions will be applied to the category entertainment ,
          sub category sound and two others, in the country Nigeria
        </p>
      </div>
      <div className="flex pt-8 gap-4">
        <div className="w-1/2">
          <SquareButton variant="sec" onClick={goBack} type="button">
            Back
          </SquareButton>
        </div>
        <div className="w-1/2">
          <SquareButton>Next</SquareButton>
        </div>
      </div>
    </form>
  );
}

FeesAndCommissions.propTypes = {
  gotoNext: PropTypes.func.isRequired,
  handleForm: PropTypes.func.isRequired,
  form: PropTypes.object,
  goBack: PropTypes.func.isRequired,
};
