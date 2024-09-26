import { Title1, Title2 } from "@fluentui/react-components";
import { ICAFTOPWizardStep } from "./Steps";
import { CAFTOPPage } from "api/CAFTOP/types";

const GenericStep = (props: ICAFTOPWizardStep) => {
  return (
    <>
      <Title1>Header</Title1>
      <Title2>Sub Header</Title2>
      <form
        id="innerForm"
        onSubmit={(e) => props.handleSubmit({} as CAFTOPPage, e)}
      />
    </>
  );
};

export default GenericStep;
