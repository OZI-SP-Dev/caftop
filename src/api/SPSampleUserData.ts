import { IPeoplePickerEntity } from "@pnp/sp/profiles/types";

/** Sample Data for what is returned by the People People Search */
export const spPeoplePickerData: IPeoplePickerEntity[] = [
  /* This is a sample of what is returned directly from SharePoint -- However for our samples we will just include the neccessary values 
{
    Key: "i:0#.f|membership|first.last.1@us.af.mil",
    DisplayText: "LAST, FIRST M CIV USAF AFMC AFLCMC/OZIC",
    IsResolved: true,
    Description: "first.last.1@us.af.mil",
    EntityType: "User",
    EntityData: {
      IsAltSecIdPresent: "False",
      UserKey: "i:0h.f|membership|11111aaa1111a111@live.com",
      Title: "IT Specialist, Application Software Developer",
      Email: "first.last.1@us.af.mil",
      MobilePhone: "",
      ObjectId: "a1a11aaa-a111-11aa-a111-1a11aaaa11a1",
      Department: "AFMC",
    },
    MultipleMatches: [],
    ProviderName: "Tenant",
    ProviderDisplayName: "Tenant",
  },*/

  {
    Key: "i:0#.f|membership|barb.akew@us.af.mil",
    DisplayText: "AKEW, BARB N CIV USAF AFMC AFLCMC/OZIC",
    IsResolved: true,
    Description: "barb.akew@us.af.mil",
    EntityType: "User",
    EntityData: {
      Title: "IT Specialist, Application Software Developer",
      Email: "barb.akew@us.af.mil",
    },
    MultipleMatches: [],
    ProviderName: "Tenant",
    ProviderDisplayName: "Tenant",
  },
  {
    Key: "i:0#.f|membership|cole.slaw.1@us.af.mil",
    DisplayText: "SLAW, COLE D CIV USAF AFMC AFLCMC/OZIC",
    IsResolved: true,
    Description: "cole.slaw.1w@us.af.mil",
    EntityType: "User",
    EntityData: {
      Title: "IT Specialist, Application Software Developer",
      Email: "cole.slaw.1@us.af.mil",
    },
    MultipleMatches: [],
    ProviderName: "Tenant",
    ProviderDisplayName: "Tenant",
  },
];

/** Sample Data for what is returned when querying a profile of a user by Email */
export const spUserProfileData = [
  /* This is a sample of what is returned directly from SharePoint -- However for our samples we will just include the neccessary values 
  {
    "odata.metadata":
      "https://usaf.dps.mil/teams/10251/CAFTOP-DEV/_api/$metadata#SP.ApiData.PersonPropertiess/@Element",
    "odata.type": "SP.UserProfiles.PersonProperties",
    "odata.id":
      "https://usaf.dps.mil/teams/10251/CAFTOP-DEV/_api/sp.userprofiles.peoplemanager/getpropertiesfor(@v)",
    "odata.editLink": "sp.userprofiles.peoplemanager/getpropertiesfor(@v)",
    AccountName: "i:0#.f|membership|first.last.1@us.af.mil",
    DirectReports: [],
    DisplayName: "LAST, FIRST M CIV USAF AFMC AFLCMC/OZIC",
    Email: "first.last.1@us.af.mil",
    ExtendedManagers: [
      "i:0#.f|membership|aflevll@us.af.mil",
      "i:0#.f|membership|...",
      "i:0#.f|membership|...",
      "i:0#.f|membership|...",
      "i:0#.f|membership|thirdlevel@us.af.mil",
      "i:0#.f|membership|secondlevel@us.af.mil",
      "i:0#.f|membership|firstlevel@us.af.mil",
    ],
    ExtendedReports: ["i:0#.f|membership|first.last.1@us.af.mil"],
    IsFollowed: false,
    LatestPost: null,
    Peers: ["i:0#.f|membership|peername@us.af.mil"],
    PersonalSiteHostUrl: "https://usaf-my.dps.mil:443/",
    PersonalUrl:
      "https://usaf-my.dps.mil/personal/first_last_1_us_af_mil/",
    PictureUrl: null,
    Title: "IT Specialist, Application Software Developer",
    UserProfileProperties: [
      {
        Key: "UserProfile_GUID",
        Value: "aa11111a-1aaa-11aa-111a-aa11a1aa1111",
        ValueType: "Edm.String",
      },
      {
        Key: "SID",
        Value: "i:0h.f|membership|11111aaa1111a111@live.com",
        ValueType: "Edm.String",
      },
      {
        Key: "ADGuid",
        Value: "System.Byte[]",
        ValueType: "Edm.String",
      },
      {
        Key: "AccountName",
        Value: "i:0#.f|membership|first.last.1@us.af.mil",
        ValueType: "Edm.String",
      },
      {
        Key: "FirstName",
        Value: "FIRST",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PhoneticFirstName",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "LastName",
        Value: "LAST",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PhoneticLastName",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "PreferredName",
        Value: "LAST, FIRST M CIV USAF AFMC AFLCMC/OZIC",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PhoneticDisplayName",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "WorkPhone",
        Value: "111-111-1111",
        ValueType: "Edm.String",
      },
      {
        Key: "Department",
        Value: "AFMC",
        ValueType: "Edm.String",
      },
      {
        Key: "Title",
        Value: "IT Specialist, Application Software Developer",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-Department",
        Value: "AFMC",
        ValueType: "Edm.String",
      },
      {
        Key: "Manager",
        Value: "i:0#.f|membership|firstlevel@us.af.mil",
        ValueType: "Edm.String",
      },
      {
        Key: "AboutMe",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "PersonalSpace",
        Value: "/personal/first_last_1_us_af_mil/",
        ValueType: "Edm.String",
      },
      {
        Key: "PictureURL",
        Value:
          "https://usaf-my.dps.mil:443/User%20Photos/Profile%20Pictures/a1a11aaa-a111-11aa-a111-1a11aaaa11a1_MThumb.jpg",
        ValueType: "Edm.String",
      },
      {
        Key: "UserName",
        Value: "first.last.1@us.af.mil",
        ValueType: "Edm.String",
      },
      {
        Key: "QuickLinks",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-JobTitle",
        Value: "IT Specialist, Application Software Developer",
        ValueType: "Edm.String",
      },
      {
        Key: "WebSite",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "PublicSiteRedirect",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-DataSource",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-MemberOf",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-Dotted-line",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-Peers",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-Responsibility",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-SipAddress",
        Value: "first.last.1@us.af.mil",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-MySiteUpgrade",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-DontSuggestList",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-ProxyAddresses",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-HireDate",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-DisplayOrder",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-ClaimID",
        Value: "first.last.1@us.af.mil",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-ClaimProviderID",
        Value: "membership",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-LastColleagueAdded",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-OWAUrl",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-ResourceSID",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-ResourceAccountName",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-MasterAccountName",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-UserPrincipalName",
        Value: "first.last.1@us.af.mil",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-O15FirstRunExperience",
        Value: "111111",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PersonalSiteInstantiationState",
        Value: "1",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-DistinguishedName",
        Value:
          "CN=a1a11aaa-a111-11aa-a111-1a11aaaa11a1,OU=1111a11a-1a11-11aa-a11a-aa1111aaa1a1,OU=Tenants,OU=MSOnline,DC=aaaaa111111,DC=msft,DC=net",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-SourceObjectDN",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-LastKeywordAdded",
        Value: "1/14/2021 12:00:00 AM",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-ClaimProviderType",
        Value: "Forms",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-SavedAccountName",
        Value: "i:0#.f|membership|first.last.1@us.af.mil",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-SavedSID",
        Value: "System.Byte[]",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-ObjectExists",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PersonalSiteCapabilities",
        Value: "4",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PersonalSiteFirstCreationTime",
        Value: "11/27/2018 12:34:35 PM",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PersonalSiteLastCreationTime",
        Value: "6/17/2019 7:33:34 PM",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PersonalSiteNumberOfRetries",
        Value: "204",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PersonalSiteFirstCreationError",
        Value:
          "Does not have the capabilites or license to create a personal site - UnauthorizedAccessException",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-FeedIdentifier",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "WorkEmail",
        Value: "first.last.1@us.af.mil",
        ValueType: "Edm.String",
      },
      {
        Key: "CellPhone",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "Fax",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "HomePhone",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "Office",
        Value: "OZIC",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-Location",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "Assistant",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PastProjects",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-Skills",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-School",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-Birthday",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-StatusNotes",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-Interests",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-HashTags",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-EmailOptin",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PrivacyPeople",
        Value: "True",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PrivacyActivity",
        Value: "1111",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PictureTimestamp",
        Value: "11111111111",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PicturePlaceholderState",
        Value: "1",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PictureExchangeSyncState",
        Value: "1",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-MUILanguages",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-ContentLanguages",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-TimeZone",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-RegionalSettings-FollowWeb",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-Locale",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-CalendarType",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-AltCalendarType",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-AdjustHijriDays",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-ShowWeeks",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-WorkDays",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-WorkDayStartHour",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-WorkDayEndHour",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-Time24",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-FirstDayOfWeek",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-FirstWeekOfYear",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-RegionalSettings-Initialized",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "OfficeGraphEnabled",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-UserType",
        Value: "0",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-HideFromAddressLists",
        Value: "False",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-RecipientTypeDetails",
        Value: "1111111111",
        ValueType: "Edm.String",
      },
      {
        Key: "DelveFlags",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "VideoUserPopup",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "PulseMRUPeople",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "msOnline-ObjectId",
        Value: "a1a11aaa-a111-11aa-a111-1a11aaaa11a1",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-PointPublishingUrl",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-TenantInstanceId",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-SharePointHomeExperienceState",
        Value: "1111111",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-RefreshToken",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "SPS-MultiGeoFlags",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "PreferredDataLocation",
        Value: "",
        ValueType: "Edm.String",
      },
      {
        Key: "USAFBase",
        Value: "",
        ValueType: "Edm.String",
      },
    ],
    UserUrl:
      "https://usaf-my.dps.mil:443/Person.aspx?accountname=i%3A0%23%2Ef%7Cmembership%7Cfirst%2Elast%2E1%40us%2Eaf%2Emil",
  },*/
  {
    AccountName: "i:0#.f|membership|barb.akew@us.af.mil",
    DisplayName: "AKEW, BARB N CIV USAF AFMC AFLCMC/OZIC",
    Email: "barb.akew@us.af.mil",
    Title: "IT Specialist, Application Software Developer",
    UserProfileProperties: [
      {
        Key: "FirstName",
        Value: "BARB",
        ValueType: "Edm.String",
      },
      {
        Key: "LastName",
        Value: "AKEW",
        ValueType: "Edm.String",
      },
      {
        Key: "WorkPhone",
        Value: "257-1111",
        ValueType: "Edm.String",
      },
      {
        Key: "Title",
        Value: "IT Specialist, Application Software Developer",
        ValueType: "Edm.String",
      },
    ],
  },
  {
    AccountName: "i:0#.f|membership|cole.slaw.1@us.af.mil",
    DisplayName: "SLAW, COLE D CIV USAF AFMC AFLCMC/OZIC",
    Email: "cole.slaw.1@us.af.mil",
    Title: "IT Specialist, Application Software Developer",
    UserProfileProperties: [
      {
        Key: "FirstName",
        Value: "COLE",
        ValueType: "Edm.String",
      },
      {
        Key: "LastName",
        Value: "SLAW",
        ValueType: "Edm.String",
      },
      {
        Key: "WorkPhone",
        Value: "312-986-1111",
        ValueType: "Edm.String",
      },
      {
        Key: "Title",
        Value: "IT Specialist, Application Software Developer",
        ValueType: "Edm.String",
      },
    ],
  },
];

/** Function to pick the sample profile data based on the loginName provided */
export const getSPUserProfileDataDev = (loginName: string) => {
  return spUserProfileData.find((user) => user.AccountName === loginName);
};
