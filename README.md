# Textile Calculator

Five small calculators for common textile-engineering quantities:
GSM, denier ↔ tex, thread count, fabric cost, and Ne ↔ Nm yarn
count. Each section states the formula it uses, so the output can
be checked by hand.

**Live:** https://reyrove.github.io/textile-calculator

---

## What it computes

| Section | Inputs | Formula | Output |
|---------|--------|---------|--------|
| **GSM** | Fabric weight (g), fabric area (m²) | `GSM = weight / area` | g/m² |
| **Denier ↔ Tex** | Value, direction | `denier = 9 × tex` · `tex = denier ÷ 9` | converted value |
| **Thread count** | Warp density, weft density (threads/inch) | `thread count = warp + weft` | threads/inch |
| **Fabric cost** | GSM, area, cost per gram | `total cost = GSM × area × cost per gram` | dollars |
| **Yarn count** | Value, direction | `Nm = Ne × 1.693` · `Ne = Nm ÷ 1.693` | converted count |

Each formula is stated on the page, under the section heading,
so a user can verify the result against the standard textile
relation without opening the source.

---

## Why the formulas are shown

A calculator that hides its formula is a black box. A calculator
that states its formula is an **instrument** — the user can check
it, disagree with it, or extend it. This is the same principle
that makes the [Yarn Twist Visualizer](https://reyrove.github.io/yarn-twist-visualizer)
legible as research: the assumptions are visible.

The formulas here are the standard textbook relations for each
quantity. They are stated in code as comments, on the page under
each heading, and in this README, so the three cannot drift apart.

---

## Features

- Five independent calculators, each with its own form
- Formula stated under every section heading
- Per-section submit — pressing Enter only triggers the section
  you're in
- Inline validation with clear error messages
- **Copy-to-clipboard** on every result
- Numeric inputs with proper `<label>` elements and units
- Results announced to screen readers (`role="status"`)
- Dark editorial design matching the rest of the Reyrove tools
- Responsive layout

---

## Technologies

HTML5 · CSS3 · JavaScript

No framework, no build step, no dependencies.

---

## File structure

```
textile-calculator/
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
└── .gitignore
```

---

## Usage

1. Open `index.html` in any modern browser.
2. Fill in the fields for the calculator you need.
3. Press **Calculate** or **Convert**, or press **Enter** inside
   that section's form.
4. The result appears below the button, with a **copy** button
   beside it.

Each section is independent — you can use one, or all five, in any
order.

---

## Formulas used

### GSM

```
GSM = fabric weight (g) ÷ fabric area (m²)
```

Grams per square metre. The most common areal density measure in
fabric specification.

### Denier ↔ Tex

```
denier = 9 × tex
tex    = denier ÷ 9
```

Both measure linear density. **Tex** is grams per 1000 m;
**denier** is grams per 9000 m. The factor 9 comes directly from
the ratio 9000/1000.

### Thread count

```
thread count = warp density + weft density
```

Both densities are in threads per inch. The result is the total
number of threads per inch in the fabric.

### Fabric cost

```
total cost = GSM × area × cost per gram
```

Multiplies areal density by area to get total mass, then by cost
per gram to get total cost. The intermediate mass (in grams) is
`GSM × area`.

### Yarn count (Ne ↔ Nm)

```
Nm = Ne × 1.693
Ne = Nm ÷ 1.693
```

**Ne** is the English cotton count (number of 840-yard hanks per
pound). **Nm** is the metric count (number of 1000-metre hanks per
kilogram). The conversion factor 1.693 comes from the ratio of the
two hank lengths, adjusted for the pound/kilogram conversion:

```
1.693 ≈ (840 yards × 0.9144 m/yard) / 1000 m × (1000 g / 453.592 g)
```

The factor is approximate at four significant figures. For
precision work, the exact ratio should be recomputed from the
definitions rather than taken as 1.693.

---

## Design notes

**Per-section forms.** The original version fired all five
calculations on every Enter press, which produced five error
messages whenever a user was only filling in one section. Each
section is now its own `<form>`, so Enter only triggers the
section the user is in.

**Pure functions.** Each calculation is a small pure function
(`calcGSM`, `calcDenierTex`, `calcThreadCount`, `calcCost`,
`calcYarnCount`) separated from the DOM handler. The handlers are
thin wrappers that read inputs, call the function, and write the
result. This makes the calculations testable in isolation, and it
makes the formula visible in the code structure.

**Copy to clipboard.** Every result has a copy button, using the
Clipboard API. The button label changes to "copied" for 1.2 s to
confirm the action. This is a small thing, but it is the
difference between a calculator you look at and a calculator you
*use*.

**Units in labels, not placeholders.** Every input has a proper
`<label>` that includes the unit: "Fabric weight (g)", "Fabric
area (m²)", and so on. Placeholders disappear on focus; labels do
not.

**Accessibility.** Every result region is marked
`role="status" aria-live="polite"`, so screen readers announce
each new result. Every input has an associated `<label for>`. All
buttons have visible focus states.

---

## Browser support

Chrome · Firefox · Safari · Edge

The Clipboard API used for the copy buttons requires a secure
context (HTTPS or localhost). On `file://` URLs the copy button
will fall back to the "failed" state; the results themselves are
still readable and selectable.

---

## License

MIT — see `LICENSE`.

---

## Author

Reyhaneh Daneshdoost (Reyrove)

*Part of the TOOLS collection at
[reyrove.github.io](https://reyrove.github.io/).*