# Interactive World Map

An Angular application that turns a static SVG world map into an interactive data explorer. Hover any country to highlight it and pull live development data from the World Bank Open Data API.

**Built with Angular 19 (standalone components) + TypeScript**

---

## Overview

Global development data is usually buried in tables and spreadsheets. This project makes it explorable: hover any country on the world map and the right-hand panel populates with that country's capital, region, income level, ISO code, and most recent population figure, fetched live from the World Bank Open Data API.

The map itself is a single SVG asset loaded at runtime. Each country `<path>` carries an ISO-2 country code as its `id`, which is used as the lookup key for the API call.

## Features

- Hover-to-explore interaction across every country on the map
- Live data fetched from the [World Bank Open Data API](https://data.worldbank.org/)
- Per-country panel showing name, capital, region, income level, ISO-3 code, and latest total population
- Visual highlight on the active country
- Two-column responsive layout (map left, data panel right)
- Angular routing with a default redirect to `/worldmap`

## Tech Stack

| Layer        | Tool                                         |
|--------------|----------------------------------------------|
| Framework    | Angular 19 (standalone components)           |
| Language     | TypeScript 5.6                               |
| HTTP         | Angular `HttpClient` + RxJS `Observable`     |
| Map          | Raw SVG injected into the DOM (no map lib)   |
| Data         | World Bank Open Data API                     |
| Testing      | Jasmine + Karma                              |
| Build        | Angular CLI                                  |

No external mapping libraries (D3, Leaflet, etc.) are used. The map is a single SVG file where each country path has an ISO-2 `id` attribute that doubles as the API lookup key.

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm

### Installation
```bash
git clone https://github.com/psycodelicfox/interactive-world-map.git
cd interactive-world-map/world-map-app
npm install
npm start
```

The app runs at `http://localhost:4200` and redirects automatically to `/worldmap`.

### Build for production
```bash
npm run build
```

### Run tests
```bash
npm test
```

## Project Structure

```
world-map-app/
├── src/
│   ├── app/
│   │   ├── worldmap/         # Map component: loads SVG, binds hover events
│   │   ├── countryinfo/      # Display panel for the selected country
│   │   ├── country.service.ts  # World Bank API client
│   │   ├── app.routes.ts     # Routing config
│   │   └── app.component.ts  # Root shell
│   ├── assets/
│   │   └── World-Map.svg     # SVG with one path per country, ISO-2 ids
│   └── index.html
├── angular.json
└── package.json
```

## How It Works

1. **SVG injection.** On init, `WorldmapComponent` fetches the SVG as text via `HttpClient` and injects it into a container `div`, which exposes all country `<path>` elements to the DOM.
2. **Event binding.** Each path gets a `mouseenter` listener. On hover, all paths are reset to default fill, the active path is highlighted green (`#45cf83`), and its `id` attribute (the ISO-2 country code) is captured.
3. **API lookup.** `CountryService` makes two parallel calls to the World Bank API: one for country metadata (name, capital, region, income level) and one for the most recent population indicator (`SP.POP.TOTL`).
4. **Display.** Results are pushed into bound properties and rendered via Angular `@Input()` bindings in `CountryinfoComponent`.

## API Endpoints Used

- `GET /v2/country/{code}?format=json` - country metadata
- `GET /v2/country/{code}/indicator/SP.POP.TOTL?format=json` - total population time series

Both endpoints are public and require no authentication.

## Known Limitations and Planned Improvements

Being honest about what this project does and does not do:

- **No real test coverage yet.** Only the default Angular spec stubs exist. Adding unit tests around `CountryService` (mocking `HttpClient`, asserting on the parsed response shape) is the next priority.
- **API responses are typed as `any`.** Replacing this with proper TypeScript interfaces for the World Bank response shapes would catch bugs at compile time.
- **Hover-based UX is forgiving but imprecise.** Switching from `mouseenter` to `click` would make interaction more intentional and avoid noisy API calls when sweeping the mouse.
- **No request caching.** Each hover triggers two HTTP calls; an in-memory cache keyed by ISO-2 would eliminate redundant fetches.
- **HTTPS for API calls.** The World Bank endpoints should be called over HTTPS to avoid mixed-content blocking when the app itself is served over HTTPS.

## License

MIT