import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPImprovements } from "api/CAFTOP/types";
import * as Fields from "./Fields";
import { useImprovementsPageValidation } from "utilities/Validations";
import { ICAFTOPWizardStep } from "Steps/Steps";
import { useCAFTOP } from "api/CAFTOP/useCAFTOP";
import { Improvements as ImprovementsDefaults } from "api/CAFTOP/defaults";

const Improvements = (props: ICAFTOPWizardStep) => {
  const { globalState } = useContext(globalContext);
  const currentCAFTOP = useCAFTOP(globalState.id, "Improvements");

  const schema = useImprovementsPageValidation();

  const myForm = useForm<CAFTOPImprovements>({
    defaultValues: ImprovementsDefaults,
    values: currentCAFTOP.data,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  if (!currentCAFTOP.data) {
    return "Loading...";
  }

  return (
    <>
      <Title1>Improvements</Title1>
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
            <Fields.Improvements />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Improvements;
