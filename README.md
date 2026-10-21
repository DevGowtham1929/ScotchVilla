# Kenela – "Your Furry Friend" Website Template

A faithful, modern, pixel-perfect recreation of the [Kenela – Your Furry Friend](https://kenela.peerduck.com/your-furry-friend/) homepage template.

Built with clean, semantic HTML5, modern CSS3 (Custom Properties & Flexbox/Grid), and lightweight vanilla JavaScript.

---

## 📁 Project Structure

```
Pet/
├── index.html         # Complete homepage markup with all sections
├── css/
│   └── style.css      # Core styles, typography, layout, animations & responsive media queries
├── js/
│   └── main.js        # Carousels, video popup, stats counter animation, mobile menu
└── README.md          # Guide & image customization instructions
```

---

## 🚀 How to Run the Website

### Option 1: Double-click to open
Simply double-click `index.html` in Finder to view it directly in any web browser.

### Option 2: Run a local development server
You can run a lightweight local server from your terminal inside the `Pet` folder:

```bash
# Using Python 3:
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## 🎨 Sections Included

1. **Sticky Header & Navigation**
   - Brand logo, navigation menu with dropdowns, "Get in Touch" CTA button, and mobile hamburger drawer.
2. **Hero Section**
   - Headline: *"Where Dogs and Families Connect"*, subtitle badge, description, "Get in Touch" button.
   - Interactive pulsing video play button opening YouTube video modal.
   - Main dog photo, customer review rating badge, floating decorative stamps.
3. **Why Us Section**
   - Dual-column layout with high-resolution dog showcase cards, floating award badge, and *"Discover"* action link.
4. **Our Services**
   - 4 service cards with floating animated icon illustrations: *Puppy Adoption*, *Adult Dog Adoption*, *Breeding Services*, and *Training and Consultation*.
5. **Our Puppies (Interactive Carousel)**
   - 6 puppy cards with authentic pastel background tints (Lavender, Coral, Amber):
     - *Moris* (Pug)
     - *Roy* (Chihuahua)
     - *Gven* (American Spaniel)
     - *Oliver* (Jack Russell Terrier)
     - *Emily* (Rat Terrier)
     - *Pierre* (Toy Poodle)
   - Left/right arrow navigation, autoplay, and mobile swipe.
6. **Parallax Quote Banner**
   - Full-bleed background with fixed parallax effect and quote: *"Our passion for dogs and our dedication to their well-being shine through in everything we do."*
7. **Testimonials (Interactive Carousel)**
   - Verified adopter reviews with 5-star rating badges and dot pagination.
8. **Stats & Dog Breeder Experience**
   - Live animated counter counting up to **300+** dogs placed over 10 years.
   - Overlapping duo photos of dogs and owners with smooth drop shadows.
9. **Bottom Call-to-Action Banner**
   - Full-width banner: *"From Puppy Love to Lifelong Loyalty"* with button.
10. **Footer**
    - Company info, business hours, contact email/phone, and copyright notice.
11. **Interactive Modals**
    - Video lightbox modal for YouTube playback.
    - Contact inquiry modal triggered by any "Get in Touch" button.

---

## 🖼️ How to Change Images and Pictures Later

All images in `index.html` currently reference the live high-resolution assets so the site displays immediately.

To replace any image with your own:

1. **Put your new pictures** in an `images/` or `assets/` folder in this directory.
2. **Open [index.html](file:///Users/gowthamn/Downloads/Pet/index.html)** and search for the image `src`:
   - **Hero Main Dog**: Line ~108 (`hero-dog-img`)
   - **Why Us Dogs**: Lines ~145 & ~168 (`rounded-card-img`)
   - **Service Icons**: Lines ~194, ~209, ~224, ~239 (`service-icon-img`)
   - **Puppy Carousel**: Lines ~268 to ~345 (`puppy-img-placeholder`)
   - **Parallax Banner Photo**: Open [css/style.css](file:///Users/gowthamn/Downloads/Pet/css/style.css#L590) and edit the `background-image` under `.quote-parallax-section`.
   - **Stats Photos**: Lines ~432 & ~440 (`rounded-stat-img`)
   - **Logo**: Line ~23 (`logo-img`)
