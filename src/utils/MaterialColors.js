// Material Design 3 Color System Generator
export class MaterialColors {
    constructor(sourceColor = '#006399') {
        this.sourceColor = sourceColor;
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setupListeners();
    }

    setupListeners() {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
                this.isDark = e.matches;
                // this.generateStyles(); // Removed this line
            });
    }

    hexToHSL(hex) {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    HSLToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return '#' + toHex(r) + toHex(g) + toHex(b);
    }

    generateTonalPalette(hsl) {
        const { h, s } = hsl;
        return {
            0: this.HSLToHex(h, s, 0),
            10: this.HSLToHex(h, s, 10),
            20: this.HSLToHex(h, s, 20),
            30: this.HSLToHex(h, s, 30),
            40: this.HSLToHex(h, s, 40),
            50: this.HSLToHex(h, s, 50),
            60: this.HSLToHex(h, s, 60),
            70: this.HSLToHex(h, s, 70),
            80: this.HSLToHex(h, s, 80),
            90: this.HSLToHex(h, s, 90),
            95: this.HSLToHex(h, s, 95),
            99: this.HSLToHex(h, s, 99),
            100: this.HSLToHex(h, s, 100)
        };
    }

    generateColorScheme() {
        const sourceHSL = this.hexToHSL(this.sourceColor);
        const mainPalette = this.generateTonalPalette(sourceHSL);
        
        // Generate secondary color (complementary)
        const secondaryHSL = { 
            h: (sourceHSL.h + 180) % 360, 
            s: sourceHSL.s * 0.9, 
            l: sourceHSL.l 
        };
        const secondaryPalette = this.generateTonalPalette(secondaryHSL);

        // Generate tertiary color (triadic)
        const tertiaryHSL = { 
            h: (sourceHSL.h + 120) % 360, 
            s: sourceHSL.s * 0.9, 
            l: sourceHSL.l 
        };
        const tertiaryPalette = this.generateTonalPalette(tertiaryHSL);

        // Generate neutral color (desaturated primary)
        const neutralHSL = { 
            h: sourceHSL.h, 
            s: sourceHSL.s * 0.1, 
            l: sourceHSL.l 
        };
        const neutralPalette = this.generateTonalPalette(neutralHSL);

        if (this.isDark) {
            return {
                primary: mainPalette[80],
                onPrimary: mainPalette[20],
                primaryContainer: mainPalette[30],
                onPrimaryContainer: mainPalette[90],
                
                secondary: secondaryPalette[80],
                onSecondary: secondaryPalette[20],
                secondaryContainer: secondaryPalette[30],
                onSecondaryContainer: secondaryPalette[90],
                
                tertiary: tertiaryPalette[80],
                onTertiary: tertiaryPalette[20],
                tertiaryContainer: tertiaryPalette[30],
                onTertiaryContainer: tertiaryPalette[90],
                
                error: '#ffb4ab',
                onError: '#690005',
                errorContainer: '#93000a',
                onErrorContainer: '#ffdad6',
                
                surface: neutralPalette[6],
                surfaceDim: neutralPalette[6],
                surfaceBright: neutralPalette[24],
                surfaceContainerLowest: neutralPalette[4],
                surfaceContainerLow: neutralPalette[10],
                surfaceContainer: neutralPalette[12],
                surfaceContainerHigh: neutralPalette[17],
                surfaceContainerHighest: neutralPalette[22],
                
                onSurface: neutralPalette[90],
                surfaceVariant: neutralPalette[30],
                onSurfaceVariant: neutralPalette[80],
                
                outline: neutralPalette[60],
                outlineVariant: neutralPalette[30],
                
                background: neutralPalette[6],
                onBackground: neutralPalette[90],
            };
        }

        return {
            primary: mainPalette[40],
            onPrimary: mainPalette[100],
            primaryContainer: mainPalette[90],
            onPrimaryContainer: mainPalette[10],
            
            secondary: secondaryPalette[40],
            onSecondary: secondaryPalette[100],
            secondaryContainer: secondaryPalette[90],
            onSecondaryContainer: secondaryPalette[10],
            
            tertiary: tertiaryPalette[40],
            onTertiary: tertiaryPalette[100],
            tertiaryContainer: tertiaryPalette[90],
            onTertiaryContainer: tertiaryPalette[10],
            
            error: '#ba1a1a',
            onError: '#ffffff',
            errorContainer: '#ffdad6',
            onErrorContainer: '#410002',
            
            surface: neutralPalette[98],
            surfaceDim: neutralPalette[87],
            surfaceBright: neutralPalette[98],
            surfaceContainerLowest: neutralPalette[100],
            surfaceContainerLow: neutralPalette[96],
            surfaceContainer: neutralPalette[94],
            surfaceContainerHigh: neutralPalette[92],
            surfaceContainerHighest: neutralPalette[90],
            
            onSurface: neutralPalette[10],
            surfaceVariant: neutralPalette[90],
            onSurfaceVariant: neutralPalette[30],
            
            outline: neutralPalette[50],
            outlineVariant: neutralPalette[80],
            
            background: neutralPalette[98],
            onBackground: neutralPalette[10],
        };
    }

    getSystemDefaults() {
        return {
            stateHover: '8%',
            stateFocus: '12%',
            statePressed: '12%',
            stateDragged: '16%',
            elevation1: '0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)',
            elevation2: '0px 2px 6px rgba(0,0,0,0.15), 0px 1px 2px rgba(0,0,0,0.3)',
            elevation3: '0px 1px 3px rgba(0,0,0,0.3), 0px 4px 8px 3px rgba(0,0,0,0.15)',
            elevation4: '0px 2px 3px rgba(0,0,0,0.3), 0px 6px 10px 4px rgba(0,0,0,0.15)',
            elevation5: '0px 4px 4px rgba(0,0,0,0.3), 0px 8px 12px 6px rgba(0,0,0,0.15)',
            shapeNone: '0px',
            shapeExtraSmall: '4px',
            shapeSmall: '8px',
            shapeMedium: '12px',
            shapeLarge: '16px',
            shapeExtraLarge: '28px',
            shapeFull: '9999px'
        };
    }

    toCSSVariables() {
        const colors = this.generateColorScheme();
        const defaults = this.getSystemDefaults();
        
        return {
            ...Object.entries(colors).reduce((acc, [key, value]) => {
                acc[`--md-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
                return acc;
            }, {}),
            ...Object.entries(defaults).reduce((acc, [key, value]) => {
                acc[`--md-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
                return acc;
            }, {})
        };
    }

    setSourceColor(color) {
        this.sourceColor = color;
        return this.toCSSVariables();
    }
}
