import { useContext } from "react";
import { Title1, Title2 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPInfo } from "api/CAFTOP/types";
import * as Fields from "./Fields";
import { useInfoPageValidation } from "utilities/Validations";
import { ICAFTOPWizardStep } from "Steps/Steps";

const Info = (props: ICAFTOPWizardStep) => {
  const { globalState, dispatch } = useContext(globalContext);
  const currentCAFTOP = globalState.Info;

  const submitSuccess: SubmitHandler<CAFTOPInfo> = (data, e?) => {
    dispatch({ type: "MERGE_GLOBAL_OPTION", payload: { Info: { ...data } } });
    props.handleSubmit(e);
  };

  const schema = useInfoPageValidation();

  const myForm = useForm<CAFTOPInfo>({
    defaultValues: currentCAFTOP,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <>
      <Title1>CAFTOP Information Page</Title1>
      <Title2>General CAFTOP Selections...</Title2>

      <FormProvider {...myForm}>
        <form
          id="innerForm"
          onSubmit={(...args) =>
            void myForm.handleSubmit(submitSuccess, props.handleError)(...args)
          }
        >
          <div className="requestFormContainer">
            <div className="requestFieldContainer">
              <Fields.ProgramGroup />
            </div>
            <div className="requestFieldContainer">
              <Fields.ProgramName />
            </div>
            <div className="requestFieldContainer">
              <Fields.ProgramElementCode />
            </div>
            <div className="requestFieldContainer">
              <Fields.LeadCommand />
            </div>
            <div className="requestFieldContainer">
              <Fields.Center />
            </div>
            <div className="requestFieldContainer">
              <Fields.PreparingBase />
            </div>
            <div className="requestFieldContainer">
              <Fields.PreparingOffice />
            </div>
            <div className="requestFieldContainer">
              <Fields.ProgramManagers />
            </div>
            <div className="requestFieldContainer">
              <Fields.TechOrderManager />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Info;
