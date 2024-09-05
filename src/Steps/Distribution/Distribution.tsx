import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";

import { CAFTOPDistribution, isNotElectronicOnly } from "api/CAFTOP";
import { useDistributionPageValidation } from "utilities/Validations";
import * as Fields from "./Fields/Fields";
import { ICAFTOPWizardStep } from "Steps/Steps";

const Distribution = (props: ICAFTOPWizardStep) => {
  const { globalState, dispatch } = useContext(globalContext);
  const currentCAFTOP = { ...globalState.Distribution };
  const notElectronicOnly = isNotElectronicOnly(globalState);

  const submitSuccess: SubmitHandler<CAFTOPDistribution> = (data, e?) => {
    dispatch({
      type: "MERGE_GLOBAL_OPTION",
      payload: { Distribution: { ...data } },
    });
    props.handleSubmit(e);
  };

  const schema = useDistributionPageValidation();

  const myForm = useForm<CAFTOPDistribution>({
    values: currentCAFTOP,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  if (globalState.mode === "submit") {
    void myForm.trigger();
  }

  return (
    <>
      <Title1>Distribution</Title1>
      <FormProvider {...myForm}>
        <form
          id="innerForm"
          onSubmit={(...args) =>
            void myForm.handleSubmit(submitSuccess, props.handleError)(...args)
          }
        >
          <div className="requestFormContainer">
            <Fields.DistCost />
          </div>
          {notElectronicOnly && (
            <>
              <div className="requestFieldContainer">
                <Fields.DSO />
              </div>
              <Fields.OutsideDSO />
            </>
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default Distribution;
