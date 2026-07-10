---
name: Civic Stature
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#44474e'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#465f88'
  primary: '#000a1e'
  on-primary: '#ffffff'
  primary-container: '#002147'
  on-primary-container: '#708ab5'
  inverse-primary: '#aec7f6'
  secondary: '#115cb9'
  on-secondary: '#ffffff'
  secondary-container: '#659dfe'
  on-secondary-container: '#003370'
  tertiary: '#060b10'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c2228'
  on-tertiary-container: '#838990'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aec7f6'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#d7e2ff'
  secondary-fixed-dim: '#acc7ff'
  on-secondary-fixed: '#001a40'
  on-secondary-fixed-variant: '#004491'
  tertiary-fixed: '#dde3eb'
  tertiary-fixed-dim: '#c1c7ce'
  on-tertiary-fixed: '#161c22'
  on-tertiary-fixed-variant: '#41474e'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style
The design system is engineered for institutional authority and public trust. It serves as the digital foundation for an official assembly, where clarity of information and accessibility are the primary directives. The brand personality is dignified, reliable, and transparent, aimed at a diverse citizenry ranging from legal professionals to everyday residents.

The aesthetic follows a **Corporate / Modern** approach with subtle **Traditional** influences. It balances the efficiency of modern digital interfaces with the gravitas of historical governance. The UI avoids transient trends in favor of a timeless, structured, and legible environment that prioritizes content over decoration.

## Colors
The palette is rooted in a "Deep Navy" primary to establish immediate authority and stability. "Royal Blue" is utilized as the primary action color to guide users toward services and interactive elements. 

- **Primary (#002147):** Used for global navigation, footers, and primary headings to anchor the page.
- **Secondary (#0056b3):** Applied to interactive elements like buttons, links, and active states to ensure visibility and WCAG 2.1 AAA compliance.
- **Slate Gray (#343a40):** Reserved for body text and secondary metadata to maintain high legibility without the harshness of pure black.
- **White (#ffffff):** The primary canvas color, ensuring a "paper-like" clarity and maximizing contrast.

The system relies on a high-contrast ratio for all text elements to ensure universal accessibility.

## Typography
The typographic strategy uses a dual-font system to bridge tradition and modernity. **Playfair Display** is used for headlines to evoke the "printed word" of legislative documents and official seals. Its high-contrast serifs provide the necessary gravitas for high-level information.

**Inter** is the workhorse for all functional text, including body copy, forms, and navigation. It was selected for its exceptional legibility on screens and neutral character. 

- Use **Display** styles for landing page hero sections.
- Use **Headline** styles for section titles and article headers.
- Use **Body-lg** for introductory paragraphs and **Body-md** for standard content.
- All labels and utility text use **Inter** in Medium or SemiBold weights to ensure they are distinguishable from content.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain a controlled, professional reading experience, transitioning to a fluid model on mobile devices.

- **Grid:** A 12-column grid system is used for desktop (breakpoints > 1024px). For interior service pages, a 2-column layout (Sidebar 3 cols / Content 9 cols) is preferred for better information architecture.
- **Rhythm:** A strict 8px base unit governs all spacing. Vertical rhythm is emphasized to separate distinct legislative sections.
- **Safe Margins:** Content is contained within a 1280px max-width container to prevent line lengths from becoming unreadable on ultra-wide monitors.
- **Mobile:** Margins reduce to 16px, and all multi-column layouts stack vertically. Gutters remain consistent at 24px to provide enough breathing room for touch targets.

## Elevation & Depth
This design system minimizes the use of shadows to maintain a flat, official, and accessible "document" feel. Depth is instead conveyed through **Tonal Layers** and crisp borders.

- **Surface Levels:** The base background is always white. Secondary content areas (like sidebars or search bars) use a very light gray (#F8F9FA) to create a subtle separation without using drop shadows.
- **Outlines:** Use 1px solid borders in a light gray (#DEE2E6) for cards and input fields.
- **Interactive States:** Subtle, low-blur shadows (e.g., 4px blur, 10% opacity) are only permitted on hover states for primary buttons to provide tactile feedback without compromising the professional aesthetic.
- **Separators:** Horizontal rules should be 1px solid and used generously to break up long-form text and data tables.

## Shapes
The shape language is conservative and geometric. A **Soft (0.25rem)** roundedness is applied to standard components like buttons and input fields to soften the interface slightly while maintaining a serious, structured appearance.

- **Small Components (Buttons, Inputs):** 4px (0.25rem) radius.
- **Large Components (Cards, Modals):** 8px (0.5rem) radius.
- **Circular Elements:** Reserved strictly for status indicators or user avatars to distinguish them from functional UI blocks.
- **Square Edges:** Permitted for global navigation bars and footers to emphasize the "framework" of the site.

## Components
Consistent component styling ensures the assembly's digital services feel unified and easy to navigate.

- **Buttons:** Primary buttons use the Royal Blue background with White text. Secondary buttons use a Navy outline with Navy text. All buttons must have a minimum height of 44px for accessibility.
- **Input Fields:** Use a 1px Slate Gray border with an 8px internal padding. Focus states must feature a high-visibility 2px Royal Blue outline.
- **Cards:** Cards are used for "Service Links" or "News Items." They should have a 1px border, no shadow, and a white background. Headings within cards use Playfair Display (Headline-sm).
- **Data Tables:** Crucial for legislative data. Use a simple, striped row format (White and #F8F9FA) with bolded headers in Deep Navy. No vertical borders.
- **Breadcrumbs:** Essential for deep site hierarchies. Use Label-md styling in Slate Gray to ensure users always know their location within the assembly's structure.
- **Alerts/Banners:** Official notices use the Primary Navy for information and a distinct dark red for urgent legislative updates, always accompanied by an icon for clarity.