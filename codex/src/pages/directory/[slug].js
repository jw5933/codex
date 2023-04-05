import codexService from '@/services/codex'
import {Codex} from "@/components/Codex";
import WordForm from "@/components/WordForm";
import { useRouter } from 'next/router';

const words = [
    {word: 'hello',
        definitions: [
            {definition: 'a greeting.'},
        ]},
    {word: 'goodbye',
        definitions: [
            {definition: 'a way to end conversation.'},
            {definition: 'a farewell'},
        ]}
]
export default function DirectorySlug() {
    const router = useRouter();
    const {slug} = router.query;
    return (
        <>
            <Codex words={words}/>
            <WordForm slug={slug}/>
        </>
    )

}
