import {
  categories,
  site,
  copy,
  presentationDetails,
  formatPrice,
  productMessage,
  whatsappUrl,
  type Variant,
} from "../data/site";
import { addToCart } from "./cart";
const cards = [...document.querySelectorAll<HTMLElement>("[data-product]")];
const search = document.querySelector<HTMLInputElement>("#search")!;
const chips = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-filter]"),
];
const more = document.querySelector<HTMLButtonElement>("#more")!;
let category = "all",
  limit = 10;
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
function filter() {
  const matches = cards.filter(
    (card) =>
      (category === "all" || card.dataset.category === category) &&
      normalize(card.dataset.name!).includes(normalize(search.value.trim())),
  );
  cards.forEach((card) => (card.hidden = true));
  matches.slice(0, limit).forEach((card) => (card.hidden = false));
  chips.forEach((chip) =>
    chip.setAttribute("aria-pressed", String(chip.dataset.filter === category)),
  );
  document.querySelector("#results")!.textContent =
    `${matches.length} ${matches.length === 1 ? "sabor por descubrir" : "sabores por descubrir"}`;
  document.querySelector("#shown")!.textContent =
    `${Math.min(limit, matches.length)} de ${matches.length} variedades`;
  document.querySelector<HTMLElement>("#empty")!.hidden = matches.length !== 0;
  more.hidden = matches.length <= limit;
  return matches;
}
chips.forEach((chip) =>
  chip.addEventListener("click", () => {
    category = chip.dataset.filter!;
    limit = 10;
    filter();
  }),
);
search.addEventListener("input", () => {
  limit = 10;
  filter();
});
more.addEventListener("click", () => {
  const first = limit;
  limit += 10;
  const matches = filter();
  matches[first]
    ?.querySelector<HTMLAnchorElement>("a")
    ?.focus({ preventScroll: true });
});
document.querySelector("#clear-filters")!.addEventListener("click", () => {
  category = "all";
  search.value = "";
  limit = 10;
  filter();
  search.focus();
});
document.querySelectorAll<HTMLElement>("[data-filter-link]").forEach((link) =>
  link.addEventListener("click", () => {
    category = link.dataset.filterLink!;
    search.value = "";
    limit = 10;
    filter();
  }),
);
document
  .querySelectorAll(".catalog .js-only")
  .forEach((el) => el.classList.remove("js-only"));
filter();
const dialog = document.querySelector<HTMLDialogElement>("#product-dialog")!;
const select = document.querySelector<HTMLSelectElement>("#presentation")!;
const whatsapp = document.querySelector<HTMLAnchorElement>("#dialog-whatsapp")!;
let active: HTMLElement,
  variants: Variant[] = [];
function updateVariant() {
  const variant = variants[Number(select.value)];
  const details = presentationDetails(variant);
  document.querySelector("#selected-presentation")!.textContent = details.presentation;
  document.querySelector("#selected-capacity")!.textContent = details.capacity;
  document.querySelector("#selected-quantity")!.textContent = details.quantity;
  const hasPrice = site.showPrices && variant.price !== undefined;
  const price = document.querySelector<HTMLElement>("#dialog-price")!;
  price.hidden = !hasPrice;
  price.textContent = hasPrice ? `${formatPrice(variant.price!)} por ${details.presentation.toLowerCase()}` : "";
  document.querySelector("#dialog-note")!.textContent =
    !hasPrice
      ? copy.ui.consultaElPrecioYLaDisponibilidad
      : "Consulta la disponibilidad por WhatsApp.";
  whatsapp.href = whatsappUrl(productMessage(active.dataset.name!, variant));
  whatsapp.setAttribute(
    "aria-label",
    `${copy.ui.consultarSoloEste}: ${active.dataset.name}, ${details.label}, por WhatsApp`,
  );
}
select.addEventListener("change", updateVariant);
let qty = 1;
const qtyValue = document.querySelector<HTMLOutputElement>("#qty-value")!;
const setQty = (n: number) => {
  qty = Math.min(99, Math.max(1, n));
  qtyValue.textContent = String(qty);
};
document.querySelector("#qty-minus")!.addEventListener("click", () => setQty(qty - 1));
document.querySelector("#qty-plus")!.addEventListener("click", () => setQty(qty + 1));
document.querySelector("#dialog-add")!.addEventListener("click", () => {
  addToCart(active.dataset.id!, variants[Number(select.value)], qty);
  dialog.close();
});
cards.forEach((card) =>
  card.querySelector("a")!.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    active = card;
    variants = JSON.parse(card.dataset.variants!);
    document.querySelector("#dialog-title")!.textContent = card.dataset.name!;
    document.querySelector("#dialog-category")!.textContent =
      categories[card.dataset.category as keyof typeof categories].label;
    document.querySelector("#dialog-phrase")!.textContent =
      card.dataset.phrase!;
    document
      .querySelector("#dialog-image")!
      .replaceChildren(
        card
          .querySelector<HTMLTemplateElement>("template")!
          .content.cloneNode(true),
      );
    select.replaceChildren(
      ...variants.map((v, i) => {
        const option = new Option(presentationDetails(v).label, String(i));
        if (site.showPrices && v.price !== undefined) option.dataset.meta = formatPrice(v.price);
        return option;
      }),
    );
    // Abre en la primera presentación con precio (si hay alguna).
    select.value = String(Math.max(0, variants.findIndex((v) => v.price !== undefined)));
    select.dispatchEvent(new Event("ui-select:sync"));
    setQty(1);
    updateVariant();
    dialog.showModal();
    document.documentElement.classList.add("dialog-open");
  }),
);
dialog.querySelector("button")!.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () => {
  document.documentElement.classList.remove("dialog-open");
  active?.querySelector("a")?.focus({ preventScroll: true });
});
