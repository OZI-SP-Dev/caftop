import { Title1, Title2 } from "@fluentui/react-components";
import { ICAFTOPWizardStep } from "./Steps";

const GenericStep = (props: ICAFTOPWizardStep) => {
  return (
    <>
      <Title1>Header</Title1>
      <Title2>Sub Header</Title2>
      <form id="innerForm" onSubmit={props.handleSubmit}></form>
    </>
  );
};

export default GenericStep;
