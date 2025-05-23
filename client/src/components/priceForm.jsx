import { useEffect, useState } from "react";
import { fetchLocations, predictPrice } from "../api";

function PriceForm() {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    area: 1000,
    beds: 2,
    bath: 2,
    address: "",
  });
  const [price, setPrice] = useState(null);

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEstimate = async () => {
    const estimated = await predictPrice(form);
    setPrice(estimated);
  };
  
    
  return (
    <form className="form">
      <h2>Area (Square Feet)</h2>
      <input
        type="text"
        name="area"
        value={form.area}
        onChange={handleChange}
        className="area"
      />

      <h2>Beds</h2>
      <div className="switch-field">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num}>
            <input
              type="radio"
              id={`bed-${num}`}
              name="beds"
              value={num}
              checked={parseInt(form.beds) === num}
              onChange={handleChange}
            />
            <label htmlFor={`bed-${num}`}>{num}</label>
          </div>
        ))}
      </div>

      <h2>Bath</h2>
      <div className="switch-field">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num}>
            <input
              type="radio"
              id={`bath-${num}`}
              name="bath"
              value={num}
              checked={parseInt(form.bath) === num}
              onChange={handleChange}
            />
            <label htmlFor={`bath-${num}`}>{num}</label>
          </div>
        ))}
      </div>

      <h2>Location</h2>
      <select
        name="address"
        value={form.address}
        onChange={handleChange}
        className="location"
      >
        <option value="" disabled>
          Choose a Location
        </option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <button type="button" className="submit" onClick={handleEstimate}>
        Estimate Price
      </button>

      {price !== null && (
        <div id="uiEstimatedPrice" className="result">
          <h2>{price}৳</h2>
        </div>
      )}
    </form>
  );
}

export default PriceForm;
