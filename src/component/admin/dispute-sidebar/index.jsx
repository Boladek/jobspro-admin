import { SideWrapper } from "../../side-wrapper";
import PropTypes from "prop-types";
import { useState } from "react";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";
import { GigDetailsHook } from "../../../hooks/gig-details-hook";

export function DisputeSideBar({ open, handleClose, gig }) {
    const [step, setStep] = useState(1);
    const { gigDetails } = GigDetailsHook({ gigId: gig.uuid });

    return (
        <SideWrapper open={open} handleClose={handleClose}>
            {step === 1 && (
                <Step1 gotoNextStep={() => setStep(2)} gig={gigDetails} />
            )}
            {step === 2 && (
                <Step2
                    gotoNextStep={() => setStep(3)}
                    goBack={() => setStep(1)}
                    gigDetails={gigDetails}
                />
            )}
            {step === 3 && <Step3 goBack={() => setStep(2)} />}
        </SideWrapper>
    );
}

DisputeSideBar.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    gig: PropTypes.object,
};
