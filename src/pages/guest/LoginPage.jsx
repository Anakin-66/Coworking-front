function LoginPage() {

    //  la fonction est asynchronne car il y a un fetch d'API
    const handleLogin = async (event) => {
        event.preventDefault();

        // On récupère le username et password des inputs avec un event.target
        const username = event.target.username.value;
        const password = event.target.password.value;

        console.log(username, password);

        // Déclaration d'une variable d'objet loginData qui correspond au model de l'api
        const loginData = {
            username,
            password,
        }

        // On récupère le loginData qui sera traduit en JSON
        const loginDataJson = JSON.stringify(loginData)

        // Déclaration d'une variable avec un fetch de l'api pour récupérer le login
        const loginResponse = await fetch("http://localhost:3002/api/users/login", {
            // La méthode login est un POST
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Récupération du contenu du body
            body: loginDataJson,
        })

        // la réponse de l'api est récupéré et envoyée vers le front en json
        const loginResponseData = await loginResponse.json();
        // Récupération du Token
        const token = loginResponseData.data;

        if (token) {
            localStorage.setItem("jwt", token)
        }

    };


    return (
        <>
            <p>Login page</p>
            <div>
                <form onSubmit={handleLogin}>
                    <label>
                        username
                        <input type="text" name="username" />
                    </label>
                    <label>
                        password
                        <input type="text" name="password" />
                    </label>
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}

export default LoginPage