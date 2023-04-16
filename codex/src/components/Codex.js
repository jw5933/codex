import {useEffect, useState} from "react";
import codexService from '@/services/codex'
import {Word} from "@/components/Word";
export const Codex = ({slug, codex, setCodex}) => {
    const words = codex.words;
    return (
        <>
            <h1>Codex: {codex.name}</h1>
            <div className={'codex'}>
                <h2>words:</h2>
                {(words? words.map(wordObj => {
                    return (
                        <div key={wordObj.word}>
                            <Word slug={slug} wordObject={wordObj} setCodex={setCodex}/>
                        </div>
                    )
                }): "no words yet!")}
            </div>
        </>
    )
}