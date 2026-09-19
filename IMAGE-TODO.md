# Image TODOs

These photo ids could not be fetched automatically. The app renders a
tasteful gradient placeholder for them — nothing is broken — but they
should be replaced with a real photo.

| Photo id | Article | Reason |
| --- | --- | --- |
| `black-forest-hero` | Black Forest | download HTTP 429 |
| `black-forest-3` | Triberg Waterfalls | download HTTP 429 |
| `heidelberg-hero` | Heidelberg Castle | download HTTP 429 |
| `heidelberg-2` | Heidelberg | download HTTP 429 |
| `heidelberg-3` | Karl Theodor Bridge | no lead image on the article |
| `lake-constance-hero` | Lake Constance | download HTTP 429 |
| `lake-constance-2` | Mainau | download HTTP 429 |
| `rhine-valley-hero` | Rhine Gorge | download HTTP 429 |
| `rhine-valley-2` | Lorelei | download HTTP 429 |
| `rhine-valley-3` | Pfalzgrafenstein Castle | download HTTP 429 |
| `moselle-2` | Bernkastel-Kues | download HTTP 429 |
| `moselle-3` | Eltz Castle | download HTTP 429 |
| `cologne-hero` | Cologne Cathedral | download HTTP 429 |
| `cologne-2` | Hohenzollern Bridge | download HTTP 429 |
| `cologne-3` | Cologne | download HTTP 429 |
| `berlin-2` | Museum Island | download HTTP 429 |
| `berlin-3` | Berlin | download HTTP 429 |
| `dresden-hero` | Dresden Frauenkirche | download HTTP 429 |
| `dresden-2` | Zwinger | download HTTP 429 |
| `dresden-3` | Dresden | download HTTP 429 |
| `saxon-switzerland-hero` | Bastei | download HTTP 429 |
| `saxon-switzerland-2` | Saxon Switzerland | download HTTP 429 |
| `hamburg-hero` | Speicherstadt | download HTTP 429 |
| `hamburg-2` | Elbphilharmonie | download HTTP 429 |
| `hamburg-3` | Hamburg | download HTTP 429 |
| `ruegen-hero` | Jasmund National Park | download HTTP 429 |
| `ruegen-2` | Rügen | download HTTP 429 |
| `ruegen-3` | Binz | download HTTP 429 |
| `harz-2` | Quedlinburg | download HTTP 429 |
| `harz-3` | Goslar | download HTTP 429 |

Fix by pointing the id at a different article in `scripts/photo-sources.mjs`
and re-running `npm run images`.
