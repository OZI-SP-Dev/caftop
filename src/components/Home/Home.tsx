import { Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

import Dashboard from "components/Dashboard/Dashboard";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Dashboard />
      <br />
      <br />
      <Button
        id="start"
        aria-label="Create New CAFTOP"
        appearance="primary"
        onClick={() => {
          navigate("/new");
        }}
      >
        Create New CAFTOP
      </Button>
    </>
  );
};

export default Home;
