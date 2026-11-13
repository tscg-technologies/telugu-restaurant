=============================================================================
TELUGU RESTAURANT - IMAGE PLACEHOLDER SPECIFICATION & GOOGLE FLOW REPLACEMENT GUIDE
=============================================================================

This website uses strictly 10 unique CSS-styled placeholder concepts.
No external images or download files are used. Each placeholder in the HTML
is marked with comments and dedicated semantic CSS classes: `.placeholder-img` 
plus one of the 10 specific concept classes below (`.concept-1` to `.concept-10`).

-----------------------------------------------------------------------------
THE 10 APPROVED IMAGE PLACEHOLDER CONCEPTS:
-----------------------------------------------------------------------------

1. Concept 1: Telugu restaurant hero food arrangement
   - Class: .placeholder-hero-arrangement / .concept-1
   - Usage: Homepage Hero, Offers Banner, Gallery
   - Replacement prompt suggestion: "A grand South Indian Telugu festive feast feast layout on wooden table with bronze utensils, aromatic biryani, curries, chutneys, banana leaf spread, soft warm cinematic lighting, authentic Andhra Telugu culinary presentation"

2. Concept 2: Traditional Andhra meals served on a banana leaf
   - Class: .placeholder-banana-leaf-meal / .concept-2
   - Usage: Homepage Popular Dishes, Menu Traditional Meals, Specialties, Biryani & Meals Page
   - Replacement prompt suggestion: "Traditional authentic Andhra Bhojanam served on fresh green banana leaf, steamed hot sona masoori rice with melted ghee, mudda pappu, avakaya pickle, sambar, rasam, crisps, Telugu authentic meal"

3. Concept 3: Authentic Telangana food platter
   - Class: .placeholder-telangana-platter / .concept-3
   - Usage: Homepage Regional Showcase, Menu Special Thali, Specialties Page
   - Replacement prompt suggestion: "Authentic Telangana village cuisine platter featuring sarva pindi, jonna rotte, spicy mutton or country chicken curry, pachi pulusu, traditional brass rustic tableware"

4. Concept 4: Andhra chicken curry or spicy chicken dish
   - Class: .placeholder-andhra-chicken / .concept-4
   - Usage: Homepage Popular, Menu Curries, Specialties Page
   - Replacement prompt suggestion: "Rich spicy authentic Andhra Kodi Kura (Chicken Curry) with fiery red gravy, curry leaves, green chillies, aromatic whole spices in a traditional clay or brass bowl"

5. Concept 5: Traditional biryani
   - Class: .placeholder-biryani / .concept-5
   - Usage: Homepage Popular, Menu Rice & Biryani, Biryani & Meals Page, Offers
   - Replacement prompt suggestion: "Authentic Hyderabadi / Telugu Dum Biryani with fragrant long-grain basmati rice, tender spiced meat, caramelized onions, boiled egg, fresh mint, saffron layers, served in handi with mirchi ka salan and raita"

6. Concept 6: Vegetarian dishes and curries
   - Class: .placeholder-veg-curries / .concept-6
   - Usage: Homepage, Menu Curries, Specialties Gutti Vankaya, Offers
   - Replacement prompt suggestion: "Authentic Andhra Gutti Vankaya Kura (stuffed brinjal curry) cooked in sesame-peanut spice paste and fragrant tomato-onion gravy, garnished with coriander"

7. Concept 7: Telugu snacks and starters
   - Class: .placeholder-telugu-snacks / .concept-7
   - Usage: Menu Starters, Specialties (Pesarattu / Sarva Pindi), Gallery
   - Replacement prompt suggestion: "Crispy Telugu appetizers including Mirchi Bajji, golden Pesarattu with ginger allam pachadi, Sarva Pindi with sesame seeds, freshly fried hot"

8. Concept 8: Traditional Telugu sweets and desserts
   - Class: .placeholder-telugu-sweets / .concept-8
   - Usage: Menu Sweets, Gallery, Offers
   - Replacement prompt suggestion: "Traditional Telugu sweets spread: golden Bobbatlu with melted ghee, rich Double ka Meetha, Qubani ka Meetha with malai cream, Telugu celebratory desserts"

9. Concept 9: Restaurant dining interior
   - Class: .placeholder-dining-interior / .concept-9
   - Usage: About Page, Gallery, Contact Page
   - Replacement prompt suggestion: "Warm welcoming premium restaurant interior with subtle Telugu heritage decor, warm amber pendant lighting, wooden brass accents, comfortable family dining seating"

10. Concept 10: Traditional food preparation or cooking scene
    - Class: .placeholder-cooking-scene / .concept-10
    - Usage: About Us culinary philosophy, Gallery
    - Replacement prompt suggestion: "Traditional Telugu kitchen cooking scene, stone grinding mortar (rolu-rokkali) with fresh spices, clay pots simmering with fragrant curry, traditional wooden ladles and brass vessels"

-----------------------------------------------------------------------------
HOW TO REPLACE WITH GOOGLE FLOW GENERATED IMAGES:
-----------------------------------------------------------------------------
1. Save the generated images as webp or jpg inside `assets/images/`:
   e.g. concept-1.jpg, concept-2.jpg ... concept-10.jpg
2. In `css/style.css`, locate the `/* --- 10 APPROVED PLACEHOLDER CONCEPTS --- */` block.
3. Replace the CSS background gradient for `.concept-X` with:
   `background: url('../assets/images/concept-X.jpg') center/cover no-repeat;`
   or insert `<img>` tags inside `.placeholder-img` containers as needed.
=============================================================================
