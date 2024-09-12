import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";

import { CAFTOPLRDP } from "api/CAFTOP";
import { useLRDPPageValidation } from "utilities/Validations";
import * as Fields from "./Fields/Fields";
import { ICAFTOPWizardStep } from "Steps/Steps";

const LRDP = (props: ICAFTOPWizardStep) => {
  const { globalState, dispatch } = useContext(globalContext);
  const currentCAFTOP = { ...globalState.LRDP };

  const submitSuccess: SubmitHandler<CAFTOPLRDP> = (data, e?) => {
    dispatch({
      type: "MERGE_GLOBAL_OPTION",
      payload: { LRDP: { ...data } },
    });
    props.handleSubmit(e);
  };

  const schema = useLRDPPageValidation();

  const myForm = useForm<CAFTOPLRDP>({
    values: currentCAFTOP,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  if (globalState.mode === "submit") {
    void myForm.trigger();
  }

  return (
    <>
      <Title1>
        Logistics Requirements Destermination Process (LRDP) Task Prioritization
      </Title1>
      <FormProvider {...myForm}>
        <form
          id="innerForm"
          onSubmit={(...args) =>
            void myForm.handleSubmit(submitSuccess, props.handleError)(...args)
          }
        >
          <div className="requestFormContainer">
            <Fields.LRDP />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default LRDP;
