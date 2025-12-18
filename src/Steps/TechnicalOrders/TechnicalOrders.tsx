import { useContext, useEffect } from "react";
import { Title1 } from "@fluentui/react-components";
import { globalContext } from "@stateManagement/GlobalStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPTechnicalOrders } from "@api/CAFTOP/types";
import { useTechnicalOrdersPageValidation } from "@utilities/Validations";
import * as Fields from "./Fields";
import { ICAFTOPWizardStep } from "@steps/Steps";
import { useCAFTOP } from "@api/CAFTOP/useCAFTOP";
import { TechnicalOrders as TechnicalOrdersDefaults } from "@api/CAFTOP/defaults";

const TechnicalOrders = (props: ICAFTOPWizardStep) => {
  const { globalState } = useContext(globalContext);
  const currentCAFTOP = useCAFTOP(globalState.id, "TechnicalOrders");

  const schema = useTechnicalOrdersPageValidation();

  // We make TOCountIssue part of the data, in order to have a general field error field we can flag against,
  //  however, it is optional as we won't (and don't) want to populate it with information
  const myForm = useForm<CAFTOPTechnicalOrders & { TOCountIssue?: string }>({
    values: currentCAFTOP.data ?? TechnicalOrdersDefaults,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // https://github.com/orgs/react-hook-form/discussions/8516
  // Force the form to refresh when one of the fields cause it to be added
  // Just having it trigger against the field onChange of all the fields was not working
  const { watch, trigger } = myForm;
  useEffect(() => {
    const subscription = watch(() => {
      void trigger(["TOCountIssue"]);
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const hasChanges = myForm.formState.isDirty;

  if (!currentCAFTOP.data) {
    return <>Loading...</>;
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
              <Fields.TOFormat />
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
