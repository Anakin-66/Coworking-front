import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdminCoworkingUpdate() {
    // Hook useParams pour faire le lien avec un coworking id
    const { id } = useParams();
    // Hook useState pour récupérer les coworkings
    const [coworking, setCoworking] = useState(null)
    // Hook useState pour display le message
    const [message, setMessage] = useState(null);

    // Hook useEffect pour que le composant ne boucle pas à l'infini
    useEffect(() => {
        (async () => {
            const coworkingResponse = await fetch("http://localhost:3002/api/coworkings/" + id);
            const coworkingResponseData = await coworkingResponse.json();
            setCoworking(coworkingResponseData.data);
        })();
    }, []);

    // bouton du update coworking
    const handleUpdateCoworking = async (event) => {
        // Pour éviter le rafraichissement de base des formulaires
        event.preventDefault();

        // On récupère les champs du formulaire
        const name = event.target.name.value;
        const priceByMonth = event.target.priceByMonth.value;
        const priceByDay = event.target.priceByDay.value;
        const priceByHour = event.target.priceByHour.value;
        const addressNumber = event.target.addressNumber.value;
        const addressStreet = event.target.addressStreet.value;
        const addressCity = event.target.addressCity.value;
        const addressPostcode = event.target.addressPostcode.value;
        const superficy = event.target.superficy.value;
        const capacity = event.target.capacity.value;

         // Déclaration d'une variable d'objet coworkingToCreate qui correspond au model de l'api
        const coworkingUpdateData = {
            name: name,
            price: {
                month: priceByMonth,
                day: priceByDay,
                hour: priceByHour,
            },
            address: {
                number: addressNumber,
                street: addressStreet,
                city: addressCity,
                postCode: addressPostcode,
            },
            superficy: superficy,
            capacity: capacity,
        };

        // Conversion en json
        const coworkingUpdateDataJson = JSON.stringify(coworkingUpdateData);
        // récupération du token
        const token = localStorage.getItem("jwt");
        // fetching des coworkings + leur id respectif
        const updateCoworkingResponse = await fetch("http://localhost:3002/api/coworkings/" + id, {
            // La méthode est un "PUT"
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            // Récupération du contenu du body
            body: coworkingUpdateDataJson
        })

        // Affichage du message pour confirmer que c'est réussi ou non
        if (updateCoworkingResponse.status === 201) {
            setMessage('Mise à jour OK')
        } else {
            setMessage('Erreur')
        }
    }

    return (
        <div>
            {message && <p>{message}</p>}
            {coworking && (
                <form onSubmit={handleUpdateCoworking}>
                    <div>
                        <label>
                            Nom
                            <input type="text" name="name" defaultValue={coworking.name} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Prix par mois
                            <input type="number" name="priceByMonth" defaultValue={coworking.price.month} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Prix par jour
                            <input type="number" name="priceByDay" defaultValue={coworking.price.day} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Prix par heure
                            <input type="number" name="priceByHour" defaultValue={coworking.price.hour} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Adresse : Numéro
                            <input type="text" name="addressNumber" defaultValue={coworking.address.number} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Adresse : Rue
                            <input type="text" name="addressStreet" defaultValue={coworking.address.street} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Adresse : Ville
                            <input type="text" name="addressCity" defaultValue={coworking.address.city} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Adresse : Postcode
                            <input type="text" name="addressPostcode" defaultValue={coworking.address.postCode} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Superficie
                            <input type="number" name="superficy" defaultValue={coworking.superficy} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Capacité
                            <input type="number" name="capacity" defaultValue={coworking.capacity} />
                        </label>
                    </div>

                    <input type="submit" />
                </form>
            )}
        </div>
    )
}

export default AdminCoworkingUpdate