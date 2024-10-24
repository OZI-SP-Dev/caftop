import { spfi, SPBrowser } from "@pnp/sp";
import "@pnp/sp/content-types/list";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import "@pnp/sp/items/list";
import "@pnp/sp/site-users/web";
import "@pnp/sp/profiles";
import "@pnp/sp/batching";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/files/folder";
import "@pnp/sp/files/web";
import "@pnp/sp/comments/item";
import "@pnp/sp/profiles";
import { getSPUserProfileDataDev } from "api/SPSampleUserData";

declare const _spPageContextInfo: { webAbsoluteUrl: string };

export const webUrl = import.meta.env.DEV
  ? "http://localhost:3000"
  : _spPageContextInfo.webAbsoluteUrl;

export const spWebContext = spfi().using(SPBrowser({ baseUrl: webUrl }));

/** Function to either call SharePoint or get data from local sample in DEV
 * @param email The email of the user to look up
 * @returns An object containing the user profile
 */
export const getSPUserProfileData = async (email: string) => {
  const loginName = "i:0#.f|membership|" + email;
  if (!import.meta.env.DEV) {
    return (await spWebContext.profiles.getPropertiesFor(loginName)) as {
      UserProfileProperties: { Key: string; Value: string }[];
    };
  } else {
    return await new Promise<{
      UserProfileProperties: { Key: string; Value: string }[];
    }>((resolve) =>
      setTimeout(
        () =>
          resolve(
            getSPUserProfileDataDev(loginName) as {
              UserProfileProperties: { Key: string; Value: string }[];
            }
          ),
        1000
      )
    );
  }
};
