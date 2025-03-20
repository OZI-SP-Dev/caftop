import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Spinner,
  Text,
  Tooltip,
} from "@fluentui/react-components";
import { useDeleteCAFTOP } from "@api/CAFTOP/useDeleteCAFTOP";
import { useNavigate } from "react-router-dom";
import { AlertSolidIcon } from "@fluentui/react-icons-mdl2";

export interface IDeleteItem {
  Id?: number;
  programName?: string;
  pec?: string;
  returnPath?: string;
}

export const DeleteDialog = ({
  itemToDelete,
  setItemToDelete,
}: {
  itemToDelete: IDeleteItem | undefined;
  setItemToDelete: (arg0: IDeleteItem | undefined) => void;
}) => {
  const deleteCAFTOP = useDeleteCAFTOP();
  const navigate = useNavigate();

  const deleteHandler = async () => {
    if (itemToDelete?.Id) {
      try {
        await deleteCAFTOP.mutateAsync(itemToDelete.Id);
        setItemToDelete(undefined);
        if (itemToDelete.returnPath) {
          navigate(itemToDelete.returnPath);
        }
        deleteCAFTOP.reset();
      } catch {
        // error will be displayed based on isError
      }
    }
  };

  const cancelHandler = () => {
    // Clear out the selection, so that the Dialog box closes
    setItemToDelete(undefined);
    // Reset the hook, so that if it was an error -- it doesn't carry over to the next
    deleteCAFTOP.reset();
  };

  return (
    <>
      {itemToDelete?.Id && (
        <Dialog modalType="alert" open={!!itemToDelete?.Id}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Delete CAFTOP Narrative?</DialogTitle>
              <DialogContent>
                <>
                  <Text>Are you sure you wish to delete this narrative?</Text>
                  <br />
                  <br />
                  <Text>Program Name: {itemToDelete.programName}</Text>
                  <br />
                  <Text>PEC: {itemToDelete.pec}</Text>
                  <br />
                </>
              </DialogContent>
              <DialogActions>
                <Button
                  appearance="secondary"
                  onClick={cancelHandler}
                  disabled={deleteCAFTOP.isLoading}
                >
                  No
                </Button>
                {!deleteCAFTOP.isLoading ? (
                  <Button
                    appearance="primary"
                    style={{ background: "#C23F38" }}
                    onClick={() => void deleteHandler()}
                  >
                    Delete Narrative{" "}
                  </Button>
                ) : (
                  <>
                    Deleting <Spinner />
                  </>
                )}
                {deleteCAFTOP.isError && (
                  <Tooltip
                    content={
                      deleteCAFTOP.error instanceof Error
                        ? deleteCAFTOP.error.message
                        : "An error occurred."
                    }
                    relationship="label"
                  >
                    <Badge
                      size="extra-large"
                      appearance="ghost"
                      color="danger"
                      style={{ verticalAlign: "middle" }}
                      icon={<AlertSolidIcon />}
                    />
                  </Tooltip>
                )}
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}
    </>
  );
};
