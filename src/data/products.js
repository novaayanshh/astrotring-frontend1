import React from 'react';
import {
  FiBookOpen,
  FiCalendar,
  FiCircle,
  FiCompass,
  FiStar,
  FiGift,
  FiHeart,
  FiHome,
  FiMoon,
  FiShield,
  FiZap,
  FiSun,
  FiTarget,
  FiUsers,
} from 'react-icons/fi';

const createIcon = (Icon) => React.createElement(Icon);

export const PRODUCTS = [
  { id: 1, name: 'Yellow Sapphire Ring', cat: 'Gemstone Rings', emoji: createIcon(FiSun), price: 18500, old: 22000, rating: 4.8, reviews: 124, badge: 'Bestseller', zodiac: 'Sagittarius', planet: 'Jupiter', desc: 'Natural Ceylon Yellow Sapphire (Pukhraj) set in 22K gold. Strengthens Jupiter, brings wisdom, wealth and marital harmony. Ideal for Sagittarius and Pisces ascendants.', tags: ['Pukhraj', 'Jupiter Stone', 'Sagittarius', 'Lab Certified'] },
  { id: 2, name: 'Blue Sapphire Ring', cat: 'Gemstone Rings', emoji: createIcon(FiStar), price: 24000, old: 30000, rating: 4.7, reviews: 89, badge: 'Premium', zodiac: 'Capricorn', planet: 'Saturn', desc: 'Natural Blue Sapphire (Neelam) â€” fastest acting gemstone for Saturn. For Capricorn and Aquarius ascendants. Brings career growth and discipline.', tags: ['Neelam', 'Saturn Stone', 'Capricorn', 'GIA Certified'] },
  { id: 3, name: 'Ruby Gemstone Ring', cat: 'Gemstone Rings', emoji: createIcon(FiHeart), price: 15000, old: 18000, rating: 4.6, reviews: 67, badge: '', zodiac: 'Leo', planet: 'Sun', desc: 'Natural Manik (Ruby) from Mozambique. Sun stone â€” boosts confidence, authority, and vitality. Ideal for Leo ascendants and government employees.', tags: ['Manik', 'Sun Stone', 'Leo', 'Lab Certified'] },
  { id: 4, name: '5-Mukhi Rudraksha Mala', cat: 'Rudraksha', emoji: createIcon(FiMoon), price: 4200, old: 5000, rating: 4.9, reviews: 211, badge: 'Top Rated', zodiac: 'All', planet: 'Jupiter', desc: 'Authentic Nepal Rudraksha, 108+1 beads. Represents Jupiter. Worn for peace, health, and overall spiritual wellbeing. Comes with energisation certificate.', tags: ['5 Mukhi', 'Nepal Rudraksha', 'Jupiter', 'Certified'] },
  { id: 5, name: 'Amethyst Crystal Ball', cat: 'Crystals', emoji: createIcon(FiZap), price: 3800, old: 4500, rating: 4.5, reviews: 156, badge: '', zodiac: 'Pisces', planet: 'Saturn', desc: 'Natural Amethyst sphere from Brazil. Enhances intuition, calms anxiety, and promotes spiritual growth. Ideal for meditation rooms.', tags: ['Amethyst', 'Crystal', 'Pisces', 'Brazil'] },
  { id: 6, name: 'Shree Yantra Copper', cat: 'Yantras', emoji: createIcon(FiCompass), price: 6500, old: 7500, rating: 4.8, reviews: 98, badge: 'Sacred', zodiac: 'All', planet: 'All', desc: 'Copper Shree Yantra energised on Navratri. Attracts abundance, prosperity, and positive energy. Comes with worship guide.', tags: ['Shree Yantra', 'Copper', 'Prosperity', 'Energised'] },
  { id: 7, name: 'Emerald Bracelet', cat: 'Bracelets', emoji: createIcon(FiGift), price: 12500, old: 15000, rating: 4.6, reviews: 45, badge: '', zodiac: 'Gemini', planet: 'Mercury', desc: 'Natural Panna (Emerald) bead bracelet. Mercury stone â€” ideal for students, writers, and traders. Enhances intellect and communication.', tags: ['Panna', 'Mercury', 'Gemini', 'Certified'] },
  { id: 8, name: 'Rose Quartz Tower', cat: 'Crystals', emoji: createIcon(FiHeart), price: 2200, old: 2800, rating: 4.4, reviews: 203, badge: '', zodiac: 'Libra', planet: 'Venus', desc: 'Natural Rose Quartz obelisk. The love stone â€” attracts relationships, heals emotional wounds, and brings self-love.', tags: ['Rose Quartz', 'Love Stone', 'Libra', 'Natural'] },
  { id: 9, name: 'Moonstone Ring', cat: 'Gemstone Rings', emoji: createIcon(FiMoon), price: 9500, old: 11000, rating: 4.7, reviews: 72, badge: 'New', zodiac: 'Cancer', planet: 'Moon', desc: 'Natural Sri Lanka Moonstone in silver. Moon stone for Cancer ascendants â€” enhances intuition, emotional balance, and feminine energy.', tags: ['Moonstone', 'Moon Stone', 'Cancer', 'Sri Lanka'] },
  { id: 10, name: 'Red Coral Bracelet', cat: 'Bracelets', emoji: createIcon(FiShield), price: 7800, old: 9000, rating: 4.5, reviews: 88, badge: '', zodiac: 'Aries', planet: 'Mars', desc: 'Natural Italian Red Coral (Moonga) bracelet. Mars stone for energy, courage, and leadership. Ideal for Aries and Scorpio ascendants.', tags: ['Moonga', 'Mars Stone', 'Aries', 'Italian Coral'] },
  { id: 11, name: 'Ganesha Clear Quartz', cat: 'Crystals', emoji: createIcon(FiZap), price: 4500, old: 5500, rating: 4.8, reviews: 134, badge: 'Spiritual', zodiac: 'All', planet: 'All', desc: 'Clear quartz Ganesha idol, energised with Vedic mantras. Removes obstacles and brings new beginnings. Perfect for office or home puja.', tags: ['Clear Quartz', 'Ganesha', 'Spiritual', 'Energised'] },
  { id: 12, name: 'Hessonite Garnet Ring', cat: 'Gemstone Rings', emoji: createIcon(FiCircle), price: 8900, old: 11000, rating: 4.5, reviews: 56, badge: '', zodiac: 'Aquarius', planet: 'Rahu', desc: 'Natural Gomed (Hessonite Garnet) â€” Rahu stone. Ideal for those in politics, law, or media. Brings name and fame.', tags: ['Gomed', 'Rahu Stone', 'Aquarius', 'Lab Certified'] },
];

export const CATEGORIES = [
  { name: 'Gemstone Rings', emoji: createIcon(FiStar), count: 48 },
  { name: 'Bracelets', emoji: createIcon(FiGift), count: 37 },
  { name: 'Rudraksha', emoji: createIcon(FiMoon), count: 29 },
  { name: 'Crystals', emoji: createIcon(FiZap), count: 55 },
  { name: 'Yantras', emoji: createIcon(FiCompass), count: 22 },
];

export const ZODIAC_DATA = [
  { sign: 'â™ˆ', name: 'Aries', gem: 'Red Coral', desc: 'Red Coral (Moonga) strengthens Mars, your ruling planet. It boosts courage, energy, and helps you overcome obstacles. Wear it on Tuesday in silver or copper.' },
  { sign: 'â™‰', name: 'Taurus', gem: 'Diamond / Opal', desc: 'Diamond and White Sapphire strengthen Venus. They enhance beauty, love, artistic talent, and financial prosperity for Taurus ascendants.' },
  { sign: 'â™Š', name: 'Gemini', gem: 'Emerald', desc: 'Emerald (Panna) energises Mercury, your ruler. It sharpens intellect, communication skills, and business acumen. Perfect for students and professionals.' },
  { sign: 'â™‹', name: 'Cancer', gem: 'Pearl', desc: 'Pearl (Moti) strengthens the Moon. It brings emotional balance, mental peace, and improves relationships and mother\'s blessings.' },
  { sign: 'â™Œ', name: 'Leo', gem: 'Ruby', desc: 'Ruby (Manik) energises the Sun. It boosts leadership, confidence, career growth, and government favour. A must-have for Leo ascendants.' },
  { sign: 'â™', name: 'Virgo', gem: 'Emerald', desc: 'Emerald benefits Virgo through Mercury. It enhances analytical thinking, health consciousness, and career in finance, healthcare, or writing.' },
  { sign: 'â™Ž', name: 'Libra', gem: 'Diamond', desc: 'Diamond amplifies Venus for Libra. It brings luxury, artistic success, harmonious relationships, and enhanced charm and magnetism.' },
  { sign: 'â™', name: 'Scorpio', gem: 'Red Coral', desc: 'Red Coral strengthens Mars (co-ruler with Ketu). It enhances Scorpio\'s natural intensity, investigative abilities, and protective energy.' },
  { sign: 'â™', name: 'Sagittarius', gem: 'Yellow Sapphire', desc: 'Yellow Sapphire (Pukhraj) is the primary stone for Sagittarius. It enhances Jupiter\'s blessings â€” wisdom, wealth, higher education, and spirituality.' },
  { sign: 'â™‘', name: 'Capricorn', gem: 'Blue Sapphire', desc: 'Blue Sapphire (Neelam) is the fastest-acting stone for Capricorn. Saturn\'s gem brings career success, discipline, and material prosperity.' },
  { sign: 'â™’', name: 'Aquarius', gem: 'Hessonite', desc: 'Hessonite (Gomed) works for Aquarius\'s Rahu. It brings name, fame, and success in media, politics, or unconventional careers.' },
  { sign: 'â™“', name: 'Pisces', gem: 'Yellow Sapphire', desc: 'Yellow Sapphire is equally powerful for Pisces. Jupiter as your ruler brings spiritual growth, generosity, and auspicious events in life.' },
];

export const TESTIMONIALS = [
  { name: 'Rahul Sharma', location: 'Delhi', initials: 'RS', rating: 5, text: 'My astrologer recommended a Yellow Sapphire for Jupiter, and within 3 months I got a promotion. The quality is exceptional â€” I could feel the energy the moment I wore it.' },
  { name: 'Priya Menon', location: 'Bangalore', initials: 'PM', rating: 5, text: 'The Rudraksha mala I ordered came beautifully packed with a detailed guide on how to energise it. The certification gave me complete confidence. Truly divine quality.' },
  { name: 'Anjali Nair', location: 'Mumbai', initials: 'AN', rating: 5, text: 'Got a full kundali consultation along with my Blue Sapphire ring. The astrologer was incredibly knowledgeable. The stone\'s colour and clarity are exactly as shown.' },
];

export const SERVICES = [
  { emoji: createIcon(FiBookOpen), name: 'Kundali Reading', desc: 'A comprehensive analysis of your birth chart covering all 12 houses, planetary positions, dashas, and life predictions for the next 10 years.', price: 'â‚¹1,499 / session' },
  { emoji: createIcon(FiStar), name: 'Gemstone Advice', desc: 'Get personalised gemstone recommendations based on your Kundali. Our experts identify the exact stones, weight, and wearing protocol for maximum benefit.', price: 'â‚¹799 / session' },
  { emoji: createIcon(FiHeart), name: 'Kundali Matching', desc: 'Traditional Ashtakoot matching for marriage compatibility, analysing Guna Milan, Mangal Dosha, and detailed marital prospects for both partners.', price: 'â‚¹1,199 / report' },
  { emoji: createIcon(FiHome), name: 'Vastu Consultation', desc: 'Harmonise your home or workplace with Vedic Vastu principles. Receive a personalised floor-plan analysis and correction recommendations.', price: 'â‚¹2,499 / home' },
  { emoji: createIcon(FiCalendar), name: 'Muhurta Selection', desc: 'Find the most auspicious time for your wedding, business launch, or property purchase using Vedic muhurta calculations.', price: 'â‚¹999 / event' },
  { emoji: createIcon(FiStar), name: 'Annual Forecast', desc: 'Your complete yearly astrology report covering all major transits, Dasha periods, and month-by-month predictions for career, health, love and finance.', price: 'â‚¹2,999 / year' },
];
// Append these two exports to the end of src/data/products.js

export const ASTROLOGERS = [
  { id: 1, name: 'Acharya Devendra', initials: 'AD', expertise: 'Vedic Â· Marriage', experience: 18, rating: 4.9, price: 25, online: true },
  { id: 2, name: 'Priya Joshi', initials: 'PJ', expertise: 'Love Â· Relationships', experience: 9, rating: 4.8, price: 18, online: true },
  { id: 3, name: 'Rohan Mehta', initials: 'RM', expertise: 'Career Â· Finance', experience: 14, rating: 4.7, price: 22, online: false },
  { id: 4, name: 'Aditi Rao', initials: 'AR', expertise: 'Vedic Â· Kundali', experience: 11, rating: 4.9, price: 20, online: true },
];

export const QUICK_LINKS = [
  { label: 'Compatibility', icon: createIcon(FiTarget) },
  { label: 'Horoscopes', icon: createIcon(FiStar) },
  { label: 'Chat to Astrologer', icon: createIcon(FiUsers) },
  { label: 'Kundali Match', icon: createIcon(FiBookOpen) },
  { label: 'Tarot Reading', icon: createIcon(FiZap) },
];
