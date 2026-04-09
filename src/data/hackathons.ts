export type Hackathon = {
    name: string
    project: string
    description?: string
    date: string
    award?: string
    link?: string
    upcoming?: boolean
}

const HACKATHONS: Hackathon[] = [
    {
        name: "bitcamp (umd)",
        project: "project tbd",
        date: "apr 2026",
        upcoming: true,
        link: "https://bit.camp/",
    },
    {
        name: "hackviolet",
        project: "plan my trip",
        description: "a collaborative travel budgeting app that lets users track and split expenses across multiple currencies in real time",
        date: "feb 2025",
        link: "https://devpost.com/software/plan-my-trip-8cpk07",
    },
    {
        name: "vthacks 12",
        project: "nutricampus",
        description: "web app that uses real campus dining data to help college students quickly find dining hall meals that match their personalized nutritional needs",
        date: "sep 2024",
        link: "https://devpost.com/software/nutricampus",
    },
    {
        name: "uta datathon 2024",
        project: "mayday maestros",
        description: "data-driven disaster response platform that uses machine learning to predict disaster impacts and optimize resource allocation",
        date: "apr 2024",
        link: "https://devpost.com/software/mayday-maestros",
    },
    {
        name: "hackthechains",
        project: "bounty block",
        description: "freelance platform that connects global talent with companies",
        date: "mar 2024",
        award: "1st in arbitrum track",
        link: "https://devpost.com/software/bountyblock",
    },
    {
        name: "aifa hacks",
        project: "carbon track",
        description: "web application that helps users calculate their personal carbon footprint",
        date: "sep 2023",
        award: "1st in division",
        link: "https://devpost.com/software/carbon-track-atu169",
    },
]

export default HACKATHONS
