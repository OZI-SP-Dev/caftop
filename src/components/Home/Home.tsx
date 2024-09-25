import { Button } from "@fluentui/react-components";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Link to="/item/1">Load CAFTOP #1</Link>
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
