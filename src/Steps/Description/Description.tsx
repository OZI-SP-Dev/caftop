import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "@stateManagement/GlobalStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPDescription } from "@api/CAFTOP/types";
import { useDescriptionPageValidation } from "@utilities/Validations";
import * as Fields from "./Fields";
import { ICAFTOPWizardStep } from "@steps/Steps";
import { useCAFTOP } from "@api/CAFTOP/useCAFTOP";
import { Description as DescriptionDefaults } from "@api/CAFTOP/defaults";

const Description = (props: ICAFTOPWizardStep) => {
  const { globalState } = useContext(globalContext);
  const currentCAFTOP = useCAFTOP(globalState.id, "Description");
  const schema = useDescriptionPageValidation();

  const myForm = useForm<CAFTOPDescription>({
    defaultValues: DescriptionDefaults,
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
