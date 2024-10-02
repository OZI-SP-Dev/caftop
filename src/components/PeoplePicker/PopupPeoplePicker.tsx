import {
  Text,
  Button,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Spinner,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useState } from "react";
import { Person, getCurrentUser } from "api/UserApi";
import BACPeoplePicker from "./PeoplePicker";
import { FormProvider, useForm } from "react-hook-form";
import { ContactIcon } from "@fluentui/react-icons-mdl2";

interface IPopupPeoplePicker {
  onUpdate: (selected: Person[]) => Promise<void>;
}

export const PopupPeoplePicker = ({ onUpdate }: IPopupPeoplePicker) => {
  const [selected, setSelected] = useState<Person[]>([]);
  const currentUser = getCurrentUser();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [updateType, setUpdating] = useState<"none" | "selected" | "self">(
    "none"
  );

  type TPopupPeoplePicker = { user: Person[] };

  const myForm = useForm<TPopupPeoplePicker>({
    mode: "onChange",
  });

  const submitSuccess = async (data: TPopupPeoplePicker) => {
    setUpdating("selected");
    await onUpdate(data.user);
    setOpen(false);
    setUpdating("none");
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
        <ContactIcon className="fieldIcon" />
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
                    disabled={updateType !== "none"}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  appearance="primary"
                  disabled={updateType !== "none"}
                  onClick={(...args) =>
                    void myForm.handleSubmit(submitSuccess)(...args)
                  }
                >
                  {updateType === "selected" && <Spinner size="extra-tiny" />}
                  Select
                </Button>
                <Button
                  appearance="primary"
                  disabled={updateType !== "none"}
                  onClick={() => {
                    setUpdating("self");
                    onUpdate([currentUser])
                      .then(() => {
                        setOpen(false);
                        setUpdating("none");
                      })
                      .catch(() => setUpdating("none"));
                  }}
                >
                  {updateType === "self" && <Spinner size="extra-tiny" />}
                  Set as myself
                </Button>
                <Button
                  appearance="secondary"
                  disabled={updateType !== "none"}
                  onClick={() => setOpen(false)}
                >
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
