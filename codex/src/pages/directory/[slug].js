import codexService from '@/services/codex'
import {Codex} from "@/components/Codex";
import WordForm from "@/components/WordForm";
import { useRouter } from 'next/router';
import {useEffect, useState} from "react";
import Layout from "@/components/Layout";

export default function DirectorySlug() {
    const router = useRouter();
    const slug = router.asPath.split('/').pop();
    const [codex, setCodex] = useState({});

    useEffect(() => {
        try {
            if (slug !== '[slug]')
                codexService
                    .getCodex(slug)
                    .then(data => {
                        console.log("got codex", data);
                        setCodex(data);
                    });
        } catch (error) {
            console.error(error);
        }
    }, [slug]);

    return (
        <>
            <Layout>
                <div className={'codex-container'}>
                    <h1>{codex.name}</h1>
                    <WordForm slug={slug} codex={codex} setCodex={setCodex}/>
                    <Codex slug={slug} codex={codex} setCodex={setCodex}/>
                </div>
            </Layout>
        </>
    )

}
