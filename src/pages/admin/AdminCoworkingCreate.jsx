import { useState } from "react"

function AdminCoworkingCreate() {
    // hook useState pour  gérer les messages
    const [message, setMessage] = useState(null);
    // Fonction asynchrone car y'a un fetch
    const handleCreateCoworking = async (event) => {
        // Pour éviter le comportement par défaut du formulaire
        event.preventDefault();
        // On récupère les champs des formulaires
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
        const coworkingToCreate = {
            name: name,
            price: {
                month: priceByMonth,
                day: priceByDay,
                hour: priceByHour
            },
            address: {
                number: addressNumber,
                street: addressStreet,
                city: addressCity,
                postCode: addressPostcode,
            },
            superficy: superficy,
            capacity: capacity
        }
        console.log(coworkingToCreate);
        // On récupère le coworkingToCreate qui sera traduit en JSON
        const coworkingToCreateJson = JSON.stringify(coworkingToCreate)
        // On récupère le token
        const token = localStorage.getItem("jwt")
         // Déclaration d'une variable avec un fetch de l'api pour récupérer les coworkings
        const createCoworkingReponse = await fetch("http://localhost:3002/api/coworkings/", {
            // La méthode du create est un POST
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            // Récupération du contenu du body
            body: coworkingToCreateJson
        });

        // Boolean pour gérer les messages de status
        if (createCoworkingReponse.status === 201) {
            setMessage(`Coworking crée`)
        } else {
            setMessage(`Erreur ! `)
        }
    }


    return (
        <>
            {message && <p>{message}</p>}
            <form onSubmit={handleCreateCoworking}>
                <div>
                    <label>
                        Nom
                        <input type="text" name="name" />
                    </label>
                </div>
                <div>
                    <label>
                        Prix par mois
                        <input type="number" name="priceByMonth" />
                    </label>
                </div>
                <div>
                    <label>
                        Prix par jour
                        <input type="number" name="priceByDay" />
                    </label>
                </div>
                <div>
                    <label>
                        Prix par heure
                        <input type="number" name="priceByHour" />
                    </label>
                </div>
                <div>
                    <label>
                        Adresse : Numéro
                        <input type="text" name="addressNumber" />
                    </label>
                </div>
                <div>
                    <label>
                        Adresse : Rue
                        <input type="text" name="addressStreet" />
                    </label>
                </div>
                <div>
                    <label>
                        Adresse : Ville
                        <input type="text" name="addressCity" />
                    </label>
                </div>
                <div>
                    <label>
                        Adresse : Postcode
                        <input type="text" name="addressPostcode" />
                    </label>
                </div>
                <div>
                    <label>
                        Superficie
                        <input type="number" name="superficy" />
                    </label>
                </div>
                <div>
                    <label>
                        Capacité
                        <input type="number" name="capacity" />
                    </label>
                </div>

                <input type="submit" />
            </form>
        </>
    )
}

export default AdminCoworkingCreate