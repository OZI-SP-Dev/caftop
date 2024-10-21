import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPDescription } from "api/CAFTOP/types";
import { useDescriptionPageValidation } from "utilities/Validations";
import * as Fields from "./Fields";
import { useDefaultDescription, useDefaultIntroduction } from "api/DefaultData";
import { ICAFTOPWizardStep } from "Steps/Steps";
import { useCAFTOP } from "api/CAFTOP/useCAFTOP";
import { Description as DescriptionDefaults } from "api/CAFTOP/defaults";

const Description = (props: ICAFTOPWizardStep) => {
  const { globalState } = useContext(globalContext);
  const currentCAFTOP = useCAFTOP(globalState.id, "Description");

  const defaultDescription = useDefaultDescription();
  const defualtIntroduction = useDefaultIntroduction();

  let formData;
  if (
    currentCAFTOP.data &&
    defaultDescription !== "" &&
    defualtIntroduction !== ""
  ) {
    const desc = currentCAFTOP.data.Description
      ? currentCAFTOP.data.Description
      : defaultDescription;
    const intro = currentCAFTOP.data.Introduction
      ? currentCAFTOP.data.Introduction
      : defualtIntroduction;
    formData = {
      ...currentCAFTOP.data,
      Description: desc,
      Introduction: intro,
    };
  }

  const schema = useDescriptionPageValidation();

  const myForm = useForm<CAFTOPDescription>({
    defaultValues: DescriptionDefaults,
    values: formData,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const hasChanges = myForm.formState.isDirty;

  if (!currentCAFTOP.data || !defaultDescription || !defualtIntroduction) {
    return "Loading...";
  }

  if (globalState.mode === "submit") {
    void myForm.trigger();
  }
  return (
    <>
      <Title1>CAFTOP Description and General Introduction Page</Title1>
      <FormProvider {...myForm}>
        <form
          id="innerForm"
          onSubmit={(...args) =>
            void myForm.handleSubmit((data, e) => {
              void props.handleSubmit(hasChanges, data, e);
            }, props.handleError)(...args)
          }
        >
          <div className="requestFormContainer">
            <div className="requestFieldContainer">
              <Fields.Description />
            </div>
            <div className="requestFieldContainer">
              <Fields.Introduction />
            </div>
            <div className="requestFieldContainer">
              <Fields.ConfigurationPlan />
            </div>
            <div className="requestFieldContainer">
              <Fields.SystemMissionDescription />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Description;
