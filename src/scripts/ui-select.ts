/**
 * Select personalizado y accesible. Mejora cualquier `<select data-ui-select>`:
 * el <select> nativo se conserva (oculto) como fuente de verdad, así que
 * `select.value`, el evento `change` y los formularios siguen funcionando igual.
 *
 * - Las opciones pueden cambiar en cualquier momento (se detecta solo).
 * - Si cambias `select.value` por código, avisa con `select.dispatchEvent(new Event("ui-select:sync"))`.
 * - `option.dataset.meta` muestra un texto secundario a la derecha (p. ej. un precio).
 */
const CHECK =
  '<svg class="ui-select__check" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m4.5 10.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEVRON =
  '<svg class="ui-select__chevron" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

let uid = 0;

export function enhanceSelect(select: HTMLSelectElement) {
  if (select.dataset.uiReady) return;
  select.dataset.uiReady = "true";
  const id = `ui-select-${++uid}`;
  const root = select.closest<HTMLElement>(".ui-select") ?? select.parentElement!;
  root.classList.add("ui-select", "is-enhanced");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "ui-select__trigger";
  trigger.setAttribute("role", "combobox");
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", `${id}-list`);
  const labelled = select.labels?.[0];
  if (labelled) {
    labelled.id ||= `${id}-label`;
    trigger.setAttribute("aria-labelledby", labelled.id);
  }
  const described = select.getAttribute("aria-describedby");
  if (described) trigger.setAttribute("aria-describedby", described);

  const value = document.createElement("span");
  value.className = "ui-select__value";
  trigger.append(value);
  trigger.insertAdjacentHTML("beforeend", CHEVRON);

  const list = document.createElement("ul");
  list.className = "ui-select__list";
  list.id = `${id}-list`;
  list.setAttribute("role", "listbox");
  list.hidden = true;
  list.tabIndex = -1;

  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");
  root.append(trigger, list);
  labelled?.addEventListener("click", (e) => {
    e.preventDefault();
    trigger.focus();
  });

  let items: HTMLLIElement[] = [];
  let active = -1;
  let typed = "";
  let typedTimer: number | undefined;

  const render = () => {
    items = [...select.options].map((option, i) => {
      const li = document.createElement("li");
      li.className = "ui-select__option";
      li.id = `${id}-opt-${i}`;
      li.setAttribute("role", "option");
      li.dataset.index = String(i);
      li.setAttribute("aria-disabled", String(option.disabled));
      const text = document.createElement("span");
      text.className = "ui-select__text";
      text.textContent = option.text;
      li.append(text);
      if (option.dataset.meta) {
        const meta = document.createElement("span");
        meta.className = "ui-select__meta";
        meta.textContent = option.dataset.meta;
        li.append(meta);
      }
      li.insertAdjacentHTML("beforeend", CHECK);
      return li;
    });
    list.replaceChildren(...items);
    sync();
  };
  const sync = () => {
    const selected = select.selectedIndex;
    const option = select.options[selected];
    value.textContent = option?.text ?? select.dataset.placeholder ?? "";
    value.classList.toggle("is-placeholder", !option);
    items.forEach((li, i) => li.setAttribute("aria-selected", String(i === selected)));
    trigger.disabled = select.disabled || items.length === 0;
  };
  const setActive = (i: number) => {
    if (!items.length) return;
    active = (i + items.length) % items.length;
    items.forEach((li, n) => li.classList.toggle("is-active", n === active));
    trigger.setAttribute("aria-activedescendant", items[active].id);
    items[active].scrollIntoView({ block: "nearest" });
  };
  const isOpen = () => !list.hidden;
  const open = () => {
    if (trigger.disabled || isOpen()) return;
    list.hidden = false;
    root.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    setActive(Math.max(select.selectedIndex, 0));
  };
  const close = (refocus = false) => {
    if (!isOpen()) return;
    list.hidden = true;
    root.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    trigger.removeAttribute("aria-activedescendant");
    if (refocus) trigger.focus();
  };
  const choose = (i: number) => {
    if (select.options[i]?.disabled) return;
    const changed = select.selectedIndex !== i;
    select.selectedIndex = i;
    sync();
    close(true);
    if (changed) select.dispatchEvent(new Event("change", { bubbles: true }));
  };

  trigger.addEventListener("click", () => (isOpen() ? close() : open()));
  list.addEventListener("pointerdown", (e) => e.preventDefault()); // no pierde el foco
  list.addEventListener("click", (e) => {
    const li = (e.target as HTMLElement).closest<HTMLLIElement>("li");
    if (li) choose(Number(li.dataset.index));
  });
  list.addEventListener("pointermove", (e) => {
    const li = (e.target as HTMLElement).closest<HTMLLIElement>("li");
    if (li && Number(li.dataset.index) !== active) setActive(Number(li.dataset.index));
  });
  trigger.addEventListener("keydown", (e) => {
    const k = e.key;
    if (!isOpen()) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(k)) {
        e.preventDefault();
        open();
      }
      return;
    }
    if (k === "ArrowDown") (e.preventDefault(), setActive(active + 1));
    else if (k === "ArrowUp") (e.preventDefault(), setActive(active - 1));
    else if (k === "Home") (e.preventDefault(), setActive(0));
    else if (k === "End") (e.preventDefault(), setActive(items.length - 1));
    else if (k === "Enter" || k === " ") (e.preventDefault(), choose(active));
    else if (k === "Escape") (e.preventDefault(), e.stopPropagation(), close(true));
    else if (k === "Tab") close();
    else if (k.length === 1 && !e.ctrlKey && !e.metaKey) {
      typed += k.toLowerCase();
      clearTimeout(typedTimer);
      typedTimer = window.setTimeout(() => (typed = ""), 600);
      const hit = [...select.options].findIndex((o) => o.text.toLowerCase().startsWith(typed));
      if (hit >= 0) setActive(hit);
    }
  });
  document.addEventListener("pointerdown", (e) => {
    if (isOpen() && !root.contains(e.target as Node)) close();
  });
  trigger.addEventListener("blur", () => close());

  select.addEventListener("ui-select:sync", sync);
  select.addEventListener("change", sync);
  new MutationObserver(render).observe(select, { childList: true });
  render();
}

export const enhanceAllSelects = (scope: ParentNode = document) =>
  scope.querySelectorAll<HTMLSelectElement>("select[data-ui-select]").forEach(enhanceSelect);
enhanceAllSelects();
