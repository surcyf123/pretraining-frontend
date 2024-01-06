import { downloadData } from "aws-amplify/storage";
import type { NeuronDetails } from "../components/MetagraphTable";
import type { HistoryData, RunDetails } from "../utils";

export type Candlestick = [number, number, number, number, number]; // [Date, Opening price, Highest price, Lowest price, Closing price]

interface TaoPrice {
  symbol: string;
  price: number;
}

interface TaoPriceChangeStatistics {
  symbol: string;
  priceChange: number;
  priceChangePercent: number;
  prevClosePrice: number;
  lastPrice: number;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  quoteVolume: number;
  openTime: number;
  closeTime: number;
  count?: number | null;
}

export interface Vitals {
  trust: number;
  rank: number;
  consensus: number;
  emission: number;
  netUID: string;
  label: string;
}

export interface Validator {
  uid: number;
  stake: number;
  hotkey: string;
  coldkey: string;
  address: string;
  name?: string;
  url?: string;
  description?: string;
  signature?: string;
  [key: string]: string | number | undefined;
}

export interface MetagraphMetadata {
  netuid: number;
  n: number;
  block: number;
  network: string;
  version: string;
}

const BaseURL = "https://api.openpretrain.ai";

// TODO: Fetch data from api
export function fetchTableData(): Record<string, (RunDetails | null)[]> {
  const output = {
    "validator-116-2024-01-06_09-31-04": [
      {
        timestamp: 1704533457.4870937,
        pages: [478144776, 661655110, 56624900],
        uids: [
          132, 138, 139, 140, 141, 142, 143, 145, 146, 148, 149, 151, 153, 154, 155, 156, 163, 164, 171, 46, 175, 51,
          181, 189, 191, 192, 193, 65, 246, 253,
        ],
        uid_data: {
          "132": {
            uid: 132,
            block: 2087190,
            average_loss: 3.472455038641491,
            win_rate: 0.15429146740498365,
            win_total: 613,
            weight: 7.002338264783248e-8,
          },
          "138": {
            uid: 138,
            block: 2080564,
            average_loss: 3.475756683488832,
            win_rate: 0.2600050339793607,
            win_total: 1033,
            weight: 8.21063906641939e-7,
          },
          "139": {
            uid: 139,
            block: 2084750,
            average_loss: 3.4526331720561005,
            win_rate: 0.38484772212433926,
            win_total: 1529,
            weight: 3.101456968579441e-5,
          },
          "140": {
            uid: 140,
            block: 2084741,
            average_loss: 3.452041676444729,
            win_rate: 0.4271331487540901,
            win_total: 1697,
            weight: 8.119452104438096e-5,
          },
          "141": {
            uid: 141,
            block: 2084732,
            average_loss: 3.4518555515874043,
            win_rate: 0.4563302290460609,
            win_total: 1813,
            weight: 0.00019254794460721314,
          },
          "142": {
            uid: 142,
            block: 2080512,
            average_loss: 3.476538339670557,
            win_rate: 0.4024666498867355,
            win_total: 1599,
            weight: 2.7011266865883954e-5,
          },
          "143": {
            uid: 143,
            block: 2080503,
            average_loss: 3.4771871705994988,
            win_rate: 0.45758872388623206,
            win_total: 1818,
            weight: 0.00010169421148020774,
          },
          "145": {
            uid: 145,
            block: 2080495,
            average_loss: 3.477516762531587,
            win_rate: 0.5398942864334256,
            win_total: 2145,
            weight: 0.000829863827675581,
          },
          "146": {
            uid: 146,
            block: 2080503,
            average_loss: 3.4749535174265396,
            win_rate: 0.48879939592247673,
            win_total: 1942,
            weight: 0.00023458270879928023,
          },
          "148": {
            uid: 148,
            block: 2080484,
            average_loss: 3.4752492608815215,
            win_rate: 0.6101182985149761,
            win_total: 2424,
            weight: 0.004873533733189106,
          },
          "149": {
            uid: 149,
            block: 2080475,
            average_loss: 3.4770299796640436,
            win_rate: 0.6435942612635288,
            win_total: 2557,
            weight: 0.0111333467066288,
          },
          "151": {
            uid: 151,
            block: 2080466,
            average_loss: 3.477370808594418,
            win_rate: 0.6780770198842184,
            win_total: 2694,
            weight: 0.02551734633743763,
          },
          "153": {
            uid: 153,
            block: 2080522,
            average_loss: 3.4894937163721904,
            win_rate: 0.28416813491064685,
            win_total: 1129,
            weight: 1.2627019714273047e-6,
          },
          "154": {
            uid: 154,
            block: 2080458,
            average_loss: 3.4768616631083247,
            win_rate: 0.7097910898565316,
            win_total: 2820,
            weight: 0.06109413132071495,
          },
          "155": {
            uid: 155,
            block: 2080449,
            average_loss: 3.4758226349406,
            win_rate: 0.7475459350616662,
            win_total: 2970,
            weight: 0.15113846957683563,
          },
          "156": {
            uid: 156,
            block: 2078893,
            average_loss: 3.475756683488832,
            win_rate: 0.7825320916184244,
            win_total: 3109,
            weight: 0.3629039525985718,
          },
          "163": {
            uid: 163,
            block: 2080534,
            average_loss: 3.4893079656754096,
            win_rate: 0.21369242386106216,
            win_total: 849,
            weight: 2.277797079841548e-7,
          },
          "164": {
            uid: 164,
            block: 2080532,
            average_loss: 3.4888340608917012,
            win_rate: 0.25622954945884724,
            win_total: 1018,
            weight: 5.964581077932962e-7,
          },
          "171": {
            uid: 171,
            block: 2080516,
            average_loss: 3.4760850050153524,
            win_rate: 0.36999748301031965,
            win_total: 1470,
            weight: 1.1725608601409476e-5,
          },
          "46": {
            uid: 46,
            block: 2084700,
            average_loss: 3.4503820986643325,
            win_rate: 0.5310848225522276,
            win_total: 2110,
            weight: 0.0012630893616005778,
          },
          "175": {
            uid: 175,
            block: 2084657,
            average_loss: 3.4503820986643325,
            win_rate: 0.7034986156556758,
            win_total: 2795,
            weight: 0.09275148808956146,
          },
          "51": {
            uid: 51,
            block: 2084692,
            average_loss: 3.4503820986643325,
            win_rate: 0.5655675811729172,
            win_total: 2247,
            weight: 0.0029822762589901686,
          },
          "181": {
            uid: 181,
            block: 2084684,
            average_loss: 3.4503820986643325,
            win_rate: 0.6000503397936069,
            win_total: 2384,
            weight: 0.007041966542601585,
          },
          "189": {
            uid: 189,
            block: 2080503,
            average_loss: 3.476068126024121,
            win_rate: 0.46992197331990937,
            win_total: 1867,
            weight: 0.00015517290739808232,
          },
          "191": {
            uid: 191,
            block: 2084683,
            average_loss: 3.4503820986643325,
            win_rate: 0.6345330984142965,
            win_total: 2521,
            weight: 0.01662922278046608,
          },
          "192": {
            uid: 192,
            block: 2080492,
            average_loss: 3.4761207416979936,
            win_rate: 0.5756355398942864,
            win_total: 2287,
            weight: 0.0021225525997579098,
          },
          "193": {
            uid: 193,
            block: 2084671,
            average_loss: 3.4503820986643325,
            win_rate: 0.6690158570349861,
            win_total: 2658,
            weight: 0.03927185386419296,
          },
          "65": {
            uid: 65,
            block: 2084708,
            average_loss: 3.4503820986643325,
            win_rate: 0.4966020639315379,
            win_total: 1973,
            weight: 0.0005349998828023672,
          },
          "246": {
            uid: 246,
            block: 2086784,
            average_loss: 3.4785147061313157,
            win_rate: 0.1490057890762648,
            win_total: 592,
            weight: 6.708606292704644e-8,
          },
          "253": {
            uid: 253,
            block: 2083367,
            average_loss: 3.4503820986643325,
            win_rate: 0.7379813742763655,
            win_total: 2932,
            weight: 0.21907363831996918,
          },
        },
        best_average_loss: 3.4503820986643325,
      },
      {
        timestamp: 1704533716.4890661,
        pages: [374056156, 98665961, 349736822],
        uids: [
          132, 138, 139, 140, 141, 142, 143, 145, 146, 148, 149, 151, 153, 154, 155, 156, 163, 164, 171, 46, 175, 51,
          181, 189, 191, 192, 193, 65, 246, 253,
        ],
        uid_data: {
          "132": {
            uid: 132,
            block: 2087190,
            average_loss: 3.5202774979450084,
            win_rate: 0.23467432950191572,
            win_total: 735,
            weight: 7.286093506309044e-8,
          },
          "138": {
            uid: 138,
            block: 2080564,
            average_loss: 3.5232589575979443,
            win_rate: 0.34195402298850575,
            win_total: 1071,
            weight: 8.827595934235433e-7,
          },
          "139": {
            uid: 139,
            block: 2084750,
            average_loss: 3.5545068405292652,
            win_rate: 0.2614942528735632,
            win_total: 819,
            weight: 2.7932352168136276e-5,
          },
          "140": {
            uid: 140,
            block: 2084741,
            average_loss: 3.55418708368584,
            win_rate: 0.2905491698595147,
            win_total: 910,
            weight: 7.311484660021961e-5,
          },
          "141": {
            uid: 141,
            block: 2084732,
            average_loss: 3.55471799770991,
            win_rate: 0.33109833971902936,
            win_total: 1037,
            weight: 0.00017340276099275798,
          },
          "142": {
            uid: 142,
            block: 2080512,
            average_loss: 3.523793284539823,
            win_rate: 0.4782886334610473,
            win_total: 1498,
            weight: 2.8655231290031224e-5,
          },
          "143": {
            uid: 143,
            block: 2080503,
            average_loss: 3.5254468851619296,
            win_rate: 0.5181992337164751,
            win_total: 1623,
            weight: 0.00010330960503779352,
          },
          "145": {
            uid: 145,
            block: 2080495,
            average_loss: 3.5249103793391474,
            win_rate: 0.611749680715198,
            win_total: 1916,
            weight: 0.0008690670947544277,
          },
          "146": {
            uid: 146,
            block: 2080503,
            average_loss: 3.5225054136028997,
            win_rate: 0.5676883780332056,
            win_total: 1778,
            weight: 0.00025173556059598923,
          },
          "148": {
            uid: 148,
            block: 2080484,
            average_loss: 3.522225168016222,
            win_rate: 0.6941251596424011,
            win_total: 2174,
            weight: 0.005344289354979992,
          },
          "149": {
            uid: 149,
            block: 2080475,
            average_loss: 3.5250200872068054,
            win_rate: 0.7155172413793104,
            win_total: 2241,
            weight: 0.011655609123408794,
          },
          "151": {
            uid: 151,
            block: 2080466,
            average_loss: 3.525104158454471,
            win_rate: 0.7509578544061303,
            win_total: 2352,
            weight: 0.026932664215564728,
          },
          "153": {
            uid: 153,
            block: 2080522,
            average_loss: 3.538308691095423,
            win_rate: 0.34099616858237547,
            win_total: 1068,
            weight: 1.2768310853061848e-6,
          },
          "154": {
            uid: 154,
            block: 2080458,
            average_loss: 3.5253132890771934,
            win_rate: 0.7841634738186463,
            win_total: 2456,
            weight: 0.06408371776342392,
          },
          "155": {
            uid: 155,
            block: 2080449,
            average_loss: 3.5245911324465715,
            win_rate: 0.8208812260536399,
            win_total: 2571,
            weight: 0.15880975127220154,
          },
          "156": {
            uid: 156,
            block: 2078893,
            average_loss: 3.5232589575979443,
            win_rate: 0.8601532567049809,
            win_total: 2694,
            weight: 0.38743290305137634,
          },
          "163": {
            uid: 163,
            block: 2080534,
            average_loss: 3.5379250557334334,
            win_rate: 0.27618135376756064,
            win_total: 865,
            weight: 2.3277627292372927e-7,
          },
          "164": {
            uid: 164,
            block: 2080532,
            average_loss: 3.537447494489175,
            win_rate: 0.31257982120051087,
            win_total: 979,
            weight: 6.058106123418838e-7,
          },
          "171": {
            uid: 171,
            block: 2080516,
            average_loss: 3.5240499244795904,
            win_rate: 0.44316730523627074,
            win_total: 1388,
            weight: 1.235886611539172e-5,
          },
          "46": {
            uid: 46,
            block: 2084700,
            average_loss: 3.5523343218697443,
            win_rate: 0.4051724137931034,
            win_total: 1269,
            weight: 0.0011374788591638207,
          },
          "175": {
            uid: 175,
            block: 2084657,
            average_loss: 3.5523343218697443,
            win_rate: 0.5775862068965517,
            win_total: 1809,
            weight: 0.08352834731340408,
          },
          "51": {
            uid: 51,
            block: 2084692,
            average_loss: 3.5523343218697443,
            win_rate: 0.4396551724137931,
            win_total: 1377,
            weight: 0.0026857026387006044,
          },
          "181": {
            uid: 181,
            block: 2084684,
            average_loss: 3.5523343218697443,
            win_rate: 0.47413793103448276,
            win_total: 1485,
            weight: 0.006341686472296715,
          },
          "189": {
            uid: 189,
            block: 2080503,
            average_loss: 3.5233652746235884,
            win_rate: 0.5491698595146871,
            win_total: 1720,
            weight: 0.00016521687211934477,
          },
          "191": {
            uid: 191,
            block: 2084683,
            average_loss: 3.5523343218697443,
            win_rate: 0.5086206896551724,
            win_total: 1593,
            weight: 0.014975574798882008,
          },
          "192": {
            uid: 192,
            block: 2080492,
            average_loss: 3.523467015337061,
            win_rate: 0.6497445721583652,
            win_total: 2035,
            weight: 0.002226203680038452,
          },
          "193": {
            uid: 193,
            block: 2084671,
            average_loss: 3.5523343218697443,
            win_rate: 0.5431034482758621,
            win_total: 1701,
            weight: 0.03536663204431534,
          },
          "65": {
            uid: 65,
            block: 2084708,
            average_loss: 3.5523343218697443,
            win_rate: 0.3706896551724138,
            win_total: 1161,
            weight: 0.0004817948502022773,
          },
          "246": {
            uid: 246,
            block: 2086784,
            average_loss: 3.5262388211709483,
            win_rate: 0.23563218390804597,
            win_total: 738,
            weight: 7.045581895681607e-8,
          },
          "253": {
            uid: 253,
            block: 2083367,
            average_loss: 3.5523343218697443,
            win_rate: 0.6120689655172413,
            win_total: 1917,
            weight: 0.19728943705558777,
          },
        },
        best_average_loss: 3.5202774979450084,
      },
      {
        timestamp: 1704533949.3714926,
        pages: [56910397, 19663558, 604129503],
        uids: [
          132, 138, 139, 140, 141, 142, 143, 145, 146, 148, 149, 151, 153, 154, 155, 156, 163, 164, 171, 46, 175, 51,
          181, 189, 191, 192, 193, 65, 246, 253,
        ],
        uid_data: {
          "132": {
            uid: 132,
            block: 2087190,
            average_loss: 3.3756562138462924,
            win_rate: 0.11835973904939422,
            win_total: 381,
            weight: 6.733777979661681e-8,
          },
          "138": {
            uid: 138,
            block: 2080564,
            average_loss: 3.3788943720293476,
            win_rate: 0.23237030133581857,
            win_total: 748,
            weight: 8.249689926742576e-7,
          },
          "139": {
            uid: 139,
            block: 2084750,
            average_loss: 3.3344308470820523,
            win_rate: 0.44889717303510407,
            win_total: 1445,
            weight: 3.1978262995835394e-5,
          },
          "140": {
            uid: 140,
            block: 2084741,
            average_loss: 3.3331212052353867,
            win_rate: 0.48803976390183285,
            win_total: 1571,
            weight: 8.39998247101903e-5,
          },
          "141": {
            uid: 141,
            block: 2084732,
            average_loss: 3.3337389005197062,
            win_rate: 0.5246971109040075,
            win_total: 1689,
            weight: 0.00020156017853878438,
          },
          "142": {
            uid: 142,
            block: 2080512,
            average_loss: 3.37955911954244,
            win_rate: 0.371233302267785,
            win_total: 1195,
            weight: 2.6770952899823897e-5,
          },
          "143": {
            uid: 143,
            block: 2080503,
            average_loss: 3.3798740103438094,
            win_rate: 0.42870456663560114,
            win_total: 1380,
            weight: 9.710686572361737e-5,
          },
          "145": {
            uid: 145,
            block: 2080495,
            average_loss: 3.380959884540455,
            win_rate: 0.5054364709537124,
            win_total: 1627,
            weight: 0.0008102708961814642,
          },
          "146": {
            uid: 146,
            block: 2080503,
            average_loss: 3.378391491400229,
            win_rate: 0.45573159366262816,
            win_total: 1467,
            weight: 0.0002346754481550306,
          },
          "148": {
            uid: 148,
            block: 2080484,
            average_loss: 3.3791657202952616,
            win_rate: 0.5756446101273688,
            win_total: 1853,
            weight: 0.004972469061613083,
          },
          "149": {
            uid: 149,
            block: 2080475,
            average_loss: 3.3801776825844705,
            win_rate: 0.6088847468157813,
            win_total: 1960,
            weight: 0.010863336734473705,
          },
          "151": {
            uid: 151,
            block: 2080466,
            average_loss: 3.381017530286634,
            win_rate: 0.6427461944703324,
            win_total: 2069,
            weight: 0.02510973997414112,
          },
          "153": {
            uid: 153,
            block: 2080522,
            average_loss: 3.3928751215204462,
            win_rate: 0.22926374650512582,
            win_total: 738,
            weight: 1.1773552159866085e-6,
          },
          "154": {
            uid: 154,
            block: 2080458,
            average_loss: 3.380732959455198,
            win_rate: 0.6778502640571606,
            win_total: 2182,
            weight: 0.05976862832903862,
          },
          "155": {
            uid: 155,
            block: 2080449,
            average_loss: 3.379128342276221,
            win_rate: 0.712022367194781,
            win_total: 2292,
            weight: 0.14784744381904602,
          },
          "156": {
            uid: 156,
            block: 2078893,
            average_loss: 3.3788943720293476,
            win_rate: 0.7508543025784405,
            win_total: 2417,
            weight: 0.3616751432418823,
          },
          "163": {
            uid: 163,
            block: 2080534,
            average_loss: 3.3929479659140647,
            win_rate: 0.16247281764523144,
            win_total: 523,
            weight: 2.148097877352484e-7,
          },
          "164": {
            uid: 164,
            block: 2080532,
            average_loss: 3.3923365769085585,
            win_rate: 0.19913016464740602,
            win_total: 641,
            weight: 5.585092708315642e-7,
          },
          "171": {
            uid: 171,
            block: 2080516,
            average_loss: 3.37910643139401,
            win_rate: 0.33426529978254116,
            win_total: 1076,
            weight: 1.1512384844536427e-5,
          },
          "46": {
            uid: 46,
            block: 2084700,
            average_loss: 3.3311036750003025,
            win_rate: 0.593973283628456,
            win_total: 1912,
            weight: 0.0012808565516024828,
          },
          "175": {
            uid: 175,
            block: 2084657,
            average_loss: 3.3311036750003025,
            win_rate: 0.7663870767319043,
            win_total: 2467,
            weight: 0.09432268142700195,
          },
          "51": {
            uid: 51,
            block: 2084692,
            average_loss: 3.3311036750003025,
            win_rate: 0.6284560422491458,
            win_total: 2023,
            weight: 0.0030260207131505013,
          },
          "181": {
            uid: 181,
            block: 2084684,
            average_loss: 3.3311036750003025,
            win_rate: 0.6629388008698354,
            win_total: 2134,
            weight: 0.00714939646422863,
          },
          "189": {
            uid: 189,
            block: 2080503,
            average_loss: 3.3792491216917298,
            win_rate: 0.4367816091954023,
            win_total: 1406,
            weight: 0.00015374712529592216,
          },
          "191": {
            uid: 191,
            block: 2084683,
            average_loss: 3.3311036750003025,
            win_rate: 0.697421559490525,
            win_total: 2245,
            weight: 0.01689246855676174,
          },
          "192": {
            uid: 192,
            block: 2080492,
            average_loss: 3.379154342788834,
            win_rate: 0.5439577508543025,
            win_total: 1751,
            weight: 0.0020772225689142942,
          },
          "193": {
            uid: 193,
            block: 2084671,
            average_loss: 3.3311036750003025,
            win_rate: 0.7319043181112147,
            win_total: 2356,
            weight: 0.03991558402776718,
          },
          "65": {
            uid: 65,
            block: 2084708,
            average_loss: 3.3311036750003025,
            win_rate: 0.5594905250077664,
            win_total: 1801,
            weight: 0.0005421962705440819,
          },
          "246": {
            uid: 246,
            block: 2086784,
            average_loss: 3.3817640167098864,
            win_rate: 0.11121466293880088,
            win_total: 358,
            weight: 6.488478732080694e-8,
          },
          "253": {
            uid: 253,
            block: 2083367,
            average_loss: 3.3311036750003025,
            win_rate: 0.8008698353525939,
            win_total: 2578,
            weight: 0.22290201485157013,
          },
        },
        best_average_loss: 3.3311036750003025,
      },
      {
        timestamp: 1704534213.7305086,
        pages: [661645075, 351867993, 499607004],
        uids: [
          132, 138, 139, 140, 141, 142, 143, 145, 146, 148, 149, 151, 153, 154, 155, 156, 163, 164, 171, 46, 175, 51,
          181, 189, 191, 192, 193, 65, 217, 246, 253,
        ],
        uid_data: {
          "132": {
            uid: 132,
            block: 2087190,
            average_loss: 3.4500467171434495,
            win_rate: 0.16038251366120218,
            win_total: 587,
            weight: 6.940052799109253e-8,
          },
          "138": {
            uid: 138,
            block: 2080564,
            average_loss: 3.4532445864599257,
            win_rate: 0.26366120218579236,
            win_total: 965,
            weight: 8.587895194978046e-7,
          },
          "139": {
            uid: 139,
            block: 2084750,
            average_loss: 3.431860190923097,
            win_rate: 0.4092896174863388,
            win_total: 1498,
            weight: 3.321433177916333e-5,
          },
          "140": {
            uid: 140,
            block: 2084741,
            average_loss: 3.4310369608832185,
            win_rate: 0.44153005464480877,
            win_total: 1616,
            weight: 8.5527150076814e-5,
          },
          "141": {
            uid: 141,
            block: 2084732,
            average_loss: 3.430587694293163,
            win_rate: 0.48743169398907105,
            win_total: 1784,
            weight: 0.00021267952979542315,
          },
          "142": {
            uid: 142,
            block: 2080512,
            average_loss: 3.4537315915842526,
            win_rate: 0.4054644808743169,
            win_total: 1484,
            weight: 2.8123387892264873e-5,
          },
          "143": {
            uid: 143,
            block: 2080503,
            average_loss: 3.4540534019470215,
            win_rate: 0.4546448087431694,
            win_total: 1664,
            weight: 0.00010117534839082509,
          },
          "145": {
            uid: 145,
            block: 2080495,
            average_loss: 3.4552625280911804,
            win_rate: 0.5300546448087432,
            win_total: 1940,
            weight: 0.0008200205629691482,
          },
          "146": {
            uid: 146,
            block: 2080503,
            average_loss: 3.452320128190713,
            win_rate: 0.4882513661202186,
            win_total: 1787,
            weight: 0.00024313076573889703,
          },
          "148": {
            uid: 148,
            block: 2080484,
            average_loss: 3.4541776453862423,
            win_rate: 0.5953551912568306,
            win_total: 2179,
            weight: 0.004939701873809099,
          },
          "149": {
            uid: 149,
            block: 2080475,
            average_loss: 3.4542856216430664,
            win_rate: 0.6278688524590164,
            win_total: 2298,
            weight: 0.010824081487953663,
          },
          "151": {
            uid: 151,
            block: 2080466,
            average_loss: 3.455024291257389,
            win_rate: 0.6647540983606557,
            win_total: 2433,
            weight: 0.025231795385479927,
          },
          "153": {
            uid: 153,
            block: 2080522,
            average_loss: 3.46762306377536,
            win_rate: 0.2751366120218579,
            win_total: 1007,
            weight: 1.2145861774115474e-6,
          },
          "154": {
            uid: 154,
            block: 2080458,
            average_loss: 3.455209526859346,
            win_rate: 0.6978142076502732,
            win_total: 2554,
            weight: 0.059809066355228424,
          },
          "155": {
            uid: 155,
            block: 2080449,
            average_loss: 3.453256968592034,
            win_rate: 0.7363387978142076,
            win_total: 2695,
            weight: 0.14882707595825195,
          },
          "156": {
            uid: 156,
            block: 2078893,
            average_loss: 3.4532445864599257,
            win_rate: 0.7666666666666667,
            win_total: 2806,
            weight: 0.35915544629096985,
          },
          "163": {
            uid: 163,
            block: 2080534,
            average_loss: 3.46719886240412,
            win_rate: 0.2087431693989071,
            win_total: 764,
            weight: 2.227987891956218e-7,
          },
          "164": {
            uid: 164,
            block: 2080532,
            average_loss: 3.466986361097117,
            win_rate: 0.24316939890710382,
            win_total: 890,
            weight: 5.723463800677564e-7,
          },
          "171": {
            uid: 171,
            block: 2080516,
            average_loss: 3.453454701626887,
            win_rate: 0.3663934426229508,
            win_total: 1341,
            weight: 1.1878359146066941e-5,
          },
          "46": {
            uid: 46,
            block: 2084700,
            average_loss: 3.4289442965241728,
            win_rate: 0.5508196721311476,
            win_total: 2016,
            weight: 0.0013053265865892172,
          },
          "175": {
            uid: 175,
            block: 2084657,
            average_loss: 3.4289442965241728,
            win_rate: 0.7174863387978142,
            win_total: 2626,
            weight: 0.09473027288913727,
          },
          "51": {
            uid: 51,
            block: 2084692,
            average_loss: 3.4289442965241728,
            win_rate: 0.5841530054644809,
            win_total: 2138,
            weight: 0.0030744457617402077,
          },
          "181": {
            uid: 181,
            block: 2084684,
            average_loss: 3.4289442965241728,
            win_rate: 0.6174863387978142,
            win_total: 2260,
            weight: 0.007242161780595779,
          },
          "189": {
            uid: 189,
            block: 2080503,
            average_loss: 3.453811696318329,
            win_rate: 0.460655737704918,
            win_total: 1686,
            weight: 0.00015438591071870178,
          },
          "191": {
            uid: 191,
            block: 2084683,
            average_loss: 3.4289442965241728,
            win_rate: 0.6508196721311476,
            win_total: 2382,
            weight: 0.017061732709407806,
          },
          "192": {
            uid: 192,
            block: 2080492,
            average_loss: 3.453548644409805,
            win_rate: 0.566120218579235,
            win_total: 2072,
            weight: 0.0020931416656821966,
          },
          "193": {
            uid: 193,
            block: 2084671,
            average_loss: 3.4289442965241728,
            win_rate: 0.6841530054644809,
            win_total: 2504,
            weight: 0.04020041599869728,
          },
          "65": {
            uid: 65,
            block: 2084708,
            average_loss: 3.4289442965241728,
            win_rate: 0.5174863387978142,
            win_total: 1894,
            weight: 0.0005542770377360284,
          },
          "217": {
            uid: 217,
            block: 2087945,
            average_loss: 3.422074052154041,
            win_rate: 0.4103825136612022,
            win_total: 1502,
            weight: 4.556708063319093e-6,
          },
          "246": {
            uid: 246,
            block: 2086784,
            average_loss: 3.455841021459611,
            win_rate: 0.16666666666666666,
            win_total: 610,
            weight: 6.868926760716931e-8,
          },
          "253": {
            uid: 253,
            block: 2083367,
            average_loss: 3.4289442965241728,
            win_rate: 0.7508196721311475,
            win_total: 2748,
            weight: 0.22325310111045837,
          },
        },
        best_average_loss: 3.422074052154041,
      },
    ],
  };
  return output;
}

export async function fetchLineChartData(fileName: string): Promise<HistoryData[]> {
  const downloadResult = await downloadData({ key: fileName }).result;
  // Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/download/#get-the-text-value-of-downloaded-file
  const text = await downloadResult.body.text(); // Using "downloadResult.body.json()" gives error "Parsing response to json is not implemented."
  const json = JSON.parse(text) as HistoryData[];
  return json;
}

export async function fetchMetagraphData(): Promise<{
  metadata: MetagraphMetadata;
  neuronData: NeuronDetails[];
}> {
  const downloadResult = await downloadData({ key: "metagraph.json" }).result;
  // Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/download/#get-the-text-value-of-downloaded-file
  const text = await downloadResult.body.text(); // Using "downloadResult.body.json()" gives error "Parsing response to json is not implemented."

  const json = JSON.parse(text) as {
    metadata: [MetagraphMetadata];
    neuronData: NeuronDetails[];
  };

  const [metadata] = json.metadata;

  return {
    metadata,
    neuronData: json.neuronData,
  };
}

export async function fetchSubnetVitals(): Promise<Vitals[]> {
  const rawResponse = await fetch(`${BaseURL}/vitals`);
  const vitals = (await rawResponse.json()) as Vitals[];
  return vitals;
}

export async function fetchValidators(): Promise<Validator[]> {
  const rawResponse = await fetch(`${BaseURL}/validators`);
  const validators = (await rawResponse.json()) as Validator[];
  return validators;
}

export async function fetchHeatmapData(): Promise<Record<string, number>[]> {
  const rawResponse = await fetch(`${BaseURL}/weights/0`);
  const output = (await rawResponse.json()) as Record<string, number>[];
  return output;
}

export async function fetchTaoPriceChangeStatistics(): Promise<TaoPriceChangeStatistics> {
  const rawResponse = await fetch(`${BaseURL}/tao/price-change-stats`);
  const output = (await rawResponse.json()) as TaoPriceChangeStatistics;
  return output;
}

export async function fetchTaoPrice(): Promise<TaoPrice> {
  const rawResponse = await fetch(`${BaseURL}/tao/price`);
  const output = (await rawResponse.json()) as TaoPrice;
  return output;
}

// eslint-disable-next-line import/no-unused-modules
export async function fetchTaoCandlestick(): Promise<Candlestick[]> {
  const rawResponse = await fetch(`${BaseURL}/tao/candlestick`);
  const output = (await rawResponse.json()) as Candlestick[];
  return output;
}
