import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPLabor } from "api/CAFTOP";
import * as Fields from "./Fields/Fields";
import { useLaborPageValidation } from "utilities/Validations";
import { ICAFTOPWizardStep } from "Steps/Steps";

const Labor = (props: ICAFTOPWizardStep) => {
  const { globalState, dispatch } = useContext(globalContext);
  const currentCAFTOP = globalState.Labor;

  const submitSuccess: SubmitHandler<CAFTOPLabor> = (data, e?) => {
    dispatch({ type: "MERGE_GLOBAL_OPTION", payload: { Labor: { ...data } } });
    props.handleSubmit(e);
  };

  const schema = useLaborPageValidation();

  const myForm = useForm<CAFTOPLabor>({
    defaultValues: currentCAFTOP,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <>
      <Title1>Labor</Title1>
      <FormProvider {...myForm}>
        <form
          id="innerForm"
          onSubmit={(...args) =>
            myForm.handleSubmit(submitSuccess, props.handleError)(...args)
          }
        >
          <div className="requestFormContainer">
            <Fields.AdditionalLabor />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Labor;
