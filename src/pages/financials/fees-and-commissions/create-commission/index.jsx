import PropTypes from "prop-types";
import { useState } from "react";
import { Modal } from "../../../../component/modal";
import { Location } from "./location";
import { Category } from "./category";
import { Tier } from "./tier";
import { FeesAndCommissions } from "./fees";
import { Distribution } from "./distribution";

const steps = [
  "Location",
  "Business Category",
  "Tier",
  "Fee and Commissions",
  "Cities Percentage",
];

export function CreateCommissions({ handleClose }) {
  const [form, setForm] = useState(null);
  const [step, setStep] = useState(steps[0]);
  return (
    <Modal handleClose={handleClose} maxWidth={850}>
      <div>
        <div className="flex justify-between items-center px-4">
          {steps.map((item) => (
            <div
              key={item}
              className={`text-[#565353] text-[10px] cursor-pointer p-2 px-4 rounded-md ${
                item === step ? "bg-[#F3F5F3]" : ""
              }`}
              // onClick={() => setStep(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {step === steps[0] && (
        <Location
          gotoNext={() => setStep(steps[1])}
          handleForm={(arg) => setForm((prev) => ({ ...prev, ...arg }))}
          form={form}
        />
      )}

      {step === steps[1] && (
        <Category
          goBack={() => setStep(steps[0])}
          gotoNext={() => setStep(steps[2])}
          handleForm={(arg) => setForm((prev) => ({ ...prev, ...arg }))}
          form={form}
        />
      )}

      {step === steps[2] && (
        <Tier
          goBack={() => setStep(steps[1])}
          gotoNext={() => setStep(steps[3])}
          handleForm={(arg) => setForm((prev) => ({ ...prev, ...arg }))}
          form={form}
        />
      )}

      {step === steps[3] && (
        <FeesAndCommissions
          goBack={() => setStep(steps[2])}
          gotoNext={() => setStep(steps[4])}
          handleForm={(arg) => setForm((prev) => ({ ...prev, ...arg }))}
          form={form}
        />
      )}

      {step === steps[4] && (
        <Distribution
          goBack={() => setStep(steps[3])}
          handleForm={(arg) => setForm((prev) => ({ ...prev, ...arg }))}
          form={form}
        />
      )}
    </Modal>
  );
}

CreateCommissions.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
