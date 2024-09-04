import { useContext } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";

import { CAFTOPTechnicalOrders } from "api/CAFTOP";
import { useTechnicalOrdersPageValidation } from "utilities/Validations";
import * as Fields from "./Fields/Fields";
import { ICAFTOPWizardStep } from "Steps/Steps";

const TechnicalOrders = (props: ICAFTOPWizardStep) => {
  const { globalState, dispatch } = useContext(globalContext);
  const currentCAFTOP = { ...globalState.TechnicalOrders };

  const submitSuccess: SubmitHandler<CAFTOPTechnicalOrders> = (data, e?) => {
    dispatch({
      type: "MERGE_GLOBAL_OPTION",
      payload: { TechnicalOrders: { ...data } },
    });
    props.handleSubmit(e);
  };

  const schema = useTechnicalOrdersPageValidation();

  const myForm = useForm<CAFTOPTechnicalOrders>({
    values: currentCAFTOP,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

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
            void myForm.handleSubmit(submitSuccess, props.handleError)(...args)
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
