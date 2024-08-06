import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";

import { CAFTOPDescription } from "api/CAFTOP";
import { useDescriptionPageValidation } from "utilities/Validations";
import * as Fields from "./Fields/Fields";
import { useDefaultDescription, useDefaultIntroduction } from "api/DefaultData";

const Description = () => {
  const { globalState, dispatch } = useContext(globalContext);
  let currentCAFTOP = { ...globalState.Description };
  const defaultDescription = useDefaultDescription();
  const defualtIntroduction = useDefaultIntroduction();

  if (!currentCAFTOP.Description) {
    currentCAFTOP = { ...currentCAFTOP, Description: defaultDescription };
  }

  if (!currentCAFTOP.Introduction) {
    currentCAFTOP = { ...currentCAFTOP, Introduction: defualtIntroduction };
  }

  const submitSuccess: SubmitHandler<CAFTOPDescription> = (data, e?) => {
    dispatch({
      type: "MERGE_GLOBAL_OPTION",
      payload: { Description: { ...data } },
    });
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

  const schema = useDescriptionPageValidation();

  const myForm = useForm<CAFTOPDescription>({
    values: currentCAFTOP,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <>
      <Title1>CAFTOP Description and General Introduction Page</Title1>
      <FormProvider {...myForm}>
        <form
          id="innerForm"
          onSubmit={(...args) =>
            void myForm.handleSubmit(submitSuccess)(...args)
          }
        >
          <div className="requestFormContainer">
            <div className="requestFieldContainer">
              <Fields.Description />
            </div>
            <div className="requestFieldContainer">
              <Fields.Introduction />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Description;
