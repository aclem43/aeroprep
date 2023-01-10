export interface Metar {
  barometer: {
    hg: number
    hpa: number
    kpa: number
    mb: number
  }
  clouds: [
    {
      code: string
      text: string
    }
  ]
  dewpoint: {
    celsius: number
    fahrenheit: number
  }
  elevation: {
    feet: number
    meters: number
  }
  flight_category: string
  humidity: {
    percent: number
  }
  icao: string
  observed: string
  raw_text: string
  station: Station
  temperature: {
    celsius: number
    fahrenheit: number
  }
  visibility: Visibility
  wind: Wind
}

export interface Taf {
  forecast: Forecast[]
  icao: string
  raw_text: string
  station: Station
  timestamp: {
    bulletin: string
    from: string
    issued: string
    to: string
  }
}

export interface Weather {
  station: Station | null
  metar: Metar | null
  taf: Taf | null
}

interface Station {
  geometry: {
    coordinates: number[]
    type: string
  }
  icao: string
  location: string
  name: string
  type: string
}

interface Wind {
  degrees: number
  speed_kph: number
  speed_kts: number
  speed_mph: number
  speed_mps: number
}

interface Visibility {
  meters: string
  meters_float: number
  miles: string
  miles_float: number
}

interface Forecast {
  clouds: {
    base_feet_agl: number
    base_meters_agl: number
    code: string
    feet: number
    meters: number
    text: string
  }[]
  timestamp: {
    from: string
    to: string
  }
  visibility: Visibility
  wind: Wind
}

export interface ResponseMetar {
  results: 1
  data: Metar[]
}

export interface ResponseTaf {
  results: 1
  data: Taf[]
}
