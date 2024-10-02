import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPLabor } from "api/CAFTOP/types";
import * as Fields from "./Fields";
import { useLaborPageValidation } from "utilities/Validations";
import { ICAFTOPWizardStep } from "Steps/Steps";
import { Labor as LaborDefaults } from "api/CAFTOP/defaults";
import { useCAFTOP } from "api/CAFTOP/useCAFTOP";

const Labor = (props: ICAFTOPWizardStep) => {
  const { globalState } = useContext(globalContext);
  const currentCAFTOP = useCAFTOP(globalState.id, "Labor");

  const schema = useLaborPageValidation();

  const myForm = useForm<CAFTOPLabor>({
    defaultValues: LaborDefaults,
    values: currentCAFTOP.data,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  if (!currentCAFTOP.data) {
    return "Loading...";
  }

  if (globalState.mode === "submit") {
    void myForm.trigger();
  }

  return (
    <>
      <Title1>Labor</Title1>
      <FormProvider {...myForm}>
        <form
          id="innerForm"
          onSubmit={(...args) =>
            void myForm.handleSubmit(
              props.handleSubmit,
              props.handleError
            )(...args)
          }
        >
          <div className="requestFormContainer">
            <div className="requestFieldContainer">
              <Fields.LaborType />
            </div>
            <Fields.OrganicSupport />
            <Fields.ContractorSupport />
            <Fields.MILSTD3048 />
            <Fields.AdditionalLabor />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Labor;
