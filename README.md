# Textile Calculator

A comprehensive web-based calculator tool for textile and fabric professionals. Perform essential textile calculations including GSM, denier-tex conversion, thread count, fabric cost estimation, and yarn count conversion.

## Features

- **GSM Calculator** - Calculate Grams per Square Meter from fabric weight and area
- **Denier to Tex Converter** - Convert between denier and tex units
- **Thread Count Calculator** - Calculate total thread count from warp and weft densities
- **Fabric Cost Calculator** - Estimate fabric cost based on GSM, area, and price per gram
- **Yarn Count Converter** - Convert between Ne (English cotton count) and Nm (metric count)
- Keyboard support - Press Enter to calculate all values simultaneously

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/reyrove/textile-calculator.git
   ```

2. Navigate to the project folder
   ```bash
   cd textile-calculator
   ```

3. Open `index.html` in your browser

## File Structure

```
textile-calculator/
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
└── .gitignore
```

## Calculator Functions

### GSM Calculator
Calculates fabric weight in grams per square meter.
- Input: Fabric weight (grams), Fabric area (m²)
- Output: GSM value (g/m²)

### Denier to Tex Converter
Converts between denier and tex yarn measurement units.
- Denier to Tex: Divide by 9
- Tex to Denier: Multiply by 9

### Thread Count Calculator
Calculates total thread count from warp and weft densities.
- Input: Warp density (threads/inch), Weft density (threads/inch)
- Output: Total thread count

### Fabric Cost Calculator
Estimates total fabric cost.
- Input: GSM (g/m²), Area (m²), Cost per gram ($)
- Output: Estimated total cost

### Yarn Count Converter
Converts between Ne (English cotton count) and Nm (metric count).
- Formula: Ne × 1.693 = Nm

## Usage

1. Open the application in any modern web browser
2. Fill in the required fields for the calculation you need
3. Click the corresponding calculate button
4. View the result below each section
5. Press Enter to calculate all sections at once

## Browser Support

- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

## Customization

You can easily modify:
- Conversion formulas in `script.js`
- Color scheme in `style.css`
- Add new calculator functions

## License

MIT License - see the LICENSE file for details

## Author

Created by Reyrove