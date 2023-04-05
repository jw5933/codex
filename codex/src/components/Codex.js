import {useEffect, useState} from "react";
import codexService from '@/services/codex'
import {Word} from "@/components/Word";
export const Codex = ({words}) => {
    console.log(words)
    return (
        <>
            <div className={'codex'}>
                {(words? words.map(wordObj => {
                    return (
                        <div key={wordObj.word}>
                            <Word wordObj={wordObj}/>
                        </div>
                    )
                }): "no words yet!")}
            </div>
        </>
    )
}