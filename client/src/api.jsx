
export async function fetchLocations() {
  const res = await fetch('/api/get_address_names');
  const data = await res.json();
  return data.address;
}

export async function predictPrice({ address, beds, bath, area }) {
  const res = await fetch("/api/predict_rent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address, beds, bath, area }),
  });
  const data = await res.json();
  return data.estimated_price;
}

