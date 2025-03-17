import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { spWebContext } from "@api/SPWebContext";
import { useQuery } from "@tanstack/react-query";

export interface IRoles {
  isFocalPoint: boolean;
  isAdmin: boolean;
}

const transformGroups = (data: ISiteGroupInfo[]): IRoles => {
  const isFocalPoint = data.find((value) =>
    value.Title.endsWith("Focal Points")
  )
    ? true
    : false;

  const isAdmin = data.find((value) => value.Title.endsWith("Owners"))
    ? true
    : false;

  const roles = {
    isFocalPoint: isFocalPoint,
    isAdmin: isAdmin,
  };

  return roles;
};

const getRoles = () => {
  if (!import.meta.env.DEV) {
    return spWebContext.web.currentUser.groups();
  } else {
    const groups: ISiteGroupInfo[] = [
      {
        Title: "CAFTOP Narrative Focal Points",
        AllowMembersEditMembership: false,
        AllowRequestToJoinLeave: false,
        AutoAcceptRequestToJoinLeave: false,
        Description: "",
        Id: 0,
        IsHiddenInUI: false,
        LoginName: "",
        OnlyAllowMembersViewMembership: false,
        OwnerTitle: "",
        PrincipalType: 0,
        RequestToJoinLeaveEmailSetting: null,
      },
      {
        Title: "CAFTOP Narrative Owners",
        AllowMembersEditMembership: false,
        AllowRequestToJoinLeave: false,
        AutoAcceptRequestToJoinLeave: false,
        Description: "",
        Id: 0,
        IsHiddenInUI: false,
        LoginName: "",
        OnlyAllowMembersViewMembership: false,
        OwnerTitle: "",
        PrincipalType: 0,
        RequestToJoinLeaveEmailSetting: null,
      },
    ];
    return new Promise<ISiteGroupInfo[]>((resolve) =>
      setTimeout(() => resolve(groups), 1000)
    );
  }
};

export const useMyRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: Infinity,
    cacheTime: Infinity,
    select: transformGroups,
  });
};
