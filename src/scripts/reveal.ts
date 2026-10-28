const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const reveal = document.querySelectorAll<HTMLElement>(".reveal");
const hero = document.querySelector("#inicio")!;
const contact = document.querySelector("#contacto")!;
const fab = document.querySelector<HTMLElement>(".whatsapp-fab")!;
let pastHero = false,
  nearContact = false;
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.target === hero)
        pastHero = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
      else if (entry.target === contact)
        nearContact = entry.isIntersecting || entry.boundingClientRect.top < 0;
      else if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
    fab.hidden = !pastHero || nearContact;
  },
  { threshold: 0, rootMargin: "0px 0px 80px 0px" },
);
reveal.forEach((el) => {
  if (!reduced.matches && el.getBoundingClientRect().top > innerHeight) {
    el.classList.add("reveal-ready");
    observer.observe(el);
  }
});
observer.observe(hero);
observer.observe(contact);
reduced.addEventListener("change", () => {
  if (reduced.matches) reveal.forEach((el) => el.classList.add("is-visible"));
});
