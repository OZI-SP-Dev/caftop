import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPImprovements } from "api/CAFTOP/types";
import * as Fields from "./Fields";
import { useImprovementsPageValidation } from "utilities/Validations";
import { ICAFTOPWizardStep } from "Steps/Steps";

const Improvements = (props: ICAFTOPWizardStep) => {
  const { globalState, dispatch } = useContext(globalContext);
  const currentCAFTOP = globalState.Improvements;

  const submitSuccess: SubmitHandler<CAFTOPImprovements> = (data, e?) => {
    dispatch({
      type: "MERGE_GLOBAL_OPTION",
      payload: { Improvements: { ...data } },
    });
    props.handleSubmit(e);
  };

  const schema = useImprovementsPageValidation();

  const myForm = useForm<CAFTOPImprovements>({
    defaultValues: currentCAFTOP,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <>
      <Title1>Improvements</Title1>
      <FormProvider {...myForm}>
        <form
          id="innerForm"
          onSubmit={(...args) =>
            void myForm.handleSubmit(submitSuccess, props.handleError)(...args)
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
