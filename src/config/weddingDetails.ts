export const weddingDetails = {
  bride: "Lokeshwari Devi",
  brideFull: "Chi. Sow. Lokeshwari Devi",
  brideRole: "Our elder daughter",
  brideParents: "(Eldest D/o. Smt. Anugutala Padma & Late Sri Anugutala Venkatesh)",
  brideParentsTe: "(శ్రీమతి అనుగుతల పద్మ & కీ||శే|| శ్రీ అనుగుతల వెంకటేష్ గార్ల జ్యేష్ఠ పుత్రిక)",
  blessings: "With the blessings of Smt. Anugutala Rajamma - Late Sri Mallaiah",
  blessingsTe: "శ్రీమతి అనుగుతల రాజమ్మ - కీ||శే|| శ్రీ మల్లయ్య గార్ల దివ్య ఆశీస్సులతో...",
  groom: "Shiva Kumar",
  groomFull: "Chi. Shiva Kumar",
  groomRole: "Groom",
  groomParents: "(Only S/o. Smt. & Sri Medishetty Bhavani - Govind R/o. Hyderabad)",
  groomParentsTe: "(శ్రీమతి & శ్రీ మేడిశెట్టి భవాని - గోవింద్ గార్ల ఏకైక కుమారుడు, నివాసం: హైదరాబాద్)",
  hosts: {
    parents: {
      mother: "Smt. Anugutala Padma",
      father: "Late Sri Anugutala Venkatesh",
      roleEn: "Invited by (Parents)",
      roleTe: "సాదరంగా ఆహ్వానించువారు",
    },
  },
  compliments: "K. Renuka - Mohan Kumar, M. Vanitha - Shekhar Goud, Near & Dear...",
  complimentsTe: "కె. రేణుక - మోహన్ కుమార్, ఎం. వనిత - శేఖర్ గౌడ్ మరియు బంధుమిత్రులు...",
  timezone: "Asia/Kolkata",
  wedding: {
    date: "Thursday, 26 November 2026",
    shortDate: "26 November 2026",
    time: "9:16 AM IST",
    lagnam: "Dhanur Lagnam",
    startsAt: "2026-11-26T09:16:00+05:30",
  },
  mapsUrl: "https://maps.app.goo.gl/jfxgvhpnqdfpWmCQ8?g_st=iw",
  venueName: "Parimala Convention",
  venueAddress: "Chitrapuri Colony, Barkatpura Road, Narayanaguda, Hyderabad.",
} as const;

export function getCountdown(now: number) {
  const seconds = Math.max(0, Math.floor((Date.parse(weddingDetails.wedding.startsAt) - now) / 1000));
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    complete: now >= Date.parse(weddingDetails.wedding.startsAt),
  };
}
