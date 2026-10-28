const button = document.querySelector<HTMLButtonElement>(".menu-toggle")!;
const nav = document.querySelector<HTMLElement>("#navigation")!;
button.classList.remove("js-only");
function close() {
  button.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
}
button.addEventListener("click", () => {
  const open = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
});
nav.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).closest("a")) close();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    close();
    button.focus();
  }
});
document.documentElement.classList.add("menu-ready");
