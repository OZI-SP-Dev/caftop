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

export const AlertNavWithErrors = (props: IAlertModal) => {
  return (
    <Dialog open={props.show}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Errors on Page</DialogTitle>
          <DialogContent>
            <p>
              Warning: You have errors on this page. If you choose to continue
              to navigate, <strong>ALL</strong> changes to data on this page
              will be <strong>LOST</strong>.
            </p>
          </DialogContent>
        </DialogBody>
        <DialogActions>
          <Button onClick={() => props.close(false)} appearance="primary">
            Fix errors
          </Button>
          <Button
            disabled={props.show === false}
            onClick={() => {
              props.close(true);
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
