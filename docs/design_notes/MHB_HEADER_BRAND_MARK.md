# MHB 2.6F - Minimal Header Brand Mark

## Purpose

The top application header now carries a small visual signature before the existing `Mindful Health Balance` heading. It identifies the app without making the header a launch screen or changing the title, date area, navigation, or any runtime behavior.

## Asset Relationship

`assets/brand/mhb-header-mark.png` is a deterministic derivative of the approved macOS launcher artwork at `assets/macos/mhb-app-icon-source.png`. A local build helper preserves the saturated logo colors while removing the neutral marble tile, rounded-square container, and shadow. The result is a transparent mark containing the MHB monogram, partial sweep, and leaf accent; it is not an ICNS file or generated app artifact.

## Visual Hierarchy

The mark is 44px on desktop and 34px on narrow layouts. The `h1` remains the semantic and visual primary. Blue-purple remains the main identity; the orange and green parts of the original mark are small secondary accents only. The asset has no interaction, animation, remote fetch, or health/nutrition meaning.

## Presentation Boundary

This patch changes only the header title zone. The existing translucent topbar, date pill, navigation, localization key, application logic, and public version are unchanged. The transparent asset works in light and dark themes without a new halo or app-icon tile.
