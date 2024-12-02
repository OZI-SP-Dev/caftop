import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
} from "@fluentui/react-components";

/**
 * Generates modal
 *
 * @param show Boolean that determines when the modal is displayed
 * @param close Function that handles the close
 */
interface IAlertModal {
  show: boolean;
  close: () => void;
}

export const AlertTOC = (props: IAlertModal) => {
  return (
    <Dialog open={props.show}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Update the Table of Contents</DialogTitle>
          <DialogContent>
            <p>
              Once a Narrative is saved the table of contents needs to be
              updated manually. A how to is listed on the homepage.
            </p>
          </DialogContent>
        </DialogBody>
        <DialogActions>
          <Button onClick={() => props.close()} appearance="primary">
            Acknowledge
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};
