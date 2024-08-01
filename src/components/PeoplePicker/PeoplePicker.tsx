import { useRef } from "react";
import { IPersonaProps } from "@fluentui/react/lib/Persona";
import {
  IBasePickerSuggestionsProps,
  ISuggestionItemProps,
  NormalPeoplePicker,
  PeoplePickerItemSuggestion,
} from "@fluentui/react/lib/Pickers";
import { InfoLabel, Text } from "@fluentui/react-components";
import { spWebContext } from "api/SPWebContext";
import { IPeoplePickerEntity } from "@pnp/sp/profiles";
import { LayerHost } from "@fluentui/react";
import { FieldValues, useController } from "react-hook-form";
import { BaseFormField } from "components/BaseFormFields/BaseTypeDef";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

interface Person {
  Id: number;
  EMail: string;
  Title: string;
}

// Custom Persona type so we can save Id and/or EMail with the item
interface CustomPersona extends IPersonaProps {
  Id: number;
  Title: string;
  EMail: string;
}

// TODO: Add a way to show as input needed/corrected

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested People",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: true,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested contacts",
};

interface IPeoplePickerProps {
  /** Required - The text used to label this people picker for screenreaders */
  ariaLabel: string;
  readOnly?: boolean;
  required?: boolean;
  /** Optional - Limit the People Picker to only allow selection of specific number -- Defaults to 1 */
  itemLimit?: number;
  updatePeople: (p: Person[]) => void;
  selectedItems: Person[] | Person;
}

const BACPeoplePicker = <T extends FieldValues>({
  name,
  labelText,
  labelInfo,
  labelIcon,
  rules,
  selectedItems,
  updatePeople,
  ariaLabel,
  readOnly,
  itemLimit,
}: BaseFormField<T> &
  IPeoplePickerProps & {
    /** Don't show the error message within the component -- If using this, you should be displaying the error message elsewhere.  It still sets the aria-invalid flag and sets RHF as error */
    disableError?: boolean;
  }) => {
  const picker = useRef(null);

  const { field, fieldState } = useController<T>({
    name,
    rules,
  });

  let selectedItems2: CustomPersona[];
  if (Array.isArray(selectedItems)) {
    selectedItems2 = selectedItems.map((item) => ({
      ...item,
      text: item.Title,
    }));
  } else if (selectedItems) {
    selectedItems2 = [{ ...selectedItems, text: selectedItems.Title }];
  } else {
    selectedItems2 = [];
  }

  const onFilterChanged = async (
    filterText: string,
    currentPersonas?: IPersonaProps[],
    limitResults?: number
  ): Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[];

      const results = await spWebContext.profiles.clientPeoplePickerSearchUser({
        AllowEmailAddresses: false,
        AllowMultipleEntities: false,
        MaximumEntitySuggestions: limitResults ?? 25,
        QueryString: filterText,
        PrincipalSource: 15, // PrincipalSource.All -- Cannot use the enum directly from PnPJS due to it being an ambient enum
        PrincipalType: 1, // PrincipalType.User -- Cannot use the enum directly from PnPJS due to it being an ambient enum
      });

      const newPersonas: IPersonaProps[] = [];
      results.forEach((person: IPeoplePickerEntity) => {
        const persona: CustomPersona = {
          Id: Number(person.EntityData.SPUserID) ?? -1,
          Title: person.DisplayText,
          EMail: person.EntityData.Email ?? "",
          text: person.DisplayText,
          secondaryText: person.EntityData.Title,
        };
        newPersonas.push(persona);
      });

      filteredPersonas = [...newPersonas];

      // If people were already selected, then do not list them as possible additions
      if (currentPersonas && filteredPersonas) {
        filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      }

      if (currentPersonas) {
        filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      }
      filteredPersonas = limitResults
        ? filteredPersonas.slice(0, limitResults)
        : filteredPersonas;
      return filteredPersonas;
    } else {
      return [];
    }
  };

  const onItemsChange = (items: IPersonaProps[] | undefined) => {
    if (items) {
      field.onChange(items);
      updatePeople(items as Person[]);
    } else {
      updatePeople([]);
    }
  };

  const onRenderSuggestionsItem = (
    personaProps: IPersonaProps,
    suggestionsProps: ISuggestionItemProps<IPersonaProps> | undefined
  ) => (
    <PeoplePickerItemSuggestion
      personaProps={personaProps}
      suggestionsProps={suggestionsProps}
      styles={{ personaWrapper: { width: "100%" } }}
    />
  );

  /* Is it a required field, if so, then mark the label as required */
  const isRequired: boolean = rules?.required ? true : false;

  return (
    <>
      {labelText && (
        <InfoLabel
          htmlFor={name + "Id"}
          weight="semibold"
          className="fieldLabel"
          required={isRequired}
          info={labelInfo}
        >
          {labelIcon ?? <TextFieldIcon className="fieldIcon" />}
          {labelText}
        </InfoLabel>
      )}
      <NormalPeoplePicker
        pickerCalloutProps={{
          layerProps: {
            hostId: "myPicker",
          },
        }}
        onResolveSuggestions={onFilterChanged}
        getTextFromItem={getTextFromItem}
        onRenderSuggestionsItem={onRenderSuggestionsItem}
        pickerSuggestionsProps={suggestionProps}
        className={"ms-PeoplePicker"}
        key={"controlled"}
        selectionAriaLabel={"Selected users"}
        removeButtonAriaLabel={"Remove"}
        selectedItems={selectedItems2}
        onChange={onItemsChange}
        inputProps={{
          "aria-label": ariaLabel,
        }}
        componentRef={picker}
        resolveDelay={300}
        disabled={readOnly}
        itemLimit={itemLimit ? itemLimit : 1}
      />
      {fieldState?.error && (
        <Text id="userErr" /*className={classes.errorText}*/>
          {fieldState.error.message}
        </Text>
      )}
      {/* Creating a LayerHost and setting the z-index to 1 higher than it's default of 1000000
             allows the popup people suggestions to appear above the V9 Dialog box 
             This can likely be eliminated once they release a V9 for the PeoplePicker
             NOTE:  When removing also remove the pickerCalloutProps setting hostId to this host  */}
      <LayerHost
        id="myPicker"
        style={{ zIndex: 1000001, position: "fixed" }}
      ></LayerHost>
    </>
  );
};

function removeDuplicates(
  personas: IPersonaProps[],
  possibleDupes: IPersonaProps[]
) {
  return personas.filter(
    (persona) => !listContainsPersona(persona, possibleDupes)
  );
}

function listContainsPersona(
  persona: IPersonaProps,
  personas: IPersonaProps[]
) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter((item) => item.text === persona.text).length > 0;
}

function getTextFromItem(persona: IPersonaProps): string {
  return persona.text as string;
}

export default BACPeoplePicker;
