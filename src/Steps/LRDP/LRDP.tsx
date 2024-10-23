import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";

import { CAFTOPLRDP } from "api/CAFTOP/types";
import { useLRDPPageValidation } from "utilities/Validations";
import * as Fields from "./Fields";
import { ICAFTOPWizardStep } from "Steps/Steps";
import { useCAFTOP } from "api/CAFTOP/useCAFTOP";
import { LRDP as LRDPDefault } from "api/CAFTOP/defaults";

const LRDPStep = (props: ICAFTOPWizardStep) => {
  const { globalState } = useContext(globalContext);
  const currentCAFTOP = useCAFTOP(globalState.id, "LRDP");

  const schema = useLRDPPageValidation();

  const myForm = useForm<CAFTOPLRDP>({
    defaultValues: LRDPDefault,
    values: currentCAFTOP.data,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const hasChanges = myForm.formState.isDirty;

  if (!currentCAFTOP.data || currentCAFTOP.isLoading) {
    return "Loading...";
  }

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
            void myForm.handleSubmit((data, e) => {
              void props.handleSubmit(hasChanges, data, e);
            }, props.handleError)(...args)
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

export default LRDPStep;
