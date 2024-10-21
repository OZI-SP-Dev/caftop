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
  close: (accept: boolean) => Promise<void>;
}

export const AlertNav = (props: IAlertModal) => {
  return (
    <Dialog open={props.show}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Save Changes</DialogTitle>
          <DialogContent>
            <p>
              Do you want to save your changes, or navigate without saving
              changes?
            </p>
          </DialogContent>
        </DialogBody>
        <DialogActions>
          <Button onClick={() => props.close(true)} appearance="primary">
            Save Changes
          </Button>
          <Button
            disabled={props.show === false}
            onClick={() => {
              props.close(false);
            }}
            appearance="secondary"
          >
            Navigate without saving changes
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};
