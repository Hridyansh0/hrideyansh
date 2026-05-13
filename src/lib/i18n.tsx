import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "hi" | "en";

type Dict = Record<string, { hi: string; en: string }>;

export const TRANSLATIONS: Dict = {
  // Brand
  "brand.name": { hi: "कानपुर नगर निगम", en: "Kanpur Nagar Nigam" },
  "brand.tag": { hi: "Kanpur Nagar Nigam · नागरिक सेवा पोर्टल", en: "Kanpur Nagar Nigam · Citizen Service Portal" },
  "brand.motto": { hi: "सेवा परमो धर्मः", en: "Service is the highest duty" },
  "brand.govStrip": { hi: "🇮🇳 भारत सरकार | उत्तर प्रदेश सरकार", en: "🇮🇳 Government of India | Government of Uttar Pradesh" },
  "brand.helpline": { hi: "हेल्पलाइन: 1533", en: "Helpline: 1533" },

  // Nav
  "nav.home": { hi: "मुख्य पृष्ठ", en: "Home" },
  "nav.services": { hi: "सेवाएं", en: "Services" },
  "nav.news": { hi: "समाचार", en: "News" },
  "nav.about": { hi: "हमारे बारे में", en: "About" },
  "nav.contact": { hi: "संपर्क", en: "Contact" },
  "nav.register": { hi: "शिकायत दर्ज करें", en: "Register Complaint" },
  "nav.track": { hi: "ट्रैक करें", en: "Track" },
  "nav.trackFull": { hi: "शिकायत ट्रैक करें", en: "Track Complaint" },
  "nav.login": { hi: "लॉगिन", en: "Login" },
  "nav.loginRegister": { hi: "लॉगिन / पंजीकरण", en: "Login / Register" },
  "nav.logout": { hi: "लॉगआउट", en: "Logout" },
  "nav.admin": { hi: "Admin", en: "Admin" },
  "nav.adminPanel": { hi: "Admin Panel", en: "Admin Panel" },

  // Footer
  "footer.about": { hi: "कानपुर के नागरिकों को स्वच्छ, सुरक्षित और विकसित शहर प्रदान करने के लिए प्रतिबद्ध।", en: "Committed to providing the citizens of Kanpur a clean, safe, and developed city." },
  "footer.quickLinks": { hi: "त्वरित लिंक", en: "Quick Links" },
  "footer.complaintMgmt": { hi: "शिकायत प्रबंधन", en: "Complaint Management" },
  "footer.citizenLogin": { hi: "नागरिक लॉगिन", en: "Citizen Login" },
  "footer.contact": { hi: "संपर्क", en: "Contact" },
  "footer.address": { hi: "मोतीझील, कानपुर - 208002, उत्तर प्रदेश", en: "Motijheel, Kanpur - 208002, Uttar Pradesh" },
  "footer.phone": { hi: "हेल्पलाइन: 1533 / 0512-2531662", en: "Helpline: 1533 / 0512-2531662" },
  "footer.copyright": { hi: "सर्वाधिकार सुरक्षित", en: "All rights reserved" },
  "footer.tagline": { hi: "स्वच्छ कानपुर · सुंदर कानपुर · विकसित कानपुर 🇮🇳", en: "Clean Kanpur · Beautiful Kanpur · Developed Kanpur 🇮🇳" },

  // Home
  "home.metaTitle": { hi: "कानपुर नगर निगम — मुख्य पृष्ठ", en: "Kanpur Nagar Nigam — Home" },
  "home.metaDesc": { hi: "कानपुर नगर निगम के नागरिक सेवा पोर्टल पर आपका स्वागत है।", en: "Welcome to the Kanpur Nagar Nigam citizen service portal." },
  "home.heroBadge": { hi: "🇮🇳 आधिकारिक सरकारी पोर्टल", en: "🇮🇳 Official Government Portal" },
  "home.heroTitle1": { hi: "स्वच्छ कानपुर", en: "Clean Kanpur" },
  "home.heroTitle2": { hi: "सशक्त नागरिक", en: "Empowered Citizens" },
  "home.heroDesc": { hi: "कानपुर नगर निगम का आधिकारिक नागरिक सेवा पोर्टल। अपनी शिकायत मिनटों में दर्ज करें, OTP से सत्यापित करें और रियल-टाइम स्थिति देखें।", en: "The official citizen service portal of Kanpur Nagar Nigam. File complaints in minutes, verify with OTP, and track real-time status." },
  "home.marqueeTag": { hi: "📣 नवीनतम सूचनाएं", en: "📣 Latest Updates" },
  "home.qa.register": { hi: "शिकायत दर्ज", en: "Register" },
  "home.qa.registerDesc": { hi: "नई शिकायत पंजीकृत करें", en: "Register a new complaint" },
  "home.qa.track": { hi: "स्थिति देखें", en: "Check Status" },
  "home.qa.trackDesc": { hi: "शिकायत ID से ट्रैक करें", en: "Track by complaint ID" },
  "home.qa.helpline": { hi: "हेल्पलाइन", en: "Helpline" },
  "home.qa.helplineDesc": { hi: "तत्काल सहायता: 1533", en: "Instant help: 1533" },
  "home.qa.services": { hi: "सेवाएं", en: "Services" },
  "home.qa.servicesDesc": { hi: "सभी नगर निगम सेवाएं", en: "All municipal services" },
  "home.qa.open": { hi: "खोलें", en: "Open" },
  "home.services.kicker": { hi: "नागरिक सेवाएं", en: "Citizen Services" },
  "home.services.title": { hi: "हम क्या प्रदान करते हैं", en: "What We Provide" },
  "home.leaders.kicker": { hi: "माननीय नेता", en: "Honorable Leaders" },
  "home.leaders.title": { hi: "हमारा नेतृत्व", en: "Our Leadership" },
  "home.news.kicker": { hi: "समाचार एवं घोषणाएं", en: "News & Announcements" },
  "home.news.title": { hi: "नवीनतम जानकारी", en: "Latest Updates" },
  "home.news.all": { hi: "सभी समाचार", en: "All News" },
  "home.cta.title": { hi: "अपनी आवाज़ पहुंचाएं — परिवर्तन लाएं", en: "Raise Your Voice — Bring Change" },
  "home.cta.desc": { hi: "आपकी हर शिकायत कानपुर को बेहतर बनाने में योगदान देती है। आज ही पंजीकरण करें।", en: "Every complaint helps make Kanpur better. Register today." },
  "home.cta.btn": { hi: "अभी शिकायत दर्ज करें", en: "Register Complaint Now" },

  // Stats
  "stats.population": { hi: "जनसंख्या", en: "Population" },
  "stats.wards": { hi: "वार्ड", en: "Wards" },
  "stats.literacy": { hi: "साक्षरता दर", en: "Literacy Rate" },
  "stats.area": { hi: "क्षेत्रफल", en: "Area" },
  "stats.populationVal": { hi: "32 लाख+", en: "3.2M+" },

  // Services page
  "services.metaTitle": { hi: "सेवाएं — कानपुर नगर निगम", en: "Services — Kanpur Nagar Nigam" },
  "services.title": { hi: "हमारी सेवाएं", en: "Our Services" },
  "services.subtitle": { hi: "कानपुर के नागरिकों के लिए नगर निगम द्वारा प्रदत्त सभी सेवाएं", en: "All services provided by the municipal corporation to the citizens of Kanpur" },

  // News page
  "news.metaTitle": { hi: "समाचार एवं घोषणाएं — कानपुर नगर निगम", en: "News & Announcements — Kanpur Nagar Nigam" },
  "news.title": { hi: "समाचार एवं घोषणाएं", en: "News & Announcements" },
  "news.subtitle": { hi: "नगर निगम की नवीनतम गतिविधियां और सूचनाएं", en: "Latest activities and notices from the corporation" },

  // About page
  "about.metaTitle": { hi: "हमारे बारे में — कानपुर नगर निगम", en: "About Us — Kanpur Nagar Nigam" },
  "about.title": { hi: "हमारे बारे में", en: "About Us" },
  "about.subtitle": { hi: "कानपुर नगर निगम — सेवा परमो धर्मः", en: "Kanpur Nagar Nigam — Service is the highest duty" },
  "about.intro": { hi: "कानपुर नगर निगम उत्तर प्रदेश के सबसे बड़े और औद्योगिक रूप से महत्वपूर्ण शहर कानपुर का संचालन करने वाली प्रमुख स्थानीय संस्था है। यह संस्था नगर के 110 वार्डों में रहने वाले लगभग 32 लाख नागरिकों को सफाई, जल आपूर्ति, स्ट्रीट लाइट, सड़क मरम्मत, स्वास्थ्य और कई अन्य आवश्यक सेवाएं प्रदान करती है।", en: "Kanpur Nagar Nigam is the principal local body governing Kanpur — Uttar Pradesh's largest and most industrially important city. It provides sanitation, water supply, street lighting, road repair, health and many other essential services to about 3.2 million citizens across the city's 110 wards." },
  "about.visionT": { hi: "हमारा विज़न", en: "Our Vision" },
  "about.visionD": { hi: "कानपुर को एक स्वच्छ, सुरक्षित, हरित और स्मार्ट शहर बनाना जहाँ हर नागरिक को बेहतर जीवन-स्तर मिले।", en: "To make Kanpur a clean, safe, green and smart city where every citizen enjoys a better quality of life." },
  "about.missionT": { hi: "हमारा मिशन", en: "Our Mission" },
  "about.missionD": { hi: "पारदर्शी, उत्तरदायी और तकनीक-समर्थ नगर प्रशासन के माध्यम से उच्च गुणवत्ता वाली नागरिक सेवाएं प्रदान करना।", en: "To deliver high-quality citizen services through transparent, accountable and technology-enabled municipal governance." },
  "about.historyT": { hi: "इतिहास", en: "History" },
  "about.historyD": { hi: "कानपुर शहर की स्थानीय निकाय व्यवस्था की शुरुआत 1861 में हुई थी। 1959 में इसे नगर महापालिका का दर्जा मिला और बाद में नगर निगम के रूप में पुनर्गठित किया गया। आज यह उत्तर प्रदेश के सबसे महत्वपूर्ण नगर निगमों में से एक है, जो 605 वर्ग किलोमीटर के क्षेत्रफल में फैले शहर का प्रशासन करता है।", en: "Local governance in Kanpur began in 1861. In 1959 it was granted Municipal Corporation status and later reorganised as a Nagar Nigam. Today it is one of Uttar Pradesh's most important municipal corporations, administering an area of 605 square kilometres." },

  // Contact page
  "contact.metaTitle": { hi: "संपर्क करें — कानपुर नगर निगम", en: "Contact — Kanpur Nagar Nigam" },
  "contact.title": { hi: "संपर्क करें", en: "Contact Us" },
  "contact.subtitle": { hi: "हम आपकी सहायता के लिए सदैव तत्पर हैं", en: "We are always ready to assist you" },
  "contact.hq": { hi: "मुख्यालय", en: "Headquarters" },
  "contact.hqVal": { hi: "कानपुर नगर निगम भवन, मोतीझील, कानपुर - 208002, उत्तर प्रदेश", en: "Kanpur Nagar Nigam Building, Motijheel, Kanpur - 208002, Uttar Pradesh" },
  "contact.helpline": { hi: "हेल्पलाइन", en: "Helpline" },
  "contact.helplineVal": { hi: "1533 (टोल-फ्री)\n0512-2531662 / 2531663", en: "1533 (Toll-free)\n0512-2531662 / 2531663" },
  "contact.email": { hi: "ईमेल", en: "Email" },
  "contact.emailVal": { hi: "info@kmc.up.nic.in\ncomplaints@kmc.up.nic.in", en: "info@kmc.up.nic.in\ncomplaints@kmc.up.nic.in" },
  "contact.hours": { hi: "कार्यालय समय", en: "Office Hours" },
  "contact.hoursVal": { hi: "सोमवार - शुक्रवार: 10:00 AM - 5:00 PM\nशनिवार: 10:00 AM - 2:00 PM\nरविवार: बंद", en: "Monday - Friday: 10:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed" },
  "contact.emergency": { hi: "🚨 आपातकालीन शिकायत के लिए", en: "🚨 For emergency complaints" },
  "contact.emergencyDesc": { hi: "तत्काल हेल्पलाइन:", en: "Immediate helpline:" },

  // Auth
  "auth.metaTitle": { hi: "नागरिक लॉगिन — कानपुर नगर निगम", en: "Citizen Login — Kanpur Nagar Nigam" },
  "auth.titlePhone": { hi: "नागरिक लॉगिन", en: "Citizen Login" },
  "auth.titleOtp": { hi: "OTP सत्यापन", en: "OTP Verification" },
  "auth.subtitlePhone": { hi: "मोबाइल नंबर पर OTP प्राप्त करें", en: "Receive OTP on mobile" },
  "auth.subtitleOtp": { hi: "पर भेजा गया OTP दर्ज करें", en: "Enter the OTP sent to" },
  "auth.fullName": { hi: "पूरा नाम", en: "Full Name" },
  "auth.fullNamePh": { hi: "जैसे: रमेश कुमार", en: "e.g. Ramesh Kumar" },
  "auth.mobile": { hi: "मोबाइल नंबर", en: "Mobile Number" },
  "auth.mobilePh": { hi: "10-अंकीय मोबाइल नंबर", en: "10-digit mobile number" },
  "auth.sendOtp": { hi: "OTP भेजें", en: "Send OTP" },
  "auth.otpLabel": { hi: "6 अंकों का OTP", en: "6-digit OTP" },
  "auth.verify": { hi: "सत्यापित करें", en: "Verify" },
  "auth.changeNumber": { hi: "← नंबर बदलें", en: "← Change Number" },
  "auth.secure": { hi: "🔒 आपकी जानकारी सुरक्षित है · सरकारी पोर्टल", en: "🔒 Your information is secure · Government portal" },
  "auth.errPhone": { hi: "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें", en: "Please enter a 10-digit mobile number" },
  "auth.errName": { hi: "कृपया अपना नाम दर्ज करें", en: "Please enter your name" },
  "auth.otpSent": { hi: "OTP भेज दिया गया है", en: "OTP sent" },
  "auth.errOtp": { hi: "6 अंकों का OTP दर्ज करें", en: "Enter the 6-digit OTP" },
  "auth.errOtpWrong": { hi: "OTP गलत है। कृपया पुनः प्रयास करें।", en: "Incorrect OTP. Please try again." },
  "auth.success": { hi: "लॉगिन सफल!", en: "Login successful!" },

  // Complaint register
  "reg.metaTitle": { hi: "शिकायत दर्ज करें — कानपुर नगर निगम", en: "Register Complaint — Kanpur Nagar Nigam" },
  "reg.title": { hi: "शिकायत दर्ज करें", en: "Register Complaint" },
  "reg.subtitle": { hi: "सभी आवश्यक जानकारी भरें — आपकी शिकायत 7 कार्य दिवसों में निपटाई जाएगी।", en: "Fill in all required details — your complaint will be addressed within 7 working days." },
  "reg.loginFirst": { hi: "पहले लॉगिन करें", en: "Please log in first" },
  "reg.loginFirstDesc": { hi: "शिकायत दर्ज करने के लिए मोबाइल OTP से सत्यापन आवश्यक है।", en: "Mobile OTP verification is required to file a complaint." },
  "reg.loginBtn": { hi: "मोबाइल OTP से लॉगिन करें", en: "Login with Mobile OTP" },
  "reg.success": { hi: "शिकायत सफलतापूर्वक दर्ज!", en: "Complaint Successfully Registered!" },
  "reg.successDesc": { hi: "कृपया अपना शिकायत क्रमांक सुरक्षित रखें।", en: "Please save your complaint number." },
  "reg.complaintNo": { hi: "शिकायत क्रमांक", en: "Complaint Number" },
  "reg.copy": { hi: "कॉपी करें", en: "Copy" },
  "reg.copied": { hi: "कॉपी हो गया", en: "Copied" },
  "reg.trackBtn": { hi: "शिकायत ट्रैक करें", en: "Track Complaint" },
  "reg.home": { hi: "मुख्य पृष्ठ", en: "Home" },
  "reg.name": { hi: "नाम *", en: "Name *" },
  "reg.phone": { hi: "मोबाइल नंबर *", en: "Mobile Number *" },
  "reg.category": { hi: "शिकायत श्रेणी *", en: "Complaint Category *" },
  "reg.priority": { hi: "प्राथमिकता", en: "Priority" },
  "reg.pLow": { hi: "कम", en: "Low" },
  "reg.pMed": { hi: "सामान्य", en: "Medium" },
  "reg.pHigh": { hi: "उच्च / आपातकालीन", en: "High / Emergency" },
  "reg.subject": { hi: "विषय *", en: "Subject *" },
  "reg.subjectPh": { hi: "जैसे: हमारे मोहल्ले में 3 दिन से कूड़ा नहीं उठा", en: "e.g. Garbage not collected in our area for 3 days" },
  "reg.desc": { hi: "विस्तृत विवरण *", en: "Detailed Description *" },
  "reg.descPh": { hi: "समस्या के बारे में विस्तार से बताएं...", en: "Describe the problem in detail..." },
  "reg.address": { hi: "पूरा पता *", en: "Full Address *" },
  "reg.ward": { hi: "वार्ड / क्षेत्र", en: "Ward / Area" },
  "reg.wardPh": { hi: "जैसे: वार्ड 45 / स्वरूप नगर", en: "e.g. Ward 45 / Swaroop Nagar" },
  "reg.submit": { hi: "शिकायत जमा करें", en: "Submit Complaint" },
  "reg.cancel": { hi: "रद्द करें", en: "Cancel" },
  "reg.errFields": { hi: "कृपया सभी आवश्यक फ़ील्ड भरें", en: "Please fill all required fields" },
  "reg.errLogin": { hi: "कृपया पहले लॉगिन करें", en: "Please log in first" },

  // Track
  "track.metaTitle": { hi: "शिकायत ट्रैक करें — कानपुर नगर निगम", en: "Track Complaint — Kanpur Nagar Nigam" },
  "track.title": { hi: "शिकायत ट्रैक करें", en: "Track Complaint" },
  "track.subtitle": { hi: "अपना शिकायत क्रमांक दर्ज करें और स्थिति देखें", en: "Enter your complaint number and view the status" },
  "track.placeholder": { hi: "जैसे: KNN2026000001", en: "e.g. KNN2026000001" },
  "track.search": { hi: "खोजें", en: "Search" },
  "track.errEmpty": { hi: "शिकायत क्रमांक दर्ज करें", en: "Enter a complaint number" },
  "track.errNotFound": { hi: "इस क्रमांक से कोई शिकायत नहीं मिली", en: "No complaint found with this number" },
  "track.myList": { hi: "मेरी पिछली शिकायतें", en: "My Previous Complaints" },
  "track.loginCta1": { hi: "लॉगिन करें", en: "Log in" },
  "track.loginCta2": { hi: "अपनी पिछली शिकायतें देखने के लिए।", en: "to view your previous complaints." },
  "track.subject": { hi: "विषय", en: "Subject" },
  "track.cat": { hi: "श्रेणी", en: "Category" },
  "track.citizen": { hi: "नागरिक", en: "Citizen" },
  "track.ward": { hi: "वार्ड", en: "Ward" },
  "track.date": { hi: "दर्ज तिथि", en: "Filed On" },
  "track.address": { hi: "पता", en: "Address" },
  "track.detail": { hi: "विस्तृत विवरण", en: "Detailed Description" },
  "track.history": { hi: "📋 स्थिति का इतिहास", en: "📋 Status History" },

  // Admin
  "admin.title": { hi: "Admin Panel", en: "Admin Panel" },
  "admin.subtitle": { hi: "शिकायतों की निगरानी और प्रबंधन", en: "Monitor and manage complaints" },
  "admin.denied": { hi: "पहुंच निषेध", en: "Access Denied" },
  "admin.deniedDesc": { hi: "यह पृष्ठ केवल प्रशासकों के लिए है।", en: "This page is for administrators only." },
  "admin.deniedHint": { hi: "Admin बनने के लिए: Cloud → Database → user_roles table में अपने user_id के साथ role='admin' का record जोड़ें।", en: "To become an admin: Cloud → Database → user_roles table → add a record with your user_id and role='admin'." },
  "admin.all": { hi: "सभी", en: "All" },
  "admin.high": { hi: "उच्च", en: "High" },
  "admin.empty": { hi: "कोई शिकायत नहीं मिली", en: "No complaints found" },
  "admin.detail": { hi: "विवरण", en: "Details" },
  "admin.address": { hi: "पता", en: "Address" },
  "admin.updateStatus": { hi: "स्थिति अपडेट करें", en: "Update Status" },
  "admin.notePh": { hi: "अपडेट का नोट (वैकल्पिक)", en: "Update note (optional)" },
  "admin.update": { hi: "अपडेट करें", en: "Update" },
  "admin.updated": { hi: "स्थिति अपडेट हो गई", en: "Status updated" },

  // Status
  "status.pending": { hi: "लंबित", en: "Pending" },
  "status.in_progress": { hi: "प्रक्रिया में", en: "In Progress" },
  "status.resolved": { hi: "समाधान हुआ", en: "Resolved" },
  "status.rejected": { hi: "अस्वीकृत", en: "Rejected" },

  // 404
  "nf.title": { hi: "पृष्ठ नहीं मिला", en: "Page Not Found" },
  "nf.desc": { hi: "जिस पृष्ठ की आप तलाश कर रहे हैं, वह उपलब्ध नहीं है।", en: "The page you are looking for is not available." },
  "nf.home": { hi: "मुख्य पृष्ठ पर जाएं", en: "Go to Home" },
};

// Translatable lists (parallel arrays kept aligned with site-data.ts)
export const SERVICES_I18N = [
  { icon: "🧹", titleKey: "svc.clean", descKey: "svc.cleanDesc" },
  { icon: "💧", titleKey: "svc.water", descKey: "svc.waterDesc" },
  { icon: "💡", titleKey: "svc.light", descKey: "svc.lightDesc" },
  { icon: "🛣️", titleKey: "svc.road", descKey: "svc.roadDesc" },
  { icon: "🌳", titleKey: "svc.park", descKey: "svc.parkDesc" },
  { icon: "🏥", titleKey: "svc.health", descKey: "svc.healthDesc" },
  { icon: "📋", titleKey: "svc.cert", descKey: "svc.certDesc" },
  { icon: "🏠", titleKey: "svc.tax", descKey: "svc.taxDesc" },
];

Object.assign(TRANSLATIONS, {
  "svc.clean": { hi: "सफाई व्यवस्था", en: "Sanitation" },
  "svc.cleanDesc": { hi: "कूड़ा संग्रहण, सड़क सफाई, सार्वजनिक शौचालय की देखभाल", en: "Garbage collection, street cleaning, public toilet maintenance" },
  "svc.water": { hi: "जल आपूर्ति", en: "Water Supply" },
  "svc.waterDesc": { hi: "पीने के पानी की आपूर्ति, पाइपलाइन मरम्मत, टैंकर सेवा", en: "Drinking water supply, pipeline repair, tanker service" },
  "svc.light": { hi: "मार्ग प्रकाश", en: "Street Lighting" },
  "svc.lightDesc": { hi: "स्ट्रीट लाइट लगाना, रखरखाव और मरम्मत", en: "Installation, maintenance and repair of street lights" },
  "svc.road": { hi: "सड़क मरम्मत", en: "Road Repair" },
  "svc.roadDesc": { hi: "सड़कों की मरम्मत, गड्ढे भरना, फुटपाथ निर्माण", en: "Road repair, pothole filling, footpath construction" },
  "svc.park": { hi: "उद्यान एवं पार्क", en: "Parks & Gardens" },
  "svc.parkDesc": { hi: "पार्क रखरखाव, पौधारोपण, हरियाली विकास", en: "Park upkeep, plantation, greenery development" },
  "svc.health": { hi: "स्वास्थ्य सेवा", en: "Health Services" },
  "svc.healthDesc": { hi: "मच्छर नियंत्रण, फॉगिंग, सार्वजनिक स्वास्थ्य", en: "Mosquito control, fogging, public health" },
  "svc.cert": { hi: "जन्म-मृत्यु प्रमाण पत्र", en: "Birth & Death Certificates" },
  "svc.certDesc": { hi: "ऑनलाइन पंजीकरण और डाउनलोड", en: "Online registration and download" },
  "svc.tax": { hi: "गृह कर / संपत्ति कर", en: "House / Property Tax" },
  "svc.taxDesc": { hi: "ऑनलाइन भुगतान, कर निर्धारण", en: "Online payment, tax assessment" },
});

export const NEWS_I18N = [
  { dateKey: "news1.date", titleKey: "news1.title", excerptKey: "news1.excerpt" },
  { dateKey: "news2.date", titleKey: "news2.title", excerptKey: "news2.excerpt" },
  { dateKey: "news3.date", titleKey: "news3.title", excerptKey: "news3.excerpt" },
  { dateKey: "news4.date", titleKey: "news4.title", excerptKey: "news4.excerpt" },
];

export const NEWS_EXTRA_I18N = [
  { dateKey: "news5.date", titleKey: "news5.title", excerptKey: "news5.excerpt" },
  { dateKey: "news6.date", titleKey: "news6.title", excerptKey: "news6.excerpt" },
  { dateKey: "news7.date", titleKey: "news7.title", excerptKey: "news7.excerpt" },
];

Object.assign(TRANSLATIONS, {
  "news1.date": { hi: "28 अप्रैल 2026", en: "28 April 2026" },
  "news1.title": { hi: "स्वच्छ कानपुर अभियान का शुभारंभ", en: "Launch of Clean Kanpur Campaign" },
  "news1.excerpt": { hi: "मेयर ने मोतीझील से 50 वार्डों में स्वच्छता अभियान का शुभारंभ किया।", en: "The Mayor launched the cleanliness drive across 50 wards from Motijheel." },
  "news2.date": { hi: "22 अप्रैल 2026", en: "22 April 2026" },
  "news2.title": { hi: "नई जल आपूर्ति परियोजना स्वीकृत", en: "New Water Supply Project Approved" },
  "news2.excerpt": { hi: "गंगा बैराज से शहर के 12 नए इलाकों तक पानी पहुंचाने की योजना मंजूर।", en: "Plan approved to bring water from Ganga Barrage to 12 new areas of the city." },
  "news3.date": { hi: "15 अप्रैल 2026", en: "15 April 2026" },
  "news3.title": { hi: "ई-शिकायत पोर्टल का शुभारंभ", en: "E-Complaint Portal Launched" },
  "news3.excerpt": { hi: "नागरिक अब घर बैठे ऑनलाइन शिकायत दर्ज कर सकते हैं और स्थिति ट्रैक कर सकते हैं।", en: "Citizens can now file complaints online from home and track their status." },
  "news4.date": { hi: "08 अप्रैल 2026", en: "08 April 2026" },
  "news4.title": { hi: "सोलर स्ट्रीट लाइट परियोजना", en: "Solar Street Light Project" },
  "news4.excerpt": { hi: "शहर के 30 प्रमुख चौराहों पर सोलर लाइट लगाई जाएंगी।", en: "Solar lights will be installed at 30 major intersections in the city." },
  "news5.date": { hi: "01 अप्रैल 2026", en: "01 April 2026" },
  "news5.title": { hi: "नया वित्तीय वर्ष: कर भुगतान पर 10% छूट", en: "New Financial Year: 10% Rebate on Tax Payment" },
  "news5.excerpt": { hi: "31 मई तक गृह कर भुगतान पर विशेष छूट योजना।", en: "Special rebate on house tax payments until 31 May." },
  "news6.date": { hi: "20 मार्च 2026", en: "20 March 2026" },
  "news6.title": { hi: "वृक्षारोपण अभियान — 1 लाख पौधे", en: "Plantation Drive — 100,000 Saplings" },
  "news6.excerpt": { hi: "मानसून से पहले शहर में 1 लाख पौधे लगाने का लक्ष्य।", en: "Target to plant 100,000 saplings in the city before the monsoon." },
  "news7.date": { hi: "10 मार्च 2026", en: "10 March 2026" },
  "news7.title": { hi: "महिला स्वास्थ्य शिविर", en: "Women's Health Camp" },
  "news7.excerpt": { hi: "सभी 10 ज़ोनल कार्यालयों पर मुफ्त स्वास्थ्य जांच।", en: "Free health check-ups at all 10 zonal offices." },
});

export const NOTICES_I18N = ["notice1", "notice2", "notice3", "notice4"];
Object.assign(TRANSLATIONS, {
  "notice1": { hi: "📢 गृह कर भुगतान की अंतिम तिथि: 31 मई 2026 — 10% छूट का लाभ उठाएं", en: "📢 House tax payment deadline: 31 May 2026 — avail 10% rebate" },
  "notice2": { hi: "🆕 नई ई-शिकायत प्रणाली शुरू — अब OTP से सत्यापित शिकायतें दर्ज करें", en: "🆕 New e-complaint system live — file OTP-verified complaints now" },
  "notice3": { hi: "💧 कल जल आपूर्ति बाधित: ज्योति नगर, स्वरूप नगर — सुबह 6 से 10 बजे तक", en: "💧 Water supply disrupted tomorrow: Jyoti Nagar, Swaroop Nagar — 6 AM to 10 AM" },
  "notice4": { hi: "🎉 स्वच्छता सर्वेक्षण 2026 में कानपुर को मिले विशेष पुरस्कार", en: "🎉 Kanpur received special awards in Swachhta Survekshan 2026" },
});

export const LEADERS_I18N = [
  { nameKey: "ldr1.name", postKey: "ldr1.post", color: "bg-saffron" },
  { nameKey: "ldr2.name", postKey: "ldr2.post", color: "bg-saffron" },
  { nameKey: "ldr3.name", postKey: "ldr3.post", color: "bg-india-green" },
  { nameKey: "ldr4.name", postKey: "ldr4.post", color: "bg-primary" },
  { nameKey: "ldr5.name", postKey: "ldr5.post", color: "bg-primary" },
];
Object.assign(TRANSLATIONS, {
  "ldr1.name": { hi: "श्री नरेंद्र मोदी", en: "Shri Narendra Modi" },
  "ldr1.post": { hi: "प्रधानमंत्री, भारत सरकार", en: "Prime Minister, Government of India" },
  "ldr2.name": { hi: "श्री योगी आदित्यनाथ", en: "Shri Yogi Adityanath" },
  "ldr2.post": { hi: "मुख्यमंत्री, उत्तर प्रदेश", en: "Chief Minister, Uttar Pradesh" },
  "ldr3.name": { hi: "श्रीमती प्रमिला पांडेय", en: "Smt. Pramila Pandey" },
  "ldr3.post": { hi: "महापौर, कानपुर नगर निगम", en: "Mayor, Kanpur Nagar Nigam" },
  "ldr4.name": { hi: "श्री शिव शरणप्पा जी एन", en: "Shri Shiv Sharanappa GN" },
  "ldr4.post": { hi: "नगर आयुक्त, कानपुर", en: "Municipal Commissioner, Kanpur" },
  "ldr5.name": { hi: "श्री सुधीर कुमार", en: "Shri Sudhir Kumar" },
  "ldr5.post": { hi: "अपर नगर आयुक्त", en: "Additional Municipal Commissioner" },
});

export const CATEGORIES_I18N = [
  "cat.clean", "cat.water", "cat.light", "cat.road", "cat.drain",
  "cat.park", "cat.illegal", "cat.mosquito", "cat.stray", "cat.other",
];
Object.assign(TRANSLATIONS, {
  "cat.clean": { hi: "सफाई व्यवस्था", en: "Sanitation" },
  "cat.water": { hi: "जल आपूर्ति", en: "Water Supply" },
  "cat.light": { hi: "मार्ग प्रकाश / स्ट्रीट लाइट", en: "Street Lighting" },
  "cat.road": { hi: "सड़क मरम्मत / गड्ढे", en: "Road Repair / Potholes" },
  "cat.drain": { hi: "नालियां / जल निकासी", en: "Drainage" },
  "cat.park": { hi: "उद्यान / पार्क", en: "Parks / Gardens" },
  "cat.illegal": { hi: "अवैध निर्माण", en: "Illegal Construction" },
  "cat.mosquito": { hi: "मच्छर / फॉगिंग", en: "Mosquitoes / Fogging" },
  "cat.stray": { hi: "आवारा पशु", en: "Stray Animals" },
  "cat.other": { hi: "अन्य", en: "Other" },
});

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<LangCtx>({ lang: "hi", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always default to "hi" on both server and client to avoid SSR hydration mismatch.
  const [lang, setLangState] = useState<Lang>("hi");

  // Read persisted preference only after mount (client-only).
  useEffect(() => {
    try {
      const saved = localStorage.getItem("knn_lang") as Lang | null;
      if (saved === "en" || saved === "hi") {
        if (saved !== lang) setLangState(saved);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try { localStorage.setItem("knn_lang", lang); } catch { /* ignore */ }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (key: string) => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[lang] || entry.hi || key;
  };

  return <Ctx.Provider value={{ lang, setLang: setLangState, t }}>{children}</Ctx.Provider>;
}

export function useT() {
  return useContext(Ctx);
}
