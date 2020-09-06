export function getToken() {
  return localStorage.getItem("auth-token");
}

export function setToken(token) {
  localStorage.setItem("auth-token", token);
  return "ok";
}

export function mapLabelPriorityCard(priority) {
  let label = "",
    colorLabel = "";

  switch (priority) {
    case "low":
      label = "Low";
      colorLabel = "default";
      break;
    case "medium":
      label = "Medium";
      colorLabel = "info";
      break;
    case "high":
      label = "High";
      colorLabel = "danger";
      break;
    default:
        label = "No priority";
        colorLabel = "default";
  }
  return { label, colorLabel };
}
