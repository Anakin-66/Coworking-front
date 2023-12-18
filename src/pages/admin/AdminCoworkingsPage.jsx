import { useEffect, useState } from "react";

function AdminCoworkingsPage() {
    const [coworkings, setCoworkings] = useState(null);

    // Ce useEffect et fetch d'api sont utilisés pour le premier rendu du composant
    useEffect(() => {
        (async () => {
            const coworkingsResponse = await fetch("http://localhost:3002/api/coworkings")
            const coworkingsResponseData = await coworkingsResponse.json();
            setCoworkings(coworkingsResponseData)
        })();
    }, []);

    //  la fonction est asynchronne car il y a un fetch d'API
    const handleDeleteCoworking = async (event, coworkingId) => {
        // Seulement possible si un token a déjà été récupéré
        const token = localStorage.getItem("jwt")
        console.log(token);
        // Déclaration d'une variable avec un fetch de l'api pour récupérer le delete + l'id du coworking
        await fetch("http://localhost:3002/api/coworkings/" + coworkingId, {
            // La méthode "DELETE" est un delete
            method: "DELETE",
            // Seulement quelqu'un qui a un token peut supprimer les coworkings (On l'a pas encore restreint au superadmin si je dis pas de bêtise)
            headers: { Authorization: "Bearer " + token }
        });
        // Second fetch d'api pour mettre a jour suite à une supression d'un coworking
        const coworkingsReponse = await fetch('http://localhost:3002/api/coworkings');
        const coworkingResponseData = await coworkingsReponse.json();
        setCoworkings(coworkingResponseData);
    }

    return (
        <>
            <h1>Liste des coworkings : </h1>

            {coworkings ? (
                <>
                    {coworkings.map((coworking) => {
                        return (
                            <article>
                                <h2>{coworking.name}</h2>
                                <button onClick={(event) => handleDeleteCoworking(event, coworking.id)}>Supprimer</button>
                            </article>
                        );
                    })}
                </>
            ) : (
                <p>En cours de chargement</p>
            )}
        </>
    )
}

export default AdminCoworkingsPage