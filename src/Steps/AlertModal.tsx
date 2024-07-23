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
export interface IAlertModal {
  show: boolean;
  close: (accept: boolean) => void;
}

export const AlertModal = (props: IAlertModal) => {
  return (
    <Dialog open={props.show}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Reset CAFTOP Data</DialogTitle>
          <DialogContent>
            <strong>
              Warning: you will lose all selections that have been made, and
              will need to start over from the beginning.
            </strong>
          </DialogContent>
        </DialogBody>
        <DialogActions>
          <Button onClick={() => props.close(false)} appearance="primary">
            I&apos;ve changed my mind
          </Button>
          <Button onClick={() => props.close(true)} appearance="secondary">
            Reset my data
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};
