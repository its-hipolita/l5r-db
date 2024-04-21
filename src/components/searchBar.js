import React, { useState } from 'react';
import KeywordSearch from './keywordSearch';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [legality, setLegality] = useState('');
    const [cardType, setCardType] = useState('');
    const [clan, setClan] = useState('');
    const [keywordSearch, setKeywordSearch] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [suggestedKeywords, setSuggestedKeywords] = useState([]);
    const handleSearch = (e) => {
        e.preventDefault();
        const searchOptions = {
            searchTerm,
            legality,
            type: cardType,
            clan,
        };
        console.log(searchOptions);
        onSearch(searchOptions);
    };

    const legalities = [
        "20F",
        "celestial",
        "diamond",
        "emperor",
        "gold",
        "ivory",
        "jade",
        "lotus",
        "onyx",
        "open",
        "samurai",
        "shattered_empire"
    ]

    const cardTypes = [
        "strategy",
        "region",
        "holding",
        "personality",
        "event",
        "sensei",
        "item",
        "spell",
        "follower",
        "ancestor",
        "stronghold",
        "wind",
        "ring",
        "celestial"
    ]

    const clanList = [
        "crane",
        "naga",
        "spirit",
        "mantis",
        "scorpion",
        "crab",
        "shadowlands",
        "lion",
        "phoenix",
        "unicorn",
        "spider",
        "monk",
        "ratling",
        "dragon",
        "toturi",
        "ninja",
        "hare",
        "shinsei",
        "ronin",
        "akasha",
        "unaligned"
    ]

    const keywordsArray = [
        "Clan",
        "Samurai",
        "Yojimbo",
        "Battle:",
        "Shadowlands",
        "Nonhuman",
        "Goblin",
        "Scout",
        "Oni",
        "province.",
        "Honor.",
        "Fire",
        "Shugenja",
        "Battle/Open:",
        "Air",
        "Cavalry",
        "Destined",
        "Abomination",
        "Naga",
        "Champion",
        "2",
        "Pearl",
        "Unique",
        "Asp",
        "Cobra",
        "Experienced",
        "Contrictor",
        "Commander",
        "Conqueror",
        "Sincerity",
        "Siege",
        "4",
        "Resilient",
        "Cruel",
        "Earth",
        "Jade",
        "Magistrate",
        "Kolat",
        "Crane",
        "3",
        "Artisan",
        "Courtier",
        "Duelist",
        "Kensai",
        "Monk",
        "Tatooed",
        "Tactician",
        "Historian",
        "Beastmaster",
        "Hero",
        "Imperial",
        "Thunder",
        "Naval",
        "Alchemist",
        "Void",
        "Inquisitor",
        "Master",
        "Loyal",
        "Water",
        "Tejina",
        "Lies",
        "Expendable",
        "Ninja",
        "Tairao",
        "Reserve",
        "Undead",
        "Greensnake",
        "Spider",
        "Spirit",
        "Kumo",
        "Warlord",
        "Savior",
        "Maiden",
        "Paragon",
        "Inexperienced",
        "Insane",
        "ExperiencedCW",
        "2CW",
        "Bushi",
        "Chameleon",
        "Constrictor",
        "Berserker",
        "Tadama",
        "Gunso",
        "Governor",
        "Braggart",
        "Tattooed",
        "Higaru",
        "Deathseeker",
        "Elite",
        "Kharmic",
        "Renew",
        "Daimyo",
        "6",
        "Sociopath",
        "Kuroiban",
        "Cultist",
        "Bloodspeaker",
        "Enlightened",
        "Ogre",
        "5",
        "Assassin",
        "Geisha",
        "Ronin",
        "Priest",
        "Kami",
        "Brawler",
        "Drunkard",
        "Hunter",
        "Harrier",
        "Saboteur",
        "Poet",
        "Kenshinzen",
        "Yamabushi",
        "Sodan-Senzo",
        "Philosopher",
        "Archer",
        "Tochiko",
        "Duty",
        "Merchant",
        "Fudo",
        "Ancestor",
        "Kitsu",
        "Ayameko",
        "Kitsune",
        "Horror",
        "Danna-sama",
        "Mercenary",
        "Ichido",
        "Infiltrator",
        "Keirei",
        "Sato",
        "Fallen",
        "Enforcer",
        "Kobun",
        "Hag",
        "Smuggler",
        "Pirate",
        "Kuniken"
    ];
    
    

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSearch} className="mb-4">
                <div className="flex items-center justify-between border-b border-b-2 border-teal-500 py-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a card..."
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Search
                    </button>
                </div>
            </form>
            <div className="mt-4 p-4 border border-gray-300 rounded">
                <label className="block mb-2">
                    Legalities:
                    <select
                        value={legality}
                        onChange={(e) => setLegality(e.target.value)}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">All Legalities</option>
                        {legalities.map((legal, index) => (
                            <option key={index} value={legal}>{legal}</option>
                        ))}
                    </select>
                </label>
                <label className="block mb-2">
                    Card Types:
                    <select
                        value={cardType}
                        onChange={(e) => setCardType(e.target.value)}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">All Types</option>
                        {cardTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </label>
                <label className="block mb-2">
                    Clan:
                    <select
                        value={clan}
                        onChange={(e) => setClan(e.target.value)}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">All Types</option>
                        {clanList.map((clan, index) => (
                            <option key={index} value={clan}>{clan}</option>
                        ))}
                    </select>
                </label>
                <label className="block mb-2">
                    <KeywordSearch></KeywordSearch>
                </label>
                {/* Add more dropdowns and inputs for additional search options as needed */}
            </div>
        </div>
    );
};

export default SearchBar;
