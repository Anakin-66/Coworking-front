import { useNavigate } from "react-router-dom"
import HeaderAdmin from "../../components/admin/HeaderAdmin"
import { useEffect } from "react";

function DashBoardPage() {
    // Je récupère le hook useNavigate qui va me permettre de rediriger l'utilisateur ou l'admin si les conditions ne sont pas réunies
    const navigate = useNavigate();
    // Je déclare le useEffet au chargement de mon composant
    useEffect(() => {
        // je récupère le token en local storage
        const token = localStorage.getItem("jwt")
        // Je déclare ma condition, si il n'y a pas de token alors il y aura une redirection sur la page /login
        if (!token) {
            navigate("/login")
        }
    });

    return (
        <>
            <HeaderAdmin />
            <p>La dashboard page</p>
        </>
    )
}

export default DashBoardPage