type Props = {
    count: number;
    singular: string;
    plural: string;
    showNumberSingular?: boolean; // Whether to show the number in singular ("1 question")
    showNumberPlural?: boolean; // Whether to show the number in plural ("2 questions")
}

export default function ({
    count,
    singular,
    plural,
    showNumberSingular = false,
    showNumberPlural = true,
}: Props) {
    const isSingular = count === 1

    return (<>
        {isSingular && showNumberSingular && count}
        {!isSingular && showNumberPlural && count}
        {" "}
        {isSingular ? singular : plural}
    </>)
}