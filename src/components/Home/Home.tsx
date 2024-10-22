import { Card, CardHeader, Title2, Text } from "@fluentui/react-components";
import Dashboard from "components/Dashboard/Dashboard";
import {
  useAnnouncements,
  useHelp,
  useHomepageNotice,
  usePurpose,
} from "api/DefaultData";
import "./Home.css";

const Home = () => {
  const homepageNotice = useHomepageNotice();
  const announcements = useAnnouncements();
  const help = useHelp();
  const purpose = usePurpose();

  return (
    <>
      <div className="container">
        <Text align="center" className="notice">
          <div dangerouslySetInnerHTML={{ __html: homepageNotice }}></div>{" "}
        </Text>
        <Card className="purpose">
          <CardHeader header={<Title2>Purpose</Title2>} />
          <div dangerouslySetInnerHTML={{ __html: purpose }} />
        </Card>
        <Card className="help">
          <CardHeader header={<Title2>Help</Title2>} />
          <div dangerouslySetInnerHTML={{ __html: help }} />
        </Card>
        <Card className="announcements">
          <CardHeader header={<Title2>Announcements</Title2>} />
          <div dangerouslySetInnerHTML={{ __html: announcements }} />
        </Card>
        <Dashboard className="dashboard" />
      </div>
    </>
  );
};

export default Home;
