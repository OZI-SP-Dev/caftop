import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "@stateManagement/GlobalStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CAFTOPDistribution, isNotElectronicOnly } from "@api/CAFTOP/types";
import { useDistributionPageValidation } from "@utilities/Validations";
import * as Fields from "./Fields";
import { useCAFTOP } from "@api/CAFTOP/useCAFTOP";
import { ICAFTOPWizardStep } from "@steps/Steps";
import { Distribution as DistributionDefaults } from "@api/CAFTOP/defaults";

const Distribution = (props: ICAFTOPWizardStep) => {
  const { globalState } = useContext(globalContext);
  const currentCAFTOP = useCAFTOP(globalState.id, "Distribution");

  const notElectronicOnly = currentCAFTOP.data
    ? isNotElectronicOnly(currentCAFTOP.data)
    : false;

  const schema = useDistributionPageValidation(notElectronicOnly);

  const myForm = useForm<CAFTOPDistribution>({
    defaultValues: DistributionDefaults,
    values: currentCAFTOP.data,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const hasChanges = myForm.formState.isDirty;

  if (!currentCAFTOP.data) {
    return <>Loading...</>;
  }

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
            void myForm.handleSubmit((data, e) => {
              void props.handleSubmit(hasChanges, data, e);
            }, props.handleError)(...args)
          }
        >
          {notElectronicOnly ? (
            <>
              <div className="requestFormContainer">
                <Fields.DistCost />
              </div>
              <div className="requestFieldContainer">
                <Fields.DSO />
              </div>
              <Fields.OutsideDSO />
            </>
          ) : (
            "There is no Distribution as this CAFTOP is Electronic Only"
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default Distribution;
