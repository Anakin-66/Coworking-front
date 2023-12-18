import { useEffect, useState } from "react";
import Footer from "../../components/guest/Footer"
import Header from "../../components/guest/Header"
import Nav from "../../components/guest/Nav"
import { Link } from "react-router-dom";

function CoworkingPage() {

    const [coworkings, setCoworkings] = useState(null);

    useEffect(() => {

        (async () => {
            const reponse = await fetch(`http://localhost:3002/api/coworkings/`)
            const data = await reponse.json();
            setCoworkings(data)
            console.log(data);
        })()

    }, [])



    return (
        <>
            <Header />
            <Nav />
            <main>
                {/* Est-ce que cocktail contient quelque chose ? */}
                {coworkings ? (
                    <>
                        {/* Je fais un array map pour récupérer les cocktails grâce à la variable cocktails de useState */}
                        {coworkings.map((coworking) => {
                            return (
                                <article>
                                    <h2> {coworking.name} </h2>
                                    <Link to={`/coworking/details/${coworking.id}`}>Voir le coworking</Link>
                                </article>
                            )

                        })}
                    </>

                ) : (

                    <p>Cocktails en cours de chargement</p>

                )}
            </main>
            <Footer />
        </>
    )
}

export default CoworkingPage