import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";

type TProgramNamesAndECs = { Title: string; PEC: string }[];
type TFinalProgramNamesAndECs = { Title: string; PECs: string[] }[];

/** Hook returning the RQ for list of Program Names and associated Program Element Codes */
export const useProgramNamesAndECs = () => {
  return useQuery({
    queryKey: ["ProgramNamesAndECs"],
    queryFn: getProgramNamesAndECs, // This query transforms the data directly since we don't requery, we can do the "expensive" transform here since we don't have to worry about unchanged data
    staleTime: Infinity, // Keep stale and cached data, as this data is fairly static
    cacheTime: Infinity, // and therefore only needs loaded at the start of the application
  });
};

/** Function to retreive the Program Names and Program Element Codes, either from SharePoint, or local Dev examples
 * @returns Array of {Title: "LeadCommand", PEC:"PEC"}
 */
const getProgramNamesAndECs = async () => {
  if (!import.meta.env.DEV) {
    return spWebContext.web.lists
      .getByTitle("ProgramNamesAndElementCodes")
      .items.orderBy("Title")
      .select("Title,PEC")
      .top(5000)<TProgramNamesAndECs>()
      .then(transformData); // Transform the data before caching
  } else {
    return new Promise<TProgramNamesAndECs>((resolve) =>
      setTimeout(
        () =>
          resolve([
            { Title: "465L", PEC: "11316F" },
            { Title: "806L", PEC: "27429F" },
            { Title: "806L", PEC: "78202D" },
            { Title: "A010", PEC: "27131F" },
            { Title: "A010", PEC: "78202D" },
            { Title: "AC130J", PEC: "44011F" },
            { Title: "AC130J", PEC: "78202D" },
            { Title: "ACCESSORIES", PEC: "78202D" },
            { Title: "ACD", PEC: "28088F" },
            { Title: "ADM-160", PEC: "27442F" },
            { Title: "AERIAL TGT EGLIN", PEC: "35116F" },
            { Title: "AEWS-NWS", PEC: "12412F" },
            { Title: "AFINC", PEC: "33089F" },
            { Title: "AFMETCAL", PEC: "72207F" },
            { Title: "AGM065", PEC: "27313F" },
            { Title: "AGM086B", PEC: "11122F" },
            { Title: "AGM086C", PEC: "27323F" },
            { Title: "AGM88", PEC: "27162F" },
            { Title: "AGM-181", PEC: "64932F" },
            {
              Title: "AIFF - Advanced Identification Friend or Foe",
              PEC: "78202D",
            },
            { Title: "AIM120", PEC: "27163F" },
            { Title: "AIM260", PEC: "27163F" },
            { Title: "AIM7/9M", PEC: "27161F" },
            { Title: "AIM9X", PEC: "27161F" },
            { Title: "ALEP", PEC: "72833F" },
            { Title: "AN/FLR-9", PEC: "31011F" },
            { Title: "ARRW", PEC: "64033F" },
            { Title: "A-29C", PEC: "27100F" },
            { Title: "AT-6E", PEC: "27100F" },
            { Title: "ATCALS", PEC: "35114F" },
            { Title: "ATS", PEC: "71212F" },
            { Title: "ATS", PEC: "78202D" },
            { Title: "AgilePod", PEC: "35206F" },
            { Title: "B001", PEC: "11126F" },
            { Title: "B002", PEC: "11127F" },
            { Title: "B002", PEC: "78202D" },
            { Title: "B021", PEC: "64015F" },
            { Title: "B052", PEC: "11113F" },
            { Title: "B61-12 Tail Kit Assembly", PEC: "11125F" },
            { Title: "BCS-F", PEC: "12326F" },
            { Title: "BEAR SYSTEMS", PEC: "41135F" },
            { Title: "BISS", PEC: "78070F" },
            { Title: "BITI", PEC: "33112F" },
            { Title: "BMEWS", PEC: "C3909S" },
            { Title: "Bounty Hunter", PEC: "78070F" },
            { Title: "C012", PEC: "41314F" },
            { Title: "C017A", PEC: "41130F" },
            { Title: "C020", PEC: "41314F" },
            { Title: "C021", PEC: "41314F" },
            { Title: "C026", PEC: "52889F" },
            { Title: "C032A", PEC: "41314F" },
            { Title: "C037A VIP-SAM", PEC: "41314F" },
            { Title: "C038", PEC: "54314F" },
            { Title: "C040B", PEC: "41314F" },
            { Title: "C040C", PEC: "54324F" },
            { Title: "C130", PEC: "41115F" },
            { Title: "C130", PEC: "78202D" },
            { Title: "C130J", PEC: "41132F" },
            { Title: "C130J", PEC: "78202D" },
            { Title: "C135", PEC: "41218F" },
            { Title: "C145A", PEC: "16404" },
            { Title: "C146A", PEC: "17417" },
            { Title: "C17 GLOBEMASTER III", PEC: "41130F" },
            { Title: "C5 GALAXY", PEC: "41119F" },
            { Title: "CCS", PEC: "C3605F" },
            { Title: "CDA", PEC: "28088F" },
            { Title: "CHEMICAL", PEC: "78070F" },
            { Title: "CMM", PEC: "28038F" },
            { Title: "COBRA DANE", PEC: "C3873S" },
            {
              Title: "COMMON AVIONICS AND ELECTRONICS",
              PEC: "27597F",
            },
            {
              Title: "COMMON AVIONICS AND ELECTRONICS",
              PEC: "78202D",
            },
            { Title: "CRC", PEC: "27412F" },
            { Title: "CRC", PEC: "78202D" },
            { Title: "CS", PEC: "28064F" },
            { Title: "CSCS", PEC: "33089F" },
            { Title: "CSEL", PEC: "35176F" },
            { Title: "CV022", PEC: "41318F" },
            { Title: "CVA/H", PEC: "28088F" },
            { Title: "CYBERSPACE", PEC: "00000F" },
            { Title: "DARC", PEC: "C6425S" },
            { Title: "DCGS", PEC: "35208F" },
            { Title: "DMSP/SESS - MarkIVB", PEC: "35111F" },
            { Title: "DMSP/SESS - RSTN", PEC: "35111F" },
            { Title: "DMSP/SESS - SOON", PEC: "35111F" },
            { Title: "DRC", PEC: "41839F" },
            { Title: "E003", PEC: "27417F" },
            { Title: "E004", PEC: "32015F" },
            { Title: "E009A    ", PEC: "28015F" },
            { Title: "EC130H", PEC: "27253F" },
            { Title: "EC130J", PEC: "44011F" },
            { Title: "EG PROGRAMS", PEC: "28030F" },
            { Title: "EGLIN", PEC: "C3940S" },
            { Title: "ELECTRONIC COMBAT (EC)", PEC: "78202D" },
            { Title: "F016", PEC: "27133F" },
            { Title: "F016", PEC: "78202D" },
            { Title: "F022", PEC: "27138F" },
            { Title: "F100", PEC: "27597F" },
            { Title: "F100", PEC: "78202D" },
            { Title: "F101", PEC: "27597F" },
            { Title: "F101", PEC: "78202D" },
            { Title: "F107", PEC: "27597F" },
            { Title: "F107", PEC: "78202D" },
            { Title: "F108", PEC: "27597F" },
            { Title: "F108", PEC: "78202D" },
            { Title: "F110-100", PEC: "27597F" },
            { Title: "F110-100", PEC: "78202D" },
            { Title: "F110-129", PEC: "27597F" },
            { Title: "F110-129", PEC: "78202D" },
            { Title: "F118", PEC: "27597F" },
            { Title: "F118", PEC: "78202D" },
            { Title: "F118101", PEC: "27597F" },
            { Title: "F118101", PEC: "78202D" },
            { Title: "F119", PEC: "27597F" },
            { Title: "F135-100", PEC: "27142F" },
            { Title: "F137", PEC: "27597F" },
            { Title: "F15 UNIQUE ITEMS", PEC: "78202D" },
            { Title: "F15C/D", PEC: "27130F" },
            { Title: "F15E", PEC: "27134F" },
            { Title: "F15EX", PEC: "27146F" },
            { Title: "G0015(T)", PEC: "84748F" },
            { Title: "G0016(T)", PEC: "84748F" },
            { Title: "G0017(T)", PEC: "84748F" },
            { Title: "GENERAL SERIES", PEC: "27597F" },
            { Title: "GEODSS", PEC: "C3940S" },
            { Title: "GPS", PEC: "C3165S" },
            { Title: "GSE/ARMAMENT", PEC: "22834F" },
            { Title: "GSE/VEHICLES", PEC: "22834F" },
            { Title: "GSE/VEHICLES", PEC: "78202D" },
            { Title: "HAC RMPE", PEC: "11323F" },
            { Title: "HC130", PEC: "78202D" },
            { Title: "HC130J", PEC: "27224F" },
            { Title: "HFGCS (HF-Global)", PEC: "33133F" },
            { Title: "HH60G", PEC: "27224F" },
            { Title: "HH60U", PEC: "27224F" },
            { Title: "HH60W", PEC: "27229F" },
            { Title: "IBDSS", PEC: "78070F" },
            { Title: "IBS", PEC: "35179F" },
            { Title: "ICBM", PEC: "78202D" },
            { Title: "J85", PEC: "27597F" },
            { Title: "J85", PEC: "78202D" },
            { Title: "JDAM", PEC: "28030F" },
            { Title: "JNWPS", PEC: "28030F" },
            { Title: "JOINT STARS", PEC: "52581F" },
            { Title: "JTAGS", PEC: "35915F" },
            { Title: "KC010", PEC: "41219F" },
            { Title: "KC46", PEC: "41221F" },
            { Title: "LACKLAND", PEC: "28088F" },
            { Title: "LAIRCM", PEC: "41134F" },
            { Title: "LAIRCM", PEC: "78202D" },
            { Title: "LANDING GEAR", PEC: "78202D" },
            { Title: "LGM030", PEC: "11213F" },
            { Title: "LIFE SUPPORT SYSTEM", PEC: "22834F" },
            { Title: "LINK 16", PEC: "27434F" },
            { Title: "LOGISTICS OPERA", PEC: "27597F" },
            { Title: "MAPA", PEC: "78202D" },
            { Title: "MC130H", PEC: "44011F" },
            { Title: "MC130H", PEC: "78202D" },
            { Title: "MC130J", PEC: "44011F" },
            { Title: "MC130J", PEC: "78202D" },
            {
              Title: "MEDICAL READINESS PLATFORM",
              PEC: "28038F",
            },
            { Title: "MH139A", PEC: "12110F" },
            { Title: "MILSATCOM/AEHF", PEC: "C3605F" },
            { Title: "MILSATCOM/AFSAT", PEC: "33601F" },
            { Title: "MILSATCOM/AFWET", PEC: "C3601F" },
            { Title: "MILSATCOM/CCSC", PEC: "C3605F" },
            { Title: "MILSATCOM/GBS", PEC: "C3601F" },
            { Title: "MILSATCOM/GMT", PEC: "C3601F" },
            {
              Title: "MILSATCOM/MOBILE SHELTERS",
              PEC: "C3605F",
            },
            {
              Title: "MILSATCOM/PROTECTED TERMINALS",
              PEC: "33601F",
            },
            { Title: "MILSTAR", PEC: "78202D" },
            { Title: "MISSION PLANNING", PEC: "28006F" },
            {
              Title: "MMT (MACHINE, MATERIAL, TOOL GROUP)",
              PEC: "78202D",
            },
            { Title: "MQ1", PEC: "35219F" },
            { Title: "MQ9", PEC: "25219F" },
            { Title: "MRAP", PEC: "27365F" },
            { Title: "MUNITIONS", PEC: "28030F" },
            { Title: "NC3 INTEGRATION", PEC: "66018F" },
            { Title: "NCMC-ITW/AA Sys", PEC: "C3906S" },
            { Title: "NCR-IADS", PEC: "12326F" },
            { Title: "NEXRAD", PEC: "35111F" },
            { Title: "NORTH WARNING SYSTEM", PEC: "12412F" },
            { Title: "NUCLEAR WEAPONS", PEC: "78070F" },
            { Title: "NUDET", PEC: "35915F" },
            { Title: "OC-135B", PEC: "35145F" },
            { Title: "OC135", PEC: "41218F" },
            { Title: "P5 CTS/TCTS", PEC: "27429F" },
            { Title: "PARCS", PEC: "C3912S" },
            { Title: "PAVE PAWS", PEC: "C3912S" },
            { Title: "PK/MM REUSE", PEC: "00000F" },
            { Title: "PKI", PEC: "33135F" },
            { Title: "POWER SYSTEMS", PEC: "78202D" },
            { Title: "QF016", PEC: "35116F" },
            { Title: "RQ4", PEC: "35220F" },
            { Title: "SBIRS", PEC: "35915F" },
            { Title: "SCM C005 UNIQUE ITEMS", PEC: "78202D" },
            { Title: "SHELTERS/RADOME", PEC: "27597F" },
            { Title: "SPACE FENCE", PEC: "C3940S" },
            { Title: "SST", PEC: "C3940S" },
            { Title: "SUPPORT EQUIP", PEC: "22834F" },
            { Title: "SUPPORT EQUIP", PEC: "78202D" },
            { Title: "T-6A", PEC: "84740F" },
            { Title: "T-7A", PEC: "65223F" },
            { Title: "T001A", PEC: "84741F" },
            { Title: "T038", PEC: "84741F" },
            { Title: "T041D", PEC: "84748F" },
            { Title: "T051A", PEC: "84748F" },
            { Title: "T053A", PEC: "84748F" },
            { Title: "T53", PEC: "27597F" },
            { Title: "T56", PEC: "27597F" },
            { Title: "T56", PEC: "78202D" },
            { Title: "T400", PEC: "27597F" },
            { Title: "T400", PEC: "78202D" },
            { Title: "T700", PEC: "27597F" },
            { Title: "T700", PEC: "78202D" },
            { Title: "TACTICAL CONTROL PARTY", PEC: "27444F" },
            { Title: "TANKS", PEC: "27597F" },
            { Title: "TANKS", PEC: "78202D" },
            { Title: "TASS", PEC: "78070F" },
            { Title: "TDC", PEC: "27422F" },
            { Title: "TDL PAM", PEC: "64281F" },
            { Title: "TDHO", PEC: "78202D" },
            { Title: "TELECOM", PEC: "27597F" },
            { Title: "TELECOM", PEC: "78202D" },
            { Title: "TF33", PEC: "27597F" },
            { Title: "TF33", PEC: "78202D" },
            { Title: "TF34", PEC: "27597F" },
            { Title: "TF34", PEC: "78202D" },
            { Title: "TH01H", PEC: "84747F" },
            { Title: "TRAINERS", PEC: "27597F" },
            { Title: "U002", PEC: "35202F" },
            { Title: "U018(V)B", PEC: "84748F" },
            { Title: "UH1N", PEC: "11235F" },
            { Title: "UH1N(I)", PEC: "11235F" },
            { Title: "VC025A", PEC: "41314F" },
            { Title: "VC025B", PEC: "41319F" },
            { Title: "WC0130J", PEC: "78202D" },
            { Title: "WEATHER SERVICE", PEC: "35111F" },
          ]),
        1000
      )
    ).then(transformData); // Transform the data before caching
  }
};

/** Turn the array of TProgramNamesAndECs into an array containing the Title, and an array of PEC
 * @param data Array of {Title: "Program Name", PEC: "PEC"}
 * @returns Array of Program Names and PEC {Title: "ProgramName", PEC:"PEC" }
 */
const transformData = (data: TProgramNamesAndECs): TFinalProgramNamesAndECs => {
  // Use a Map to consolidate, and remove the duplicate Program Names
  const programNameAndPECs = new Map<string, string[]>();
  data.forEach((item) => {
    const programNamePECs = programNameAndPECs.get(item.Title);
    if (programNamePECs !== undefined) {
      programNamePECs.push(item.PEC);
    } else {
      programNameAndPECs.set(item.Title, [item.PEC]);
    }
  });

  return Array.from(programNameAndPECs, ([key, value]) => ({
    Title: key,
    PECs: value,
  }));
};
