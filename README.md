# AeroPrep

An app designed to assist pilots to preflight more effeciently and accurately. It also inlcudes features to record the flight

**WARNING** The app is not designed to be used if flight, rather just left to record data out of sight

## Contents

1. [Technology Used](#technology-used)
2. [Features](#features)

## Technology Used

The app uses Java Script with the following libraries/frameworks

- CapacitorJs - [Capacitor Docs](https://capacitorjs.com/docs/getting-started)
- VueJs - [Vue](https://vuejs.org/)
- VueRouter
- Vuetify 3 - [Vuetify 3 Docs](https://next.vuetifyjs.com/en/components/grids/)
- VueLeaflet - [Vue Leaflet Github](https://github.com/vue-leaflet/vue-leaflet)

## Features

### Current Features

#### As of version 0.3.0

Flight Preperation Page

- Check list
  - Very basic more features planned
- Note Taking Tab
  - Basic Markdown
- Fuel Caclulation Page
- Weather Page
  - Taf and Metar for major airports
- Risk Assesment
  - Currently only visual but more features are planned

Inflight Page

- Flight recording with basic optimization algorithm
- Flight record loading to view the flight path recorded

### Planned Features

Flight Preperation Page

- Weight and Balance page
- Finish Risk assesment
- Further work on checklist

Inflight Page

- Add acceleromater triggered events to record more data points in turns
- Tapping a point on the line shows the data (Speed,altitude,heading) for the nearest point
- Different coloured parts of the line for climbing decending and cruise
