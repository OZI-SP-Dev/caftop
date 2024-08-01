import { useQuery } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";

type TProgramGroups = { Title: string }[];

/** Hook returning the RQ for list of Program Groups */
export const useProgramGroups = () => {
  return useQuery({
    queryKey: ["ProgramGroups"],
    queryFn: getProgramGroups,
    select: transformData,
    staleTime: Infinity, // Keep stale and cached data, as this data is fairly static
    cacheTime: Infinity, // and therefore only needs loaded at the start of the application
  });
};

/** Turn the array of TProgramGroups into a regular string array
 * @param data Array of {Title: "ProgramGroup"}
 * @returns String array of the Program Groups
 */
const getProgramGroups = () => {
  if (!import.meta.env.DEV) {
    return spWebContext.web.lists
      .getByTitle("ProgramGroups")
      .items.orderBy("Title")
      .top(5000)<TProgramGroups>();
  } else {
    return new Promise<TProgramGroups>((resolve) =>
      setTimeout(
        () =>
          resolve([
            { Title: "330 TACTICAL AIRLIFT CSG" },
            { Title: "542 ELECTRONIC WARFARE CSG" },
            { Title: "642 SUPT EQMT & VEHICLES CSG" },
            { Title: "730 STRATEGIC AIRLIFT CSG" },
            { Title: "830 FIGHTER CSG" },
            { Title: "A010" },
            { Title: "ADVANCED PILOT TRAINING" },
            { Title: "AERIAL TARGETS" },
            { Title: "AERONAUTICAL MISSILES AND WEAPONS" },
            { Title: "AEWS" },
            { Title: "AF CYBER DEFENSE" },
            { Title: "AF CYBER OPERATIONS" },
            { Title: "AFMETCAL" },
            { Title: "AFSOC (C130J) " },
            { Title: "AFWS-ALC" },
            { Title: "AFWS-SMC" },
            { Title: "AGILE COMBAT SUPPORT" },
            { Title: "AIR DOMINANCE" },
            { Title: "AIR FORCE MEDICAL SERVICE" },
            { Title: "AIR FORCE WEATHER WEAPON SYSTEMS" },
            { Title: "AIR MOBILITY TACTICAL DATA SYSTEMS" },
            { Title: "AIR TRAFFIC CONTROL AND LANDING SYSTEMS" },
            { Title: "AIRCRAFT MOBILITY DIRECTORATE" },
            { Title: "AN/FPS" },
            { Title: "ANG (C130)" },
            { Title: "ARMAMENT SUSTAINMENT" },
            { Title: "ATCALS" },
            { Title: "AUTOMATIC TEST SYSTEMS" },
            { Title: "AgilePod" },
            { Title: "BA 01" },
            { Title: "B001" },
            { Title: "B002" },
            { Title: "B021" },
            { Title: "B052" },
            { Title: "BALLISTIC MISSILE EARLY WARNING SYSTEM" },
            { Title: "BASE IT INFRASTRUCTURE" },
            { Title: "BATTLE MANAGEMENT SYSTEMS" },
            { Title: "C/KC - 135 (KC-135)" },
            { Title: "C/KC - 135 (OC-135)" },
            { Title: "C005" },
            { Title: "C017" },
            { Title: "C130" },
            { Title: "C130 (C130J)" },
            { Title: "C145" },
            { Title: "C146" },
            { Title: "CHEMICAL" },
            { Title: "CLS" },
            { Title: "CLS AIRCRAFT (C012)" },
            { Title: "CLS AIRCRAFT (C020)" },
            { Title: "CLS AIRCRAFT (C021)" },
            { Title: "CLS AIRCRAFT (C026)" },
            { Title: "CLS AIRCRAFT (C038)" },
            { Title: "CLS AIRCRAFT (E004)" },
            { Title: "CLS AIRCRAFT (E009A)" },
            { Title: "CLS AIRCRAFT (KC010)" },
            { Title: "CLS AIRCRAFT (T001A)" },
            { Title: "CLS AIRCRAFT (VC025)" },
            { Title: "CLS TRAINER" },
            { Title: "CLS USAFA" },
            { Title: "CLS VIP SAM" },
            { Title: "COMBAT INFORMATION TRANSPORT SYSTEM" },
            { Title: "COMMON ALC" },
            { Title: "COMMON AVIONICS AND ELECTRONIC SYSTEMS" },
            { Title: "COMMON NWC" },
            { Title: "COMSEC Systems" },
            {
              Title:
                "Consolidated Sustainment Activity Group (CSAG) - Supply Division - Robins",
            },
            { Title: "COUNTERSPACE OPS" },
            { Title: "CRC" },
            { Title: "CRUISE MISSILE GROUP" },
            { Title: "CSAG-S HILL" },
            { Title: "CSAG-S ROBINS" },
            { Title: "CSAG-S TINKER" },
            { Title: "CSEL" },
            { Title: "CV22" },
            { Title: "CV022" },
            { Title: "CYBERSPACE" },
            { Title: "DEFENSE METEOROLOGICAL SATELLITE PROGRAM" },
            { Title: "DEPLOYABLE C3" },
            { Title: "DISTRIBUTED COMMON GROUND SYSTEMS" },
            { Title: "DYNAMIC RETASKING GROUP" },
            { Title: "E003 AIRBORNE WARNING & CONTROL SYSTEM" },
            { Title: "EOD" },
            { Title: "F015C/D" },
            { Title: "F015E" },
            { Title: "F015EX" },
            { Title: "F016" },
            { Title: "F022" },
            { Title: "F035" },
            { Title: "FORCE PROTECTION" },
            { Title: "GLOBAL HAWK" },
            { Title: "H001" },
            { Title: "HC-130-King" },
            { Title: "HH60" },
            { Title: "HIGH FREQUENCY GLOBAL COMMUNICATIONS SYSTEMS" },
            { Title: "HNC-CR" },
            { Title: "HNC-CY" },
            { Title: "HNC-PS" },
            { Title: "HUMAN SYSTEMS" },
            { Title: "IBS" },
            { Title: "ICBM" },
            { Title: "JOINT STARS" },
            { Title: "KC46 TANKER SQUADRONS" },
            { Title: "LAUNCH AND TEST RANGE SYSTEM" },
            { Title: "LIGHT ATTACK AIRCRAFT (LAA) A-29" },
            { Title: "LIGHT ATTACK AIRCRAFT (LAA) AT-6" },
            { Title: "LINK 16 SUPPORT AND SUSTAINMENT" },
            { Title: "LONG RANGE STAND-OFF" },
            { Title: "LONG RANGE SYSTEMS " },
            { Title: "MH139" },
            { Title: "MILITARY SATELLITE COMMUNICATION" },
            { Title: "MILSATCom-MMP" },
            { Title: "MQ" },
            { Title: "MW/MD Ground Based Radars" },
            { Title: "NAVSTAR GPS" },
            { Title: "NC3" },
            { Title: "NCMC-ITW/AA" },
            { Title: "PHYSIOLOGICAL TRAINERS" },
            { Title: "PROPULSION (AIRCRAFT GAS TURBINE ENGINES)" },
            { Title: "PROVEN AIRCRAFT" },
            { Title: "RANGE THREAT SYSTEMS" },
            { Title: "RECONNAISSANCE EC130H" },
            { Title: "RSLP" },
            { Title: "SECURITY ASSISTANCE TECHNICAL ORDER PROGRAM" },
            { Title: "SLBM RADAR WARNING SYSTEMS" },
            { Title: "SOF (C130)" },
            { Title: "SPACE BASED INFRARED SYSTEMS PROGRAMS" },
            { Title: "SPACE FENCE SURVEILLANCE SYSTEM" },
            { Title: "SPACE INNOVATION AND DEVLOPMENT CENTER" },
            { Title: "SPACE SITUATION AWARENESS OPERATIONS" },
            { Title: "SUPPORT EQUIPMENT AND VEHICLES" },
            { Title: "T038" },
            { Title: "TACP" },
            { Title: "TACTICAL SHELTER SYSTEMS RADOMES AND TOWERS" },
            { Title: "TDN" },
            { Title: "TELECOMMUNICATIONS" },
            { Title: "TEST AND TRAINING SYSTEMS" },
            { Title: "TRAINING SYSTEMS" },
            { Title: "U002" },
            { Title: "UH01" },
            { Title: "VC-025B CDA" },
          ]),
        1000
      )
    );
  }
};

/** Turn the array of TProgramGroups into a regular string array
 * @param data Array of {Title: "ProgramGroup"}
 * @returns String array of the Program Groups
 */
const transformData = (data: TProgramGroups) => {
  return data.map((item) => item.Title);
};
