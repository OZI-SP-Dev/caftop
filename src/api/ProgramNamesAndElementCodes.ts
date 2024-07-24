import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";

type TProgramNamesAndECs = { Title: string; PECs: string }[];

export const useProgramNamesAndECs = () => {
  return useQuery({
    queryKey: ["ProgramNamesAndECs"],
    queryFn: getProgramNamesAndECs,
    select: transformData,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

const getProgramNamesAndECs = async () => {
  if (!import.meta.env.DEV) {
    return spWebContext.web.lists
      .getByTitle("ProgramNamesAndElementCodes")
      .items.orderBy("Title")
      .select("Title,PECs")
      .top(5000)<TProgramNamesAndECs>();
  } else {
    return new Promise<TProgramNamesAndECs>((resolve) =>
      setTimeout(
        () =>
          resolve([
            { Title: "465L", PECs: '["11316F"]' },
            { Title: "806L", PECs: '["27429F", "78202D"]' },
            { Title: "A010", PECs: '["27131F", "78202D "]' },
            { Title: "AC130J", PECs: '["44011F", "78202D"]' },
            { Title: "ACCESSORIES", PECs: '["78202D"]' },
            { Title: "ACD", PECs: '["28088F"]' },
            { Title: "ADM-160", PECs: '["27442F"]' },
            { Title: "AERIAL TGT EGLIN", PECs: '["35116F"]' },
            { Title: "AEWS-NWS", PECs: '["12412F"]' },
            { Title: "AFINC", PECs: '["33089F"]' },
            { Title: "AFMETCAL", PECs: '["72207F"]' },
            { Title: "AGM065", PECs: '["27313F"]' },
            { Title: "AGM086B", PECs: '["11122F"]' },
            { Title: "AGM086C", PECs: '["27323F"]' },
            { Title: "AGM88", PECs: '["27162F"]' },
            { Title: "AGM-181", PECs: '["64932F"]' },
            {
              Title: "AIFF - Advanced Identification Friend or Foe",
              PECs: '["78202D"]',
            },
            { Title: "AIM120", PECs: '["27163F"]' },
            { Title: "AIM260", PECs: '["27163F"]' },
            { Title: "AIM7/9M", PECs: '["27161F"]' },
            { Title: "AIM9X", PECs: '["27161F"]' },
            { Title: "ALEP", PECs: '["72833F"]' },
            { Title: "AN/FLR-9", PECs: '["31011F"]' },
            { Title: "ARRW", PECs: '["64033F"]' },
            { Title: "A-29C", PECs: '["27100F"]' },
            { Title: "AT-6E", PECs: '["27100F"]' },
            { Title: "ATCALS", PECs: '["35114F"]' },
            { Title: "ATS", PECs: '["71212F", "78202D"]' },
            { Title: "AgilePod", PECs: '["35206F"]' },
            { Title: "B001", PECs: '["11126F"]' },
            { Title: "B002", PECs: '["11127F", "78202D"]' },
            { Title: "B021", PECs: '["64015F"]' },
            { Title: "B052", PECs: '["11113F"]' },
            { Title: "B61-12 Tail Kit Assembly", PECs: '["11125F"]' },
            { Title: "BCS-F", PECs: '["12326F"]' },
            { Title: "BEAR SYSTEMS", PECs: '["41135F"]' },
            { Title: "BISS", PECs: '["78070F"]' },
            { Title: "BITI", PECs: '["33112F"]' },
            { Title: "BMEWS", PECs: '["C3909S"]' },
            { Title: "Bounty Hunter", PECs: '["78070F"]' },
            { Title: "C012", PECs: '["41314F"]' },
            { Title: "C017A", PECs: '["41130F"]' },
            { Title: "C020", PECs: '["41314F"]' },
            { Title: "C021", PECs: '["41314F"]' },
            { Title: "C026", PECs: '["52889F"]' },
            { Title: "C032A", PECs: '["41314F"]' },
            { Title: "C037A VIP-SAM", PECs: '["41314F"]' },
            { Title: "C038", PECs: '["54314F"]' },
            { Title: "C040B", PECs: '["41314F"]' },
            { Title: "C040C", PECs: '["54324F"]' },
            { Title: "C130", PECs: '["41115F", "78202D"]' },
            { Title: "C130J", PECs: '["41132F", "78202D"]' },
            { Title: "C135", PECs: '["41218F"]' },
            { Title: "C145A", PECs: '["16404"]' },
            { Title: "C146A", PECs: '["17417"]' },
            { Title: "C17 GLOBEMASTER III", PECs: '["41130F"]' },
            { Title: "C5 GALAXY", PECs: '["41119F"]' },
            { Title: "CCS", PECs: '["C3605F"]' },
            { Title: "CDA", PECs: '["28088F"]' },
            { Title: "CHEMICAL", PECs: '["78070F"]' },
            { Title: "CMM", PECs: '["28038F"]' },
            { Title: "COBRA DANE", PECs: '["C3873S"]' },
            {
              Title: "COMMON AVIONICS AND ELECTRONICS",
              PECs: '["27597F", "78202D"]',
            },
            { Title: "CRC", PECs: '["27412F", "78202D"]' },
            { Title: "CS", PECs: '["28064F"]' },
            { Title: "CSCS", PECs: '["33089F"]' },
            { Title: "CSEL", PECs: '["35176F"]' },
            { Title: "CV022", PECs: '["41318F"]' },
            { Title: "CVA/H", PECs: '["28088F"]' },
            { Title: "CYBERSPACE", PECs: '["00000F"]' },
            { Title: "DARC", PECs: '["C6425S"]' },
            { Title: "DCGS", PECs: '["35208F"]' },
            { Title: "DMSP/SESS - MarkIVB", PECs: '["35111F"]' },
            { Title: "DMSP/SESS - RSTN", PECs: '["35111F"]' },
            { Title: "DMSP/SESS - SOON", PECs: '["35111F"]' },
            { Title: "DRC", PECs: '["41839F"]' },
            { Title: "E003", PECs: '["27417F"]' },
            { Title: "E004", PECs: '["32015F"]' },
            { Title: "E009A    ", PECs: '["28015F"]' },
            { Title: "EC130H", PECs: '["27253F"]' },
            { Title: "EC130J", PECs: '["44011F"]' },
            { Title: "EG PROGRAMS", PECs: '["28030F"]' },
            { Title: "EGLIN", PECs: '["C3940S"]' },
            { Title: "ELECTRONIC COMBAT (EC)", PECs: '["78202D"]' },
            { Title: "F016", PECs: '["27133F", "78202D"]' },
            { Title: "F022", PECs: '["27138F"]' },
            { Title: "F100", PECs: '["27597F", "78202D"]' },
            { Title: "F101", PECs: '["27597F", "78202D"]' },
            { Title: "F107", PECs: '["27597F", "78202D"]' },
            { Title: "F108", PECs: '["27597F", "78202D"]' },
            { Title: "F110-100", PECs: '["27597F", "78202D"]' },
            { Title: "F110-129", PECs: '["27597F", "78202D"]' },
            { Title: "F118", PECs: '["27597F", "78202D"]' },
            { Title: "F118101", PECs: '["27597F", "78202D"]' },
            { Title: "F119", PECs: '["27597F"]' },
            { Title: "F135-100", PECs: '["27142F"]' },
            { Title: "F137", PECs: '["27597F"]' },
            { Title: "F15 UNIQUE ITEMS", PECs: '["78202D"]' },
            { Title: "F15C/D", PECs: '["27130F"]' },
            { Title: "F15E", PECs: '["27134F"]' },
            { Title: "F15EX", PECs: '["27146F"]' },
            { Title: "G0015(T)", PECs: '["84748F"]' },
            { Title: "G0016(T)", PECs: '["84748F"]' },
            { Title: "G0017(T)", PECs: '["84748F"]' },
            { Title: "GENERAL SERIES", PECs: '["27597F"]' },
            { Title: "GEODSS", PECs: '["C3940S"]' },
            { Title: "GPS", PECs: '["C3165S"]' },
            { Title: "GSE/ARMAMENT", PECs: '["22834F"]' },
            { Title: "GSE/VEHICLES", PECs: '["22834F", "78202D"]' },
            { Title: "HAC RMPE", PECs: '["11323F"]' },
            { Title: "HC130", PECs: '["78202D"]' },
            { Title: "HC130J", PECs: '["27224F"]' },
            { Title: "HFGCS (HF-Global)", PECs: '["33133F"]' },
            { Title: "HH60G", PECs: '["27224F"]' },
            { Title: "HH60U", PECs: '["27224F"]' },
            { Title: "HH60W", PECs: '["27229F"]' },
            { Title: "IBDSS", PECs: '["78070F"]' },
            { Title: "IBS", PECs: '["35179F"]' },
            { Title: "ICBM", PECs: '["78202D"]' },
            { Title: "J85", PECs: '["27597F", "78202D"]' },
            { Title: "JDAM", PECs: '["28030F"]' },
            { Title: "JNWPS", PECs: '["28030F"]' },
            { Title: "JOINT STARS", PECs: '["52581F"]' },
            { Title: "JTAGS", PECs: '["35915F"]' },
            { Title: "KC010", PECs: '["41219F"]' },
            { Title: "KC46", PECs: '["41221F"]' },
            { Title: "LACKLAND", PECs: '["28088F"]' },
            { Title: "LAIRCM", PECs: '["41134F", "78202D"]' },
            { Title: "LANDING GEAR", PECs: '["78202D"]' },
            { Title: "LGM030", PECs: '["11213F"]' },
            { Title: "LIFE SUPPORT SYSTEM", PECs: '["22834F"]' },
            { Title: "LINK 16", PECs: '["27434F"]' },
            { Title: "LOGISTICS OPERA", PECs: '["27597F"]' },
            { Title: "MAPA", PECs: '["78202D"]' },
            { Title: "MC130H", PECs: '["44011F", "78202D"]' },
            { Title: "MC130J", PECs: '["44011F", "78202D"]' },
            {
              Title: "MEDICAL READINESS PLATFORM",
              PECs: '["28038F"]',
            },
            { Title: "MH139A", PECs: '["12110F"]' },
            { Title: "MILSATCOM/AEHF", PECs: '["C3605F"]' },
            { Title: "MILSATCOM/AFSAT", PECs: '["33601F"]' },
            { Title: "MILSATCOM/AFWET", PECs: '["C3601F"]' },
            { Title: "MILSATCOM/CCSC", PECs: '["C3605F"]' },
            { Title: "MILSATCOM/GBS", PECs: '["C3601F"]' },
            { Title: "MILSATCOM/GMT", PECs: '["C3601F"]' },
            {
              Title: "MILSATCOM/MOBILE SHELTERS",
              PECs: '["C3605F"]',
            },
            {
              Title: "MILSATCOM/PROTECTED TERMINALS",
              PECs: '["33601F"]',
            },
            { Title: "MILSTAR", PECs: '["78202D"]' },
            { Title: "MISSION PLANNING", PECs: '["28006F"]' },
            {
              Title: "MMT (MACHINE, MATERIAL, TOOL GROUP)",
              PECs: '["78202D"]',
            },
            { Title: "MQ1", PECs: '["35219F"]' },
            { Title: "MQ9", PECs: '["25219F"]' },
            { Title: "MRAP", PECs: '["27365F"]' },
            { Title: "MUNITIONS", PECs: '["28030F"]' },
            { Title: "NC3 INTEGRATION", PECs: '["66018F"]' },
            { Title: "NCMC-ITW/AA Sys", PECs: '["C3906S"]' },
            { Title: "NCR-IADS", PECs: '["12326F"]' },
            { Title: "NEXRAD", PECs: '["35111F"]' },
            { Title: "NORTH WARNING SYSTEM", PECs: '["12412F"]' },
            { Title: "NUCLEAR WEAPONS", PECs: '["78070F"]' },
            { Title: "NUDET", PECs: '["35915F"]' },
            { Title: "OC-135B", PECs: '["35145F"]' },
            { Title: "OC135", PECs: '["41218F"]' },
            { Title: "P5 CTS/TCTS", PECs: '["27429F"]' },
            { Title: "PARCS", PECs: '["C3912S"]' },
            { Title: "PAVE PAWS", PECs: '["C3912S"]' },
            { Title: "PK/MM REUSE", PECs: '["00000F"]' },
            { Title: "PKI", PECs: '["33135F"]' },
            { Title: "POWER SYSTEMS", PECs: '["78202D"]' },
            { Title: "QF016", PECs: '["35116F"]' },
            { Title: "RQ4", PECs: '["35220F"]' },
            { Title: "SBIRS", PECs: '["35915F"]' },
            { Title: "SCM C005 UNIQUE ITEMS", PECs: '["78202D"]' },
            { Title: "SHELTERS/RADOME", PECs: '["27597F"]' },
            { Title: "SPACE FENCE", PECs: '["C3940S"]' },
            { Title: "SST", PECs: '["C3940S"]' },
            { Title: "SUPPORT EQUIP", PECs: '["22834F", "78202D"]' },
            { Title: "T-6A", PECs: '["84740F"]' },
            { Title: "T-7A", PECs: '["65223F"]' },
            { Title: "T001A", PECs: '["84741F"]' },
            { Title: "T038", PECs: '["84741F"]' },
            { Title: "T041D", PECs: '["84748F"]' },
            { Title: "T051A", PECs: '["84748F"]' },
            { Title: "T053A", PECs: '["84748F"]' },
            { Title: "T53", PECs: '["27597F"]' },
            { Title: "T56", PECs: '["27597F", "78202D"]' },
            { Title: "T400", PECs: '["27597F", "78202D"]' },
            { Title: "T700", PECs: '["27597F", "78202D"]' },
            { Title: "TACTICAL CONTROL PARTY", PECs: '["27444F"]' },
            { Title: "TANKS", PECs: '["27597F", "78202D"]' },
            { Title: "TASS", PECs: '["78070F"]' },
            { Title: "TDC", PECs: '["27422F"]' },
            { Title: "TDL PAM", PECs: '["64281F"]' },
            { Title: "TDHO", PECs: '["78202D"]' },
            { Title: "TELECOM", PECs: '["27597F", "78202D"]' },
            { Title: "TF33", PECs: '["27597F", "78202D"]' },
            { Title: "TF34", PECs: '["27597F", "78202D"]' },
            { Title: "TH01H", PECs: '["84747F"]' },
            { Title: "TRAINERS", PECs: '["27597F"]' },
            { Title: "U002", PECs: '["35202F"]' },
            { Title: "U018(V)B", PECs: '["84748F"]' },
            { Title: "UH1N", PECs: '["11235F"]' },
            { Title: "UH1N(I)", PECs: '["11235F"]' },
            { Title: "VC025A", PECs: '["41314F"]' },
            { Title: "VC025B", PECs: '["41319F"]' },
            { Title: "WC0130J", PECs: '["78202D"]' },
            { Title: "WEATHER SERVICE", PECs: '["35111F"]' },
          ]),
        1000
      )
    );
  }
};

const transformData = (data: TProgramNamesAndECs) => {
  return data.map((item) => ({
    Title: item.Title,
    PECs: JSON.parse(item.PECs) as string[],
  }));
};
