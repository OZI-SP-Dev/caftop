import { Title1, Title2 } from "@fluentui/react-components";
import { SyntheticEvent, useContext } from "react";
import { globalContext } from "stateManagement/GlobalStore";

const GenericStep = () => {
  const { dispatch } = useContext(globalContext);
  function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    if (e?.nativeEvent?.submitter?.id === "next") {
      dispatch({ type: "NEXT_STEP" });
    } else {
      dispatch({ type: "PREV_STEP" });
    }
    e.preventDefault();
  }
  return (
    <>
      <Title1>Header</Title1>
      <Title2>Sub Header</Title2>
      <form id="innerForm" onSubmit={handleSubmit}></form>
    </>
  );
};

export default GenericStep;
