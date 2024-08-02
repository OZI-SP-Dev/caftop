import {
  Text,
  Button,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  DialogTrigger,
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
  const myForm = useForm({
    mode: "onChange",
  });

  return (
    <Dialog
      onOpenChange={(_e, data) => {
        if (data.open === false) {
          setSelected([]);
        }
      }}
    >
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="secondary">Populate from GAL</Button>
      </DialogTrigger>
      <DialogSurface aria-describedby="popupGAL">
        <FormProvider {...myForm}>
          <form id="popupGALForm">
            <DialogBody>
              <DialogTitle
                action={
                  <DialogTrigger disableButtonEnhancement>
                    <Button
                      appearance="subtle"
                      aria-label="close"
                      icon={<Dismiss24Regular />}
                    />
                  </DialogTrigger>
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
                <DialogTrigger disableButtonEnhancement>
                  <Button
                    appearance="primary"
                    onClick={() => {
                      onUpdate(selected);
                    }}
                  >
                    Select
                  </Button>
                </DialogTrigger>
                <DialogTrigger disableButtonEnhancement>
                  <Button
                    appearance="primary"
                    onClick={() => {
                      onUpdate([currentUser]);
                    }}
                  >
                    Set as myself
                  </Button>
                </DialogTrigger>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Cancel</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </form>
        </FormProvider>
      </DialogSurface>
    </Dialog>
  );
};
