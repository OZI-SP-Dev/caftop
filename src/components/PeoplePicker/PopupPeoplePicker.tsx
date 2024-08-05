import {
  Text,
  Button,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useState } from "react";
import { Person, useCurrentUser } from "api/UserApi";
import BACPeoplePicker from "./PeoplePicker";
import { FormProvider, useForm } from "react-hook-form";

interface IPopupPeoplePicker {
  onUpdate: (selected: Person[]) => void;
}

export const PopupPeoplePicker = ({ onUpdate }: IPopupPeoplePicker) => {
  const [selected, setSelected] = useState<Person[]>([]);
  const currentUser = useCurrentUser();
  const [isOpen, setOpen] = useState<boolean>(false);

  type TPopupPeoplePicker = { user: Person[] };

  const myForm = useForm<TPopupPeoplePicker>({
    mode: "onChange",
  });

  const submitSuccess = (data: TPopupPeoplePicker) => {
    onUpdate(data.user);
    setOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(_e, data) => {
        if (data.open === false) {
          setSelected([]);
        }
      }}
    >
      <Button appearance="secondary" onClick={() => setOpen(true)}>
        Populate from GAL
      </Button>

      <DialogSurface aria-describedby="popupGAL">
        <FormProvider {...myForm}>
          <form id="popupGALForm">
            <DialogBody>
              <DialogTitle
                action={
                  <Button
                    appearance="subtle"
                    aria-label="close"
                    icon={<Dismiss24Regular />}
                    onClick={() => setOpen(false)}
                  />
                }
              >
                Select user from GAL
              </DialogTitle>
              <DialogContent id="popupGAL">
                <Text>
                  Select by entering either email address, or name in
                  &apos;Last, First&apos; format. You can also click &apos;Set
                  as myself&apos; to have it use your information.
                </Text>
                <div>
                  <BACPeoplePicker
                    name="user"
                    ariaLabel="User to prepopulate information from"
                    aria-describedby="userErr"
                    selectedItems={selected}
                    rules={{
                      required:
                        "You must select a user if you want to prepoulate the information",
                    }}
                    updatePeople={(items) => {
                      if (items?.[0]) {
                        setSelected(items as Person[]);
                      } else {
                        setSelected([]);
                      }
                    }}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  appearance="primary"
                  onClick={(...args) =>
                    void myForm.handleSubmit(submitSuccess)(...args)
                  }
                >
                  Select
                </Button>
                <Button
                  appearance="primary"
                  onClick={() => {
                    onUpdate([currentUser]);
                    setOpen(false);
                  }}
                >
                  Set as myself
                </Button>
                <Button appearance="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DialogActions>
            </DialogBody>
          </form>
        </FormProvider>
      </DialogSurface>
    </Dialog>
  );
};
