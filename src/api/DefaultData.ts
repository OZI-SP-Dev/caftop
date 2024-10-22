import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";
import { useCAFTOP } from "./CAFTOP/useCAFTOP";
import { useParams } from "react-router-dom";
import { CAFTOPInfo } from "./CAFTOP/types";
import DOMPurify from "dompurify";

DOMPurify.addHook("afterSanitizeAttributes", function (node) {
  if (node.tagName === "A") {
    // Set all links in the Description to be opened in a new tab
    node.setAttribute("target", "_blank");
    // Reduce security/performance issues associated with opening in a new tab
    node.setAttribute("rel", "noreferer");
  }
});

type TDefaultData = {
  Title: string;
  Value: string | null;
  ValueRTF: string | null;
}[];

/** Interal Hook returning the RQ for the default data */
const useDefaultData = () => {
  /** Function to retreive the Centers, either from SharePoint, or local Dev examples
   * @returns Array of {Title: "Center"}
   */
  const getDefaultData = async () => {
    if (!import.meta.env.DEV) {
      return spWebContext.web.lists
        .getByTitle("DefaultData")
        .items.select("Title", "Value", "ValueRTF")
        .top(5000)<TDefaultData>()
        .then(transformData);
    } else {
      return new Promise<TDefaultData>((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                Title: "Description",
                Value:
                  "Description of the program and other general information about the program would go into this paragraph. The following are only examples. Detailed narrative requirement for 1.0 are listed in the CAFTOP Handbook, Appendix A, CAFTOP Narrative Format and Guidance.",
                ValueRTF: null,
              },
              {
                Title: "Introduction",
                Value:
                  "The overall health of {ProgramName} Technical Orders (TOs) is good. All  TOs are in digital format Portable Document Format (PDF) and available in the Enhanced Technical Information Management System (ETIMS).",
                ValueRTF: null,
              },
              {
                Title: "HelpLink",
                Value: "https://usaf.dps.mil/sites/10792/SitePages/Home.aspx",
                ValueRTF: null,
              },
              {
                Title: "HomepageNotice",
                Value: null,
                ValueRTF: `<div class="ExternalClassF29FA89BF7E548F89AE404BD64FE2051"><div style="font-family:Calibri, Arial, Helvetica, sans-serif;font-size:11pt;color:rgb(0, 0, 0);"><span style="font-family:&quot;times new roman&quot;;font-size:14pt;">Annual completion of the CAFTOP is required by AFI63-101/20-10, AFMCI63-101 and 00-5-3. The CAFTOP process and completion requirement applies to all Air Force programs, regardless of support concept, life cycle phase or funding source.</span><br></div></div>`,
              },
              {
                Title: "Announcements",
                Value: null,
                ValueRTF: `<div class="ExternalClass99C9C0516E5F4AC7B5F8B6074BE99A82"><div style="font-family:Calibri, Arial, Helvetica, sans-serif;font-size:11pt;color:rgb(0, 0, 0);"><span style="font-size:12pt;line-height:normal;font-family:&quot;Times New Roman&quot;, serif;">Comprehensive Air Force Technical Order Plan (CAFTOP) will kick-off Mid January.</span><br></div></div>`,
              },
              {
                Title: "Help",
                Value: null,
                ValueRTF: `<div><div class="ExternalClassDA21B46894DF45FB86B706000C7E5B24"><div style="font-family:Calibri, Arial, Helvetica, sans-serif;font-size:11pt;color:rgb(0, 0, 0);"><p align="center" style="text-align:left;margin:0in 0in 8pt;line-height:107%;font-size:11pt;font-family:Calibri, Arial, Helvetica, sans-serif;color:rgb(0, 0, 0);"><u style="font-family:&quot;times new roman&quot;;font-size:14pt;color:rgb(50, 49, 48);font-weight:bold;">Links:</u><br></p></div></div><div><p style="font-weight:bold;text-decoration-line:underline;"><b style="font-family:&quot;times new roman&quot;;font-size:12pt;color:rgb(0, 0, 0);"><a href="/sites/10792/SitePages/Home.aspx" title="CAFTOP SharePoint site">CAFTOP SharePoint site</a></b></p><div style="font-weight:bold;text-decoration-line:underline;margin-top:14px;margin-bottom:14px;"><b style="background-color:rgb(255, 255, 255);font-family:&quot;times new roman&quot;;font-size:12pt;color:rgb(0, 0, 0);"><b style="text-align:-webkit-center;background-color:rgb(255, 255, 255);"><a href="/sites/10792/GUIDANCE/Forms/AllItems.aspx?viewpath=/sites/10792/GUIDANCE/Forms/AllItems.aspx&amp;id=/sites/10792/GUIDANCE/2024-FY2026&amp;viewid=5d20f15a-62bf-46c3-9426-8e54735191ef" title="Guidance Folder">Guidance Folder</a></b></b><br></div><p style="font-weight:bold;"><b style="font-family:&quot;times new roman&quot;;font-size:12pt;color:rgb(0, 0, 0);">CAFTOP Automation Tool user guide (Coming soon)</b></p><p style="font-weight:bold;text-decoration-line:underline;"><br></p><p style=""><font color="#000000" face="times new roman"><span style="font-size:14pt;"><b><u>Points of Contact:</u></b></span></font></p><p style=""><a href="mailto:HQAFMC.A4FI.CAFTOPTOOLHELP@us.af.mil" style="font-family:Aptos, sans-serif;font-size:11pt;"><span style="font-size:12pt;line-height:normal;font-family:&quot;times new roman&quot;;">HQAFMC.A4FI.CAFTOPTOOLHELP@us.af.mil</span></a></p><p style=""><span style="font-family:&quot;times new roman&quot;;font-size:12pt;">Additional contacts are listed on the</span> <b style="font-family:&quot;times new roman&quot;;font-size:12pt;color:rgb(0, 0, 0);"><a href="/sites/10792/SitePages/Home.aspx" title="CAFTOP Home Page">CAFTOP Home Page</a></b></p><p style=""><br></p><p style=""><span style="font-family:&quot;times new roman&quot;;font-size:14pt;"><b><u>How To:</u></b></span></p><p style=""><a href="/:w:/r/teams/10251/CAFTOP-DEV/Shared%20Documents/Update_Table_of_Contents.docx?d=w6cb05686ee9d4821ac36fb6a3a9fe5d5&amp;csf=1&amp;web=1&amp;e=VqRZFc" title="Update a table of contents in Microsoft Word"><span style="font-family:&quot;times new roman&quot;;font-size:12pt;">Update a table of contents in Microsoft Word</span></a></p><p style=""><span style="font-family:Aptos, sans-serif;font-size:11pt;color:rgb(0, 0, 0);"><span style="font-family:&quot;times new roman&quot;;font-size:12pt;"><a href="/:w:/r/sites/10792/GUIDANCE/2024-FY2026/26_CAFTOP%20Handbook_20231212_Final.docx?d=w765f47f696cb4ea5b44b5bd61a8c0998&amp;csf=1&amp;web=1&amp;e=h11H9V&amp;nav=eyJoIjoiMjA1Mzg5MTE5NiJ9" style="" title="Adding a Digital Signature line to a Document">Adding a Digital Signature line to a Document</a></span></span></p></div></div>`,
              },
              {
                Title: "Purpose",
                Value: null,
                ValueRTF: `<div class="ExternalClass45D0AB2E58C74243A0B6A98AE90864D0"><div style="font-family:Calibri, Arial, Helvetica, sans-serif;font-size:11pt;color:rgb(0, 0, 0);"><p style="margin:0in 0in 10pt;line-height:115%;font-size:11pt;font-family:Aptos, sans-serif;margin-bottom:0in;text-indent:.5in;line-height:normal;"><span style="font-size:12pt;font-family:&quot;Times New Roman&quot;, serif;color:black;">This Comprehensive Air Force Technical Order Plan (CAFTOP) Narrative automation tool is to assist and recommended for use by all program offices in the development of the CAFTOP Narrative. This automation tool was created to standardize the narrative across all AF programs since their work should be fairly standard. Each program may add material to each section in case the standard material requires additional clarification. </span></p><p style="margin:0in 0in 10pt;line-height:115%;font-size:11pt;font-family:Aptos, sans-serif;margin-bottom:0in;text-indent:.5in;line-height:normal;"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;color:black;"><span style="">&nbsp;</span>Program Description and General Introduction Page section is for each program’s use in explaining their area-of-responsibility and the efforts within the program. Refer to Appendix A Section 1.0 in the CAFTOP Handbook for detailed instructions for each paragraph. By answering the questions within the automation tool Sections 2.0 through 4.0 will be included or excluded from the
final document. The narrative details the areas of activity to sustain and distribute the programs TOs on an annual basis. General descriptions and impacts within the template for TOs are typical for any program in the AF and explain all the activities covered for labor and distribution. Section 3.0 Program Distribution uses the term “Non-Mod” which means “Non-Modification”. The term “Non-Mod” will be used through-out the template to match the TOIS verbiage. Section 4.0 accounts for special projects, so those activities requirements can be tracked separate from sustainment labor and distribution activities. General descriptions are to be used throughout the narrative sections 2.0 through 3.0. If additional information is required, it can be added after the initial Descriptions or Impact. Descriptions and impacts are sent to CAM for any recommendations annually, prior to the CAFTOP kick-off. <span style="">&nbsp;</span>The narrative will assist<span style="">&nbsp; </span>File Maintainer’s in populating </span><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;">Logistics Requirements Determination Process (</span><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;color:black;">LRDP) tasks minimizing non-concurs.</span></p></div></div>`,
              },
            ]),
          1000
        )
      ).then(transformData);
    }
  };

  /*function decodeHtmlEntities(text: string) {
    return text.replace(/&#(\d+);/g, function (_match, dec) {
      return String.fromCharCode(dec);
    });
  }*/

  /** Turn the array of TDefaultData into a Map
   * @param data Array of {Title: "Key", Value: "DefaultData"}
   * @returns Map of the Default Data Key/Value
   */
  const transformData = (data: TDefaultData) => {
    const dataMap = new Map<string, string>();
    const valuesInRTF = ["HomepageNotice", "Announcements", "Help", "Purpose"];
    data.forEach((entry) => {
      if (valuesInRTF.includes(entry.Title)) {
        //const value = decodeHtmlEntities(entry.ValueRTF ?? "");
        const value = DOMPurify.sanitize(entry.ValueRTF ?? "");
        dataMap.set(entry.Title, value);
      } else {
        dataMap.set(entry.Title, entry.Value ?? "");
      }
    });

    return dataMap;
  };

  return useQuery({
    queryKey: ["DefaultData"],
    queryFn: getDefaultData, // This query transforms the data directly since we don't requery, we can do the "expensive" transform here since we don't have to worry about unchanged data
    staleTime: Infinity, // Keep stale and cached data, as this data is fairly static
    cacheTime: Infinity, // and therefore only needs loaded at the start of the application
  });
};

const trnasform = (value: string, caftopData: CAFTOPInfo) => {
  // Replace {ProgramName} with the selected Program Name
  return value.replaceAll("{ProgramName}", caftopData.ProgramName ?? "");
};

/** Hook returning the default Description */
export const useDefaultDescription = () => {
  const defaultData = useDefaultData();
  const { itemId } = useParams();
  const caftop = useCAFTOP(parseInt(itemId ?? "0"), "Info");
  if (caftop.data === undefined || defaultData.data === undefined) {
    return "";
  }

  return trnasform(defaultData.data.get("Description") ?? "", caftop.data);
};

/** Hook returning the default Introduction */
export const useDefaultIntroduction = () => {
  const defaultData = useDefaultData();
  const { itemId } = useParams();
  const caftop = useCAFTOP(parseInt(itemId ?? "0"), "Info");
  if (caftop.data === undefined || defaultData.data === undefined) {
    return "";
  }

  return trnasform(defaultData.data.get("Introduction") ?? "", caftop.data);
};

/** Hook returning the Help link website */
export const useDefaultHelpLink = () => {
  const defaultData = useDefaultData();

  return defaultData?.data?.get("HelpLink") ?? "";
};

/** Hook returning the Homepage Notice text */
export const useHomepageNotice = () => {
  const defaultData = useDefaultData();

  return defaultData?.data?.get("HomepageNotice") ?? "";
};

/** Hook returning the Announcements section */
export const useAnnouncements = () => {
  const defaultData = useDefaultData();

  return defaultData?.data?.get("Announcements") ?? "";
};

/** Hook returning the Help section */
export const useHelp = () => {
  const defaultData = useDefaultData();

  return defaultData?.data?.get("Help") ?? "";
};

/** Hook returning the Purpose section */
export const usePurpose = () => {
  const defaultData = useDefaultData();

  return defaultData?.data?.get("Purpose") ?? "";
};
