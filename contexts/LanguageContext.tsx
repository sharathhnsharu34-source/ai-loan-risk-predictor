import React, { createContext, useState, useContext, ReactNode } from 'react';

export type LanguageCode = 'EN' | 'HI' | 'MR' | 'KN' | 'TA' | 'TE' | 'GU';

interface Translations {
  nav: {
    home: string;
    features: string;
    riskEngine: string;
    about: string;
    login: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaLoan: string;
    ctaMandi: string;
  };
  features: {
    sectionTitle: string;
    sectionTitleHighlight: string;
    sectionDesc: string;
    list: Array<{
      title: string;
      desc: string;
    }>;
    diagram: {
      yield: string;
      risk: string;
      growth: string;
    }
  };
  calculator: {
    title: string;
    labelCrop: string;
    labelLand: string;
    labelSoil: string;
    labelLocation: string;
    labelLoan: string;
    btnAnalyze: string;
    btnLoading: string;
    placeholder: string;
    resultRisk: string;
    resultProfit: string;
    resultLimit: string;
    resultBreakeven: string;
    resultCap: string;
    resultCost: string;
    resultAlternatives: string; // Added
    reportTitle: string;
    reportClimate: string;
    reportMandi: string;
  };
  footer: {
    tagline: string;
    links: { privacy: string; terms: string; support: string; };
    madeFor: string;
  };
}

const translations: Record<LanguageCode, Translations> = {
  EN: {
    nav: { home: 'Home', features: 'Features', riskEngine: 'Risk Engine', about: 'About', login: 'Login' },
    hero: {
      badge: "India's #1 AI Agri-Fintech Platform",
      titleLine1: "Smart Farming",
      titleLine2: "Financial Future",
      description: "Empowering Indian farmers with Gemini AI to forecast climate, analyze soil, and secure the best loans in Rupees (₹).",
      ctaLoan: "Check Loan Eligibility",
      ctaMandi: "Crop Rates"
    },
    features: {
      sectionTitle: "The",
      sectionTitleHighlight: "Intelligence Core",
      sectionDesc: "A comprehensive ecosystem designed to maximize yield and minimize financial risk for Indian Agriculture.",
      list: [
        { title: "Climate Forecasting", desc: "Hyper-local weather prediction models powered by AI for Kharif & Rabi seasons, which mentions safe or risk level." },
        { title: "Soil Suitability", desc: "Deep analysis of Indian soil types (Alluvial, Black, Red) to match the perfect crop, displaying score with green to red meter." },
        { title: "Profit Prediction", desc: "Advanced ROI calculation in ₹ based on local Mandi prices and input costs." },
        { title: "Loan Risk Engine", desc: "Core Feature: Calculate credit-worthiness for KCC and agri-loans instantly." },
        { title: "Market Analysis", desc: "Real-time APMC market crop price tracking and future trend forecasting." },
        { title: "Multilingual", desc: "Support for Hindi, Tamil, Telugu, Kannada, and other regional languages." }
      ],
      diagram: { yield: "MAXIMIZE YIELD", risk: "MINIMIZE RISK", growth: "SMART GROWTH" }
    },
    calculator: {
      title: "Kisan Loan AI",
      labelCrop: "Select Crop",
      labelLand: "Land (Acres)",
      labelSoil: "Soil Type",
      labelLocation: "Location (District)",
      labelLoan: "Loan Amount (₹)",
      btnAnalyze: "Run Risk Analysis",
      btnLoading: "Analyzing...",
      placeholder: "Enter farm details to generate detailed report in Rupees.",
      resultRisk: "Risk Score",
      resultProfit: "Profit & Loss Graph",
      resultLimit: "Safe Loan Limit",
      resultBreakeven: "Breakeven",
      resultCap: "Recommended Cap",
      resultCost: "Est. Input Cost",
      resultAlternatives: "Suggested Alternatives",
      reportTitle: "AI Agronomist Report",
      reportClimate: "Climate & Soil Health",
      reportMandi: "Mandi Intelligence"
    },
    footer: {
      tagline: "Empowering Indian Kisan with AI-driven financial insights.",
      links: { privacy: "Privacy Policy", terms: "Terms of Service", support: "Contact Support" },
      madeFor: "Made for India"
    }
  },
  HI: {
    nav: { home: 'होम', features: 'विशेषताएं', riskEngine: 'जोखिम इंजन', about: 'हमारे बारे में', login: 'लॉग इन' },
    hero: {
      badge: "भारत का #1 एआई एग्री-फिनटेक प्लेटफॉर्म",
      titleLine1: "स्मार्ट खेती",
      titleLine2: "आर्थिक भविष्य",
      description: "मौसम का पूर्वानुमान, मिट्टी का विश्लेषण और सर्वोत्तम ऋण (₹) सुरक्षित करने के लिए जेमिनी एआई के साथ भारतीय किसानों को सशक्त बनाना।",
      ctaLoan: "ऋण पात्रता जांचें",
      ctaMandi: "फसल दर"
    },
    features: {
      sectionTitle: "कृषि",
      sectionTitleHighlight: "बुद्धिमत्ता केंद्र",
      sectionDesc: "भारतीय कृषि के लिए उपज को अधिकतम करने और वित्तीय जोखिम को कम करने के लिए बनाया गया एक व्यापक पारिस्थितिकी तंत्र।",
      list: [
        { title: "मौसम पूर्वानुमान", desc: "खरीफ और रबी फसलों के लिए एआई मौसम मॉडल, जो सुरक्षित या जोखिम स्तर बताता है।" },
        { title: "मिट्टी की अनुकूलता", desc: "फसल के लिए मिट्टी का गहरा विश्लेषण, हरे से लाल मीटर के साथ स्कोर प्रदर्शित करता है।" },
        { title: "लाभ की भविष्यवाणी", desc: "स्थानीय मंडी भाव और लागत के आधार पर ₹ में उन्नत आरओआई गणना।" },
        { title: "ऋण जोखिम इंजन", desc: "केसीसी और कृषि ऋणों के लिए तुरंत क्रेडिट-योग्यता की गणना करें।" },
        { title: "बाजार विश्लेषण", desc: "वास्तविक समय एपीएमसी बाजार फसल मूल्य ट्रैकिंग और भविष्य के रुझान।" },
        { title: "बहुभाषी", desc: "हिंदी, तमिल, तेलुगु, कन्नड़ और अन्य क्षेत्रीय भाषाओं के लिए समर्थन।" }
      ],
      diagram: { yield: "उपज बढ़ाएं", risk: "जोखिम कम करें", growth: "स्मार्ट विकास" }
    },
    calculator: {
      title: "किसान ऋण एआई",
      labelCrop: "फसल चुनें",
      labelLand: "भूमि (एकड़)",
      labelSoil: "मिट्टी का प्रकार",
      labelLocation: "स्थान (जिला)",
      labelLoan: "ऋण राशि (₹)",
      btnAnalyze: "जोखिम विश्लेषण करें",
      btnLoading: "विश्लेषण हो रहा है...",
      placeholder: "विस्तृत रिपोर्ट प्राप्त करने के लिए कृषि विवरण दर्ज करें।",
      resultRisk: "जोखिम स्कोर",
      resultProfit: "लाभ और हानि ग्राफ",
      resultLimit: "सुरक्षित ऋण सीमा",
      resultBreakeven: "ब्रेक-ईवन",
      resultCap: "सिफारिश",
      resultCost: "अनुमानित लागत",
      resultAlternatives: "सुझाવित वैकल्पिक फसलें",
      reportTitle: "एआई कृषि रिपोर्ट",
      reportClimate: "जलवायु और मिट्टी",
      reportMandi: "मंडी खुफिया"
    },
    footer: {
      tagline: "एआई-संचालित वित्तीय अंतर्दृष्टि के साथ भारतीय किसान को सशक्त बनाना।",
      links: { privacy: "गोपनीयता नीति", terms: "सेवा की शर्तें", support: "संपर्क करें" },
      madeFor: "भारत के लिए निर्मित"
    }
  },
  MR: {
    nav: { home: 'मुख्यपृष्ठ', features: 'वैशिष्ट्ये', riskEngine: 'जोखीम इंजिन', about: 'आमच्याबद्दल', login: 'लॉग इन' },
    hero: {
      badge: "भारताचे #1 एआय एग्री-फिनटेक प्लॅटफॉर्म",
      titleLine1: "स्मार्ट शेती",
      titleLine2: "आर्थिक भविष्य",
      description: "हवामान अंदाज, माती परीक्षण आणि सर्वोत्तम कर्ज (₹) मिळवण्यासाठी जेमिनी एआय सह भारतीय शेतकऱ्यांना सक्षम करणे.",
      ctaLoan: "कर्ज पात्रता तपासा",
      ctaMandi: "पिकांचे दर"
    },
    features: {
      sectionTitle: "शेती",
      sectionTitleHighlight: "बुद्धिमत्ता केंद्र",
      sectionDesc: "उत्पन्न वाढवण्यासाठी आणि आर्थिक जोखीम कमी करण्यासाठी डिझाइन केलेली एक व्यापक प्रणाली.",
      list: [
        { title: "हवामान अंदाज", desc: "खरीप आणि रब्बी हंगामासाठी एआय हवामान अंदाज, जो सुरक्षित किंवा जोखीम पातळी सांगतो." },
        { title: "मातीची सुपीकता", desc: "पिकासाठी मातीचे सखोल विश्लेषण, हिरव्या ते लाल मीटरसह स्कोर दाखवते." },
        { title: "नफा अंदाज", desc: "स्थानिक मंडी भाव आणि खर्चाच्या आधारे ₹ मध्ये नफ्याचे गणित." },
        { title: "कर्ज जोखीम इंजिन", desc: "केसीसी आणि कृषी कर्जासाठी त्वरित क्रेडिट-पात्रता तपासा." },
        { title: "बाजार विश्लेषण", desc: "रिअल-टाइम एपीएमसी बाजार भाव आणि भविष्यातील ट्रेंड." },
        { title: "बहुभाषिक", desc: "मराठी, हिंदी, तमिळ, तेलुगू आणि इतर प्रादेशिक भाषांसाठी समर्थन." }
      ],
      diagram: { yield: "उत्पन्न वाढवा", risk: "जोखीम कमी करा", growth: "स्मार्ट विकास" }
    },
    calculator: {
      title: "किसान कर्ज एआय",
      labelCrop: "पीक निवडा",
      labelLand: "जमीन (एकर)",
      labelSoil: "मातीचा प्रकार",
      labelLocation: "स्थान (जिल्हा)",
      labelLoan: "कर्ज रक्कम (₹)",
      btnAnalyze: "जोखीम विश्लेषण करा",
      btnLoading: "विश्लेषण सुरू आहे...",
      placeholder: "तपशीलवार अहवाल मिळविण्यासाठी शेतीची माहिती प्रविष्ट करा.",
      resultRisk: "जोखीम गुण",
      resultProfit: "नफा आणि तोटा आलेख",
      resultLimit: "सुरक्षित कर्ज मर्यादा",
      resultBreakeven: "ना नफा ना तोटा",
      resultCap: "शिफारस",
      resultCost: "अंदाजे खर्च",
      resultAlternatives: "पर्यायी पिके",
      reportTitle: "एआई कृषी अहवाल",
      reportClimate: "हवामान आणि माती",
      reportMandi: "मंडी माहिती"
    },
    footer: {
      tagline: "एआई-आधारित आर्थिक माहितीसह भारतीय शेतकऱ्यांना सक्षम करणे.",
      links: { privacy: "गोपनीयता धोरण", terms: "सेवा अटी", support: "संपर्क" },
      madeFor: "भारतासाठी बनवलेले"
    }
  },
  KN: {
    nav: { home: 'ಮುಖಪುಟ', features: 'ವೈಶಿಷ್ಟ್ಯಗಳು', riskEngine: 'ರಿಸ್ಕ್ ಎಂಜಿನ್', about: 'ನಮ್ಮ ಬಗ್ಗೆ', login: 'ಲಾಗಿನ್' },
    hero: {
      badge: "ಭಾರತದ #1 AI ಕೃಷಿ-ಫಿನ್ಟೆಕ್ ವೇದಿಕೆ",
      titleLine1: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
      titleLine2: "ಆರ್ಥಿಕ ಭವಿಷ್ಯ",
      description: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ, ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಉತ್ತಮ ಸಾಲಗಳನ್ನು (₹) ಪಡೆಯಲು ಜೆಮಿನಿ AI ಮೂಲಕ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.",
      ctaLoan: "ಸಾಲದ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
      ctaMandi: "ಬೆಳೆ ದರಗಳು"
    },
    features: {
      sectionTitle: "ಕೃಷಿ",
      sectionTitleHighlight: "ಬುದ್ಧಿವಂತಿಕೆ",
      sectionDesc: "ಇಳುವರಿಯನ್ನು ಹೆಚ್ಚಿಸಲು ಮತ್ತು ಆರ್ಥಿಕ ಅಪಾಯವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ವ್ಯವಸ್ಥೆ.",
      list: [
        { title: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ", desc: "ಖಾರಿಫ್ ಮತ್ತು ರಬಿ ಋತುಗಳಿಗೆ AI ಹವಾಮಾನ ಮಾದರಿಗಳು, ಇದು ಸುರಕ್ಷಿತ ಅಥವಾ ಅಪಾಯದ ಮಟ್ಟವನ್ನು ತಿಳಿಸುತ್ತದೆ." },
        { title: "ಮಣ್ಣಿನ ಸೂಕ್ತತೆ", desc: "ಬೆಳೆಗೆ ಸರಿಯಾದ ಮಣ್ಣನ್ನು ಹೊಂದಿಸಲು ಆಳವಾದ ವಿಶ್ಲೇಷಣೆ, ಹಸಿರು ಮತ್ತು ಕೆಂಪು ಮೀಟರ್‌ನೊಂದಿಗೆ ಸ್ಕೋರ್ ತೋರಿಸುತ್ತದೆ." },
        { title: "ಲಾಭದ ಮುನ್ಸೂಚನೆ", desc: "ಸ್ಥಳೀಯ ಮಂಡಿ ಬೆಲೆಗಳ ಆಧಾರದ ಮೇಲೆ ₹ ನಲ್ಲಿ ಲಾಭದ ಲೆಕ್ಕಾಚಾರ." },
        { title: "ಸಾಲ ರಿಸ್ಕ್ ಎಂಜಿನ್", desc: "ಕೃಷಿ ಸಾಲಗಳಿಗೆ ಕ್ರೆಡಿಟ್ ಅರ್ಹತೆಯನ್ನು ತಕ್ಷಣವೇ ಲೆಕ್ಕಹಾಕಿ." },
        { title: "ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ", desc: "ನೈಜ-ಸಮಯದ APMC ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಟ್ರ್ಯಾಕಿಂಗ್." },
        { title: "ಬಹುಭಾಷಾ", desc: "ಕನ್ನಡ, ಹಿಂದಿ, ತಮಿಳು, ತೆಲುಗು ಭಾಷೆಗಳಿಗೆ ಬೆಂಬಲ." }
      ],
      diagram: { yield: "ಇಳುವರಿ ಹೆಚ್ಚಿಸಿ", risk: "ಅಪಾಯ ತಗ್ಗಿಸಿ", growth: "ಸ್ಮಾರ್ಟ್ ಬೆಳವಣಿಗೆ" }
    },
    calculator: {
      title: "ಕಿಸಾನ್ ಸಾಲ AI",
      labelCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
      labelLand: "ಜಮೀನು (ಎಕರೆ)",
      labelSoil: "ಮಣ್ಣಿನ ವಿಧ",
      labelLocation: "ಸ್ಥಳ (ಜಿಲ್ಲೆ)",
      labelLoan: "ಸಾಲದ ಮೊತ್ತ (₹)",
      btnAnalyze: "ರಿಸ್ಕ್ ವಿಶ್ಲೇಷಣೆ ಮಾಡಿ",
      btnLoading: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
      placeholder: "ವರದಿ ಪಡೆಯಲು ಕೃಷಿ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",
      resultRisk: "ರಿಸ್ಕ್ ಸ್ಕೋರ್",
      resultProfit: "ಲಾಭ ಮತ್ತು ನಷ್ಟದ ಗ್ರಾಫ್",
      resultLimit: "ಸುರಕ್ಷಿತ ಸಾಲ ಮಿತಿ",
      resultBreakeven: "ಬ್ರೇಕ್ಇವನ್",
      resultCap: "ಶಿಫಾರಸು",
      resultCost: "ಅಂದಾಜು ವೆಚ್ಚ",
      resultAlternatives: "ಪರ್ಯಾಯ ಬೆಳೆಗಳು",
      reportTitle: "AI ಕೃಷಿ ವರದಿ",
      reportClimate: "ಹವಾಮಾನ ಮತ್ತು ಮಣ್ಣು",
      reportMandi: "ಮಂಡಿ ಮಾಹಿತಿ"
    },
    footer: {
      tagline: "AI ಆರ್ಥಿಕ ಒಳನೋಟಗಳೊಂದಿಗೆ ಭಾರತೀಯ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.",
      links: { privacy: "ಗೌಪ್ಯತಾ ನೀತಿ", terms: "ಸೇವಾ ನಿಯಮಗಳು", support: "ಸಂಪರ್ಕಿಸಿ" },
      madeFor: "ಭಾರತಕ್ಕಾಗಿ ತಯಾರಿಸಲಾಗಿದೆ"
    }
  },
  TA: {
    nav: { home: 'முகப்பு', features: 'அம்சங்கள்', riskEngine: 'ரிஸ்க் என்ஜின்', about: 'எங்களை பற்றி', login: 'உள்நுழைக' },
    hero: {
      badge: "இந்தியாவின் #1 AI அக்ரி-பின்டெக் தளம்",
      titleLine1: "ஸ்மார்ட் விவசாயம்",
      titleLine2: "நிதி எதிர்காலம்",
      description: "வானிலை முன்னறிவிப்பு, மண் பகுப்பாய்வு மற்றும் சிறந்த கடன்களை (₹) பெற ஜெமினி AI உடன் விவசாயிகளை மேம்படுத்துதல்.",
      ctaLoan: "கடன் தகுதி",
      ctaMandi: "பயிர் விலைகள்"
    },
    features: {
      sectionTitle: "விவசாய",
      sectionTitleHighlight: "நுண்ணறிவு",
      sectionDesc: "மகசூலை அதிகரிக்கவும் நிதி அபாயத்தைக் குறைக்கவும் வடிவமைக்கப்பட்ட ஒரு விரிவான சூழல்.",
      list: [
        { title: "வானிலை முன்னறிவிப்பு", desc: "காரீஃப் மற்றும் ரபி பருவங்களுக்கு AI வானிலை மாதிரிகள், இது பாதுகாப்பான அல்லது ரிஸ்க் நிலையை குறிப்பிடுகிறது." },
        { title: "மண் பொருத்தம்", desc: "பயிருக்கு ஏற்ற மண்ணை கண்டறிய ஆழமான பகுப்பாய்வு, பச்சை முதல் சிவப்பு மீட்டருடன் ஸ்கோர் காட்டுகிறது." },
        { title: "லாப முன்னறிவிப்பு", desc: "உள்ளூர் சந்தை விலைகள் அடிப்படையில் ₹-ல் லாபக் கணக்கீடு." },
        { title: "கடன் ரிஸ்க் என்ஜின்", desc: "விவசாயக் கடன்களுக்கான தகுதியை உடனடியாகக் கணக்கிடுங்கள்." },
        { title: "சந்தை பகுப்பாய்வு", desc: "நிகழ்நேர APMC சந்தை விலை கண்காணிப்பு மற்றும் எதிர்கால போக்குகள்." },
        { title: "பன்மொழி", desc: "தமிழ், இந்தி, தெலுங்கு, கன்னடம் மொழிகளுக்கான ஆதரவு." }
      ],
      diagram: { yield: "மகசூல் அதிகரிப்பு", risk: "ரிஸ்க் குறைப்பு", growth: "ஸ்மார்ட் வளர்ச்சி" }
    },
    calculator: {
      title: "விவசாய கடன் AI",
      labelCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
      labelLand: "நிலம் (ஏக்கர்)",
      labelSoil: "மண் வகை",
      labelLocation: "இடம் (மாவட்டம்)",
      labelLoan: "கடன் தொகை (₹)",
      btnAnalyze: "ரிஸ்க் பகுப்பாய்வு",
      btnLoading: "பகுப்பாய்வு செய்கிறது...",
      placeholder: "விவரமான அறிக்கையைப் பெற விவசாய விவரங்களை உள்ளிடவும்.",
      resultRisk: "ரிஸ்க் மதிப்பெண்",
      resultProfit: "லாபம் மற்றும் இழப்பு வரைபடம்",
      resultLimit: "பாதுகாப்பான கடன் வரம்பு",
      resultBreakeven: "சமநிலை புள்ளி",
      resultCap: "பரிந்துரை",
      resultCost: "மதிப்பிடப்பட்ட செலவு",
      resultAlternatives: "மாற்று பயிர்கள்",
      reportTitle: "AI விவசாய அறிக்கை",
      reportClimate: "காலநிலை & மண்",
      reportMandi: "சந்தை நுண்ணறிவு"
    },
    footer: {
      tagline: "AI நிதி நுண்ணறிவுகளுடன் இந்திய விவசாயிகளை மேம்படுத்துதல்.",
      links: { privacy: "தனியுரிமைக் கொள்கை", terms: "விதிமுறைகள்", support: "தொடர்பு" },
      madeFor: "இந்தியாவிற்காக உருவாக்கப்பட்டது"
    }
  },
  TE: {
    nav: { home: 'హోమ్', features: 'ఫీచర్లు', riskEngine: 'రిస్క్ ఇంజిన్', about: 'మా గురించి', login: 'లాగిన్' },
    hero: {
      badge: "భారతదేశపు #1 AI అగ్రి-ఫిన్‌టెక్ ప్లాట్‌ఫారమ్",
      titleLine1: "స్మార్ట్ వ్యవసాయం",
      titleLine2: "ఆర్థిక భవిష్యత్తు",
      description: "వాతావరణ సూచన, నేల విశ్లేషణ మరియు ఉత్తమ రుణాలను (₹) పొందేందుకు జెమిని AI తో రైతులను శక్తివంతం చేయడం.",
      ctaLoan: "లోన్ అర్హతను తనిఖీ చేయండి",
      ctaMandi: "పంట ధరలు"
    },
    features: {
      sectionTitle: "వ్యవసాయ",
      sectionTitleHighlight: "మేధస్సు",
      sectionDesc: "దిగుబడిని పెంచడానికి మరియు ఆర్థిక ప్రమాదాన్ని తగ్గించడానికి రూపొందించబడిన సమగ్ర వ్యవస్థ.",
      list: [
        { title: "వాతావరణ సూచన", desc: "ఖరీఫ్ మరియు రబీ సీజన్ల కోసం AI వాతావరణ నమూనాలు, ఇది సురక్షిత లేదా ప్రమాద స్థాయిని సూచిస్తుంది." },
        { title: "నేల అనుకూలత", desc: "పంటకు సరిపోయే నేలను గుర్తించడానికి లోతైన విశ్లేషణ, ఆకుపచ్చ నుండి ఎరుపు మీటర్‌తో స్కోర్‌ను చూపుతుంది." },
        { title: "లాభ అంచనా", desc: "స్థానిక మార్కెట్ ధరల ఆధారంగా ₹ లో లాభం లెక్కించడం." },
        { title: "లోన్ రిస్క్ ఇంజిన్", desc: "వ్యవసాయ రుణాల కోసం క్రెడిట్ అర్హతను తక్షణమే లెక్కించండి." },
        { title: "మార్కెట్ విశ్లేషణ", desc: "రియల్ టైమ్ APMC మార్కెట్ ధర ట్రాకింగ్ మరియు భవిష్యత్తు పోకడలు." },
        { title: "బహుభాషా", desc: "తెలుగు, హిందీ, తమిళం, కన్నడ భాషలకు మద్దతు." }
      ],
      diagram: { yield: "దిగుబడి పెంపు", risk: "రిస్క్ తగ్గింపు", growth: "స్మార్ట్ వృద్ధి" }
    },
    calculator: {
      title: "కిసాన్ లోన్ AI",
      labelCrop: "పంటను ఎంచుకోండి",
      labelLand: "భూమి (ఎకరాలు)",
      labelSoil: "నేల రకం",
      labelLocation: "ప్రాంతం (జిల్లా)",
      labelLoan: "రుణం మొత్తం (₹)",
      btnAnalyze: "రిస్క్ విశ్లేషణ చేయండి",
      btnLoading: "విశ్లేషిస్తోంది...",
      placeholder: "నివేదిక పొందడానికి వ్యవసాయ వివరాలను నమోదు చేయండి.",
      resultRisk: "రిస్క్ స్కోర్",
      resultProfit: "లాభం మరియు నష్టాల గ్రాఫ్",
      resultLimit: "సురಕ್ಷిత రుణ పరిమితి",
      resultBreakeven: "బ్రేక్‌ఈవెన్",
      resultCap: "సిఫార్సు",
      resultCost: "అంచనా వ్యయం",
      resultAlternatives: "ప్రత్యామ్నాయ పంటలు",
      reportTitle: "AI వ్యవసాయ నివేదిక",
      reportClimate: "వాతావరణం & నేల",
      reportMandi: "మార్కెట్ సమాచారం"
    },
    footer: {
      tagline: "AI ఆర్థిక అంతర్దృష్టులతో భారతీయ రైతులను శక్తివంతం చేయడం.",
      links: { privacy: "గోప్యతా విధానం", terms: "నిబంధనలు", support: "సంప్రదించండి" },
      madeFor: "భారతదేశం కోసం తయారు చేయబడింది"
    }
  },
  GU: {
    nav: { home: 'હોમ', features: 'વિશેષતાઓ', riskEngine: 'જોખમ એન્જિન', about: 'અમારા વિશે', login: 'લૉગિન' },
    hero: {
      badge: "ભારતનું #1 AI એગ્રી-ફિનટેક પ્લેટફોર્મ",
      titleLine1: "સ્માર્ટ ખેતી",
      titleLine2: "આર્થિક ભવિષ્ય",
      description: "હવામાન આગાહી, જમીન વિશ્લેષણ અને શ્રેષ્ઠ લોન (₹) મેળવવા માટે જેમિની AI સાથે ખેડૂતોને સશક્તિકરણ.",
      ctaLoan: "લોન પાત્રતા તપાસો",
      ctaMandi: "પાકના ભાવ"
    },
    features: {
      sectionTitle: "કૃષિ",
      sectionTitleHighlight: "બુદ્ધિમત્તા કેન્દ્ર",
      sectionDesc: "ઉપજ વધારવા અને આર્થિક જોખમ ઘટાડવા માટે રચાયેલ એક વ્યાપક ઇકોસિસ્ટમ.",
      list: [
        { title: "હવામાન આગાહી", desc: "ખરીફ અને રવી ઋતુઓ માટે AI હવામાન મોડેલ્સ, જે સુરક્ષિત અથવા જોખમ સ્તર જણાવે છે." },
        { title: "જમીન અનુકૂળતા", desc: "પાક માટે યોગ્ય જમીન શોધવા માટે ઊંડું વિશ્લેષણ, લીલાથી લાલ મીટર સાથે સ્કોર દર્શાવે છે." },
        { title: "નફાની આગાહી", desc: "સ્થાનિક મંડી ભાવ અને ખર્ચના આધારે ₹ માં નફાની ગણતરી." },
        { title: "લોન રિસ્ક એન્જિન", desc: "કિસાન ક્રેડિટ અને લોન માટે તુરંત પાત્રતા ગણો." },
        { title: "બજાર વિશ્લેષણ", desc: "રિયલ-ટાઇમ APMC બજાર ભાવ ટ્રેકિંગ અને ભવિષ્યના વલણો." },
        { title: "બહુભાષી", desc: "ગુજરાતી, હિન્દી, તમિલ, તેલુગુ માટે સપોર્ટ." }
      ],
      diagram: { yield: "ઉપજ વધારો", risk: "જોખમ ઘટાડો", growth: "સ્માર્ટ વિકાસ" }
    },
    calculator: {
      title: "કિસાન લોન AI",
      labelCrop: "પાક પસંદ કરો",
      labelLand: "જમીન (એકર)",
      labelSoil: "જમીનનો પ્રકાર",
      labelLocation: "સ્થળ (જિલ્લો)",
      labelLoan: "લોન રકમ (₹)",
      btnAnalyze: "જોખમ વિશ્લેષણ કરો",
      btnLoading: "વિશ્લેષણ થઈ રહ્યું છે...",
      placeholder: "વિગતવાર રિપોર્ટ મેળવવા માટે ખેતીની વિગતો દાખલ કરો.",
      resultRisk: "જોખમ સ્કોર",
      resultProfit: "નફો અને નુકસાન ગ્રાફ",
      resultLimit: "સુરક્ષિત લોન મર્યાદા",
      resultBreakeven: "બ્રેક-ઈવન",
      resultCap: "ભલામણ",
      resultCost: "અંદાજિત ખર્ચ",
      resultAlternatives: "વૈકલ્પિક પાક",
      reportTitle: "AI કૃષિ રિપોર્ટ",
      reportClimate: "હવામાન અને જમીન",
      reportMandi: "મંડી માહિતી"
    },
    footer: {
      tagline: "AI સંચાલિત આર્થિક આંતરદૃષ્ટિ સાથે ભારતીય ખેડૂતને સશક્તિકરણ.",
      links: { privacy: "ગોપનીયતા નીતિ", terms: "સેવાની શરતો", support: "સંપર્ક કરો" },
      madeFor: "ભારત માટે નિર્મિત"
    }
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('EN');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};