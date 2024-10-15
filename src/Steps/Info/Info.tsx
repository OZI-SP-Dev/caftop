import { useContext } from "react";
import {
  Title1,
  Title2,
  Toast,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";
import { globalContext } from "stateManagement/GlobalStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "Steps/Steps.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { CAFTOPInfo } from "api/CAFTOP/types";
import * as Fields from "./Fields";
import { useInfoPageValidation } from "utilities/Validations";
import { ICAFTOPWizardStep } from "Steps/Steps";
import { useCAFTOP } from "api/CAFTOP/useCAFTOP";
import { Info as InfoDefaults } from "api/CAFTOP/defaults";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateCAFTOP } from "api/CAFTOP/useCreateCAFTOP";
import { Link } from "@fluentui/react";

const Info = (props: ICAFTOPWizardStep) => {
  const { globalState } = useContext(globalContext);
  const { pathname } = useLocation();
  const currentCAFTOP = useCAFTOP(globalState.id, "Info");
  const createCAFTOP = useCreateCAFTOP();
  const navigate = useNavigate();
  const { dispatchToast } = useToastController("toaster");

  const createNew: SubmitHandler<CAFTOPInfo> = (data, _e?) => {
    createCAFTOP.mutate(data, {
      onSuccess: (data: { Id: number }) => {
        navigate(`/item/${data.Id}`);
      },
      onError: (e) => {
        if (
          e instanceof Error &&
          e.message ===
            `Error making HttpClient request in queryable [500]  ::> {"odata.error":{"code":"-2130575169, Microsoft.SharePoint.SPDuplicateValuesFoundException","message":{"lang":"en-US","value":"The list item could not be added or updated because duplicate values were found in the following field(s) in the list: [Title]."}}}`
        ) {
          dispatchToast(
            <Toast>
              <ToastTitle
                action={
                  <ToastTrigger>
                    <Link>Dismiss</Link>
                  </ToastTrigger>
                }
              >
                A CAFTOP for this Program Name / PEC combo already exists
              </ToastTitle>
            </Toast>,
            { intent: "error", timeout: -1 }
          );
        } else {
          dispatchToast(
            <Toast>
              <ToastTitle
                action={
                  <ToastTrigger>
                    <Link>Dismiss</Link>
                  </ToastTrigger>
                }
              >
                Error creating CAFTOP
              </ToastTitle>
            </Toast>,
            { intent: "error", timeout: -1 }
          );
        }
      },
    });
  };

  const whichHanlder = pathname === "/new" ? createNew : props.handleSubmit;
  const whichValues = pathname === "/new" ? undefined : currentCAFTOP.data;
  const schema = useInfoPageValidation();

  const myForm = useForm<CAFTOPInfo>({
    defaultValues: InfoDefaults,
    values: whichValues,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  if (currentCAFTOP.isLoading && pathname !== "/new") {
    return "Loading...";
  }

  return (
    <>
      <Title1>CAFTOP Information Page</Title1>
      <Title2>General CAFTOP Selections...</Title2>

      <FormProvider {...myForm}>
        <form
          id="innerForm"
          onSubmit={(...args) =>
            void myForm.handleSubmit(whichHanlder, props.handleError)(...args)
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
              <Fields.TechOrderManagers />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Info;
