export function renderDayCard(forecast, container) {
    const day = document.createElement("div");
    day.classList = "singleDay";

    const title = document.createElement("h4");
    const [y, m, d] = forecast.date.split("-").map(Number);
    const weekday = new Date(y, m - 1, d).toLocaleDateString("hr", { weekday: "long" }).toUpperCase();
    title.innerText = weekday;

    const icon = document.createElement("img");
    icon.setAttribute("src", forecast.day.condition.icon);

    const maxT = document.createElement("p");
    maxT.innerText = Math.round(forecast.day.maxtemp_c) + "°";

    const minT = document.createElement("p");
    minT.innerText = Math.round(forecast.day.mintemp_c) + "°";

    day.append(title, icon, maxT, minT);
    container.append(day);
    return day;
}

export function renderHourlyTable(hours, container) {
    const table = document.createElement("table");
    table.innerHTML = `
    <thead>
      <tr class="hourlyForecast header">
        <th>Sati</th><th>Prognoza</th><th>Temp</th><th>Vjetar</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
    container.append(table);
    const tbody = table.querySelector("tbody");

    for (const h of hours) {
        const row = document.createElement("tr");
        row.className = "hourlyForecast";

        const time = document.createElement("td");
        time.innerText = h.time.split(" ")[1].split(":")[0];

        const cond = document.createElement("td");
        const icon = document.createElement("img");
        icon.setAttribute("src", h.condition.icon);
        icon.setAttribute("alt", h.condition.text || "");
        cond.appendChild(icon);

        const temp = document.createElement("td");
        temp.innerText = Math.round(h.temp_c) + "°";

        const wind = document.createElement("td");
        wind.innerText = h.wind_kph + " km/h";

        row.append(time, cond, temp, wind);
        tbody.append(row);
    }
}
