export type WorkExperienceProps = {
    period: {
        from: string;
        to?: string;
    }
    title: string;
    employer: string;
    summary: string;
}

export const WorkExperience = ({period, title, employer, summary}: WorkExperienceProps) => {
    const { from } = period;
    const options = { year: "numeric", month: }

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString("nl", {year: "numeric", month: "short" });
    }

    return (
        <>
            <h1>{title}</h1>
            <h2>{employer}</h2>
            <time dateTime={from}>{formatDate(from)}</time>{!!to && <time dateTime={to}>formatDate(to)</time> }
            <p>{summary}</p>
        </>
      )
}

const workExperiences = [
    {
        employer: "Accenture (formerly Sentia)",
        title: "Senior Front-end developer / Senior Analyst",
        period: ["Apr 2023", "Present"],
        summary: "At Accenture I continued my work for client HvA, see Sentia entry below."
    },
    {
        employer: "Sentia (formerly Indivirtual)",
        title: "Senior Front-end developer",
        period: ["Nov 2020", "Apr 2023"],
        summary: "At Sentia I was fully contracted to work for client University of Applied Scienses Amsterdam (Hogeschool Amsterdam, or HvA). For the HvA I fully set up the front-end stack of their website hva.nl. I also helped guide a junior developer into becoming a medior and mentored an intern"
    },
    {
        employer: "Indivirtual",
        title: "Medior Front-end developer",
        period: ["Nov 2020", "Apr 2023"],
        summary: "At Indivirtual I helped develop a NextJS boilerplate for front-end development. I also helped our team lead mentoring our more junior developers."
    },
]

export const WorkExperiences = ({experiences}: Array<WorkExperienceProps>) => {

    return (
        <ul>
            {
                experiences.map(experience =>

                <WorkExperience {...experience} />

                )
            }
        </ul>
    )
}