export async function fetchFlightData() {
    const response = await fetch("https://api.example.com/flights");
    const data = await response.json();
    return data;
  }