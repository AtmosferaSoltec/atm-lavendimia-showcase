import {
  formatPrice,
  orderMessage,
  orderTotal,
  presentationDetails,
  whatsappUrl,
  type OrderLine,
  type Variant,
} from "../data/site";

type Stored = { id: string; key: string; qty: number };
const STORAGE_KEY = "lavendimia-pedido-v1";
const MAX_QTY = 99;
const variantKey = (v: Variant) => `${v.presentation}|${v.capacity ?? ""}`;

// Catálogo leído del DOM: el carrito solo guarda id + presentación + cantidad.
const catalog = new Map<string, { name: string; thumb: string; variants: Variant[] }>();
document.querySelectorAll<HTMLElement>("[data-product]").forEach((card) =>
  catalog.set(card.dataset.id!, {
    name: card.dataset.name!,
    thumb: card.dataset.thumb ?? "",
    variants: JSON.parse(card.dataset.variants!),
  }),
);

let items: Stored[] = [];
try {
  const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  if (Array.isArray(raw)) items = raw;
} catch {}
const save = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
};
// Descarta líneas de productos o presentaciones que ya no existen.
const resolve = () =>
  items.flatMap((item) => {
    const product = catalog.get(item.id);
    const variant = product?.variants.find((v) => variantKey(v) === item.key);
    return product && variant
      ? [{ item, line: { name: product.name, variant, qty: item.qty } as OrderLine }]
      : [];
  });

const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const toggle = $<HTMLButtonElement>(".cart-toggle");
const badge = $<HTMLElement>(".cart-count");
const dialog = $<HTMLDialogElement>("#cart-dialog");
const list = $<HTMLUListElement>("#cart-lines");
const empty = $<HTMLElement>("#cart-empty");
const foot = $<HTMLElement>("#cart-foot");
const totalBox = $<HTMLElement>("#cart-total");
const send = $<HTMLAnchorElement>("#cart-send");
const toast = $<HTMLElement>("#cart-toast");
let toastTimer: number | undefined;

function stepper(label: string, glyph: string, onClick: () => void) {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = glyph;
  b.setAttribute("aria-label", label);
  b.addEventListener("click", onClick);
  return b;
}

function render() {
  const rows = resolve();
  items = rows.map((r) => r.item);
  const count = rows.reduce((n, r) => n + r.item.qty, 0);
  badge.hidden = count === 0;
  badge.textContent = String(count);
  toggle.setAttribute(
    "aria-label",
    count ? `Ver mi pedido, ${count} ${count === 1 ? "unidad" : "unidades"}` : "Ver mi pedido",
  );
  empty.hidden = rows.length > 0;
  foot.hidden = rows.length === 0;
  list.replaceChildren(
    ...rows.map(({ item, line }) => {
      const li = document.createElement("li");
      const thumbSrc = catalog.get(item.id)?.thumb;
      if (thumbSrc) {
        const img = document.createElement("img");
        img.className = "cart-thumb";
        img.src = thumbSrc;
        img.alt = "";
        img.width = 64;
        img.height = 96;
        img.loading = "lazy";
        li.append(img);
      }
      const info = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = line.name;
      const detail = document.createElement("span");
      detail.textContent = presentationDetails(line.variant).label;
      info.append(name, detail);
      if (line.variant.price !== undefined) {
        const price = document.createElement("span");
        price.className = "cart-line-price";
        price.textContent = formatPrice(line.variant.price * item.qty);
        info.append(price);
      }
      const qty = document.createElement("div");
      qty.className = "qty";
      const value = document.createElement("output");
      value.textContent = String(item.qty);
      qty.append(
        stepper(`Quitar una unidad de ${line.name}`, "−", () => change(item, item.qty - 1)),
        value,
        stepper(`Añadir una unidad de ${line.name}`, "+", () => change(item, item.qty + 1)),
      );
      const remove = stepper(`Eliminar ${line.name}`, "×", () => change(item, 0));
      remove.className = "cart-remove";
      li.append(info, qty, remove);
      li.classList.toggle("has-thumb", Boolean(thumbSrc));
      return li;
    }),
  );
  const lines = rows.map((r) => r.line);
  const total = orderTotal(lines);
  totalBox.hidden = total === null;
  if (total !== null) totalBox.querySelector("strong")!.textContent = formatPrice(total);
  if (lines.length) send.href = whatsappUrl(orderMessage(lines));
}

function change(item: Stored, qty: number) {
  if (qty < 1) items = items.filter((i) => i !== item);
  else item.qty = Math.min(qty, MAX_QTY);
  save();
  render();
}

function announce(text: string) {
  toast.querySelector("span")!.textContent = text;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (toast.hidden = true), 4500);
}

export function addToCart(id: string, variant: Variant, qty: number) {
  const key = variantKey(variant);
  const found = items.find((i) => i.id === id && i.key === key);
  if (found) found.qty = Math.min(found.qty + qty, MAX_QTY);
  else items.push({ id, key, qty });
  save();
  render();
  announce(`Añadido al pedido: ${qty} × ${catalog.get(id)?.name ?? ""}`);
}

function open() {
  toast.hidden = true;
  render();
  dialog.showModal();
  document.documentElement.classList.add("dialog-open");
}
toggle.classList.remove("js-only");
toggle.addEventListener("click", open);
toast.querySelector("button")!.addEventListener("click", open);
dialog.querySelector(".cart-close")!.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
      dialog.close();
  }
});
dialog.addEventListener("close", () =>
  document.documentElement.classList.remove("dialog-open"),
);
$("#cart-clear").addEventListener("click", () => {
  items = [];
  save();
  render();
});
// Sincroniza varias pestañas abiertas.
addEventListener("storage", (e) => {
  if (e.key !== STORAGE_KEY) return;
  try {
    items = JSON.parse(e.newValue ?? "[]");
  } catch {
    items = [];
  }
  render();
});
render();
