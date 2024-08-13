import { useContext } from "react";
import { Title1, Title2 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPInfo } from "api/CAFTOP";
import { ProgramGroup } from "./Fields/ProgramGroup";
import { ProgramName } from "./Fields/ProgramName";
import { ProgramElementCode } from "./Fields/ProgramElementCode";
import { useInfoPageValidation } from "utilities/Validations";
import { LeadCommand } from "./Fields/LeadCommand";
import { Center } from "./Fields/Center";
import { PreparingBase } from "./Fields/PreparingBase";
import { PreparingOffice } from "./Fields/PreparingOffice";
import { ProgramManagers } from "./Fields/ProgramManagers";
import { TechOrderManager } from "./Fields/TechOrderManager";
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
            void myForm.handleSubmit(submitSuccess)(...args)
          }
        >
          <div className="requestFormContainer">
            <div className="requestFieldContainer">
              <ProgramGroup />
            </div>
            <div className="requestFieldContainer">
              <ProgramName />
            </div>
            <div className="requestFieldContainer">
              <ProgramElementCode />
            </div>
            <div className="requestFieldContainer">
              <LeadCommand />
            </div>
            <div className="requestFieldContainer">
              <Center />
            </div>
            <div className="requestFieldContainer">
              <PreparingBase />
            </div>
            <div className="requestFieldContainer">
              <PreparingOffice />
            </div>
            <div className="requestFieldContainer">
              <ProgramManagers />
            </div>
            <div className="requestFieldContainer">
              <TechOrderManager />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Info;
