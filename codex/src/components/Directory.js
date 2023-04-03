import CodexForm from "./CodexForm";
import {useEffect, useState} from "react";
import directoryService from '@/services/directory'
import {useRouter} from "next/router";

export const Directory = () => {
    console.log('Component rendered');
    const router = useRouter();
    const [directory, setDirectory] = useState([]);

    useEffect(() => {
        console.log('Effect called');
        try {
            directoryService
                .getAll()
                .then(data => {
                    console.log(data);
                    setDirectory(data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Creator</th>
                    <th>Likes</th>
                </tr>
                </thead>
                <tbody>
                {directory.map( codex => {
                    return (
                        <tr
                            key={codex.slug}
                            onClick={() => router.push(`/directory/${codex.slug}`)}
                        >
                            <th>{codex.name}</th>
                            <th>{codex.user.username}</th>
                            <th>{codex.likes}</th>
                        </tr>
                    )}
                )}
                </tbody>
            </table>
            <CodexForm/>
        </>
    )
}