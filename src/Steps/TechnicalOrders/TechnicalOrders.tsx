import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPTechnicalOrders } from "api/CAFTOP/types";
import { useTechnicalOrdersPageValidation } from "utilities/Validations";
import * as Fields from "./Fields";
import { ICAFTOPWizardStep } from "Steps/Steps";
import { useCAFTOP } from "api/CAFTOP/useCAFTOP";
import { TechnicalOrders as TechnicalOrdersDefaults } from "api/CAFTOP/defaults";

const TechnicalOrders = (props: ICAFTOPWizardStep) => {
  const { globalState } = useContext(globalContext);
  const currentCAFTOP = useCAFTOP(globalState.id, "TechnicalOrders");

  const schema = useTechnicalOrdersPageValidation();

  const myForm = useForm<CAFTOPTechnicalOrders>({
    values: currentCAFTOP.data ?? TechnicalOrdersDefaults,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const hasChanges = myForm.formState.isDirty;

  if (!currentCAFTOP.data) {
    return "Loading...";
  }

  if (globalState.mode === "submit") {
    void myForm.trigger();
  }

  return (
    <>
      <Title1>Technical Orders</Title1>
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
              <Fields.TOCounts />
            </div>
            <div className="requestFieldContainer">
              <Fields.TOAPMigration />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default TechnicalOrders;
