import { useContext } from "react";
import { Title1, Title2 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import {
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";

import { CAFTOPInfo } from "api/CAFTOP";
import { ProgramGroup, ProgramGroupRuleFinal } from "./Fields/ProgramGroup";
import { ProgramName, ProgramNameRuleFinal } from "./Fields/ProgramName";

export const Info = () => {
  const { globalState, dispatch } = useContext(globalContext);
  const currentCAFTOP = globalState.Info;

  const submitSuccess: SubmitHandler<CAFTOPInfo> = (data, e?) => {
    dispatch({ type: "MERGE_GLOBAL_OPTION", payload: { Info: { ...data } } });
    if (
      e?.nativeEvent instanceof SubmitEvent &&
      e.nativeEvent?.submitter?.id === "next"
    ) {
      dispatch({ type: "NEXT_STEP" });
    } else {
      dispatch({ type: "PREV_STEP" });
    }
    return Promise.resolve();
  };

  const submitError: SubmitErrorHandler<Partial<CAFTOPInfo>> = (_data) => {
    window.alert(
      "Please correct errors on this page before navigating to another page"
    );
  };

  const schema = ProgramGroupRuleFinal.merge(ProgramNameRuleFinal);
  const myForm = useForm<CAFTOPInfo>({
    defaultValues: currentCAFTOP,
    resolver: zodResolver(schema),
  });

  return (
    <>
      <Title1>CAFTOP Information Page</Title1>
      <Title2>General CAFTOP Selections...</Title2>

      <FormProvider {...myForm}>
        <form
          id="innerForm"
          onSubmit={(...args) =>
            myForm.handleSubmit(submitSuccess, submitError)(...args)
          }
        >
          <div className="requestFormContainer">
            <div className="requestFieldContainer">
              <ProgramGroup />
            </div>
            <div className="requestFieldContainer">
              <ProgramName />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
