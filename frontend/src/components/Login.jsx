import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authServices";


const Login = ()  => {

    const [datasLogin, setDatasLogin] = useState({
        email: "",
        password: ""
    });
    const [messageError, setMessageError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate  = useNavigate();
    
    
    async function handleSubmit (e) {
        e.preventDefault();
        try{
            if (datasLogin.email.trim() || datasLogin.password.trim()) {
                setLoading(true);
                await loginService(datasLogin.email, datasLogin.password);
                navigate('/');
                setDatasLogin({
                    email: "",
                    password: ""
                });
            } else {
                setMessageError("Veuillez remplir tous les champs");
            };
        } catch (err) {
            console.error("Erreur cote client : ", err)
        } finally {
            setLoading(false);
        }
    }
    

    return(
        <div className="w-full flex flex-col gap-4 items-center justify-center h-screen">
            <form className="md:w-[400px] box-shadow-css shadow-blue-400 rounded-xl p-4 w-full flex flex-col gap-8">
                <h2 className="text-gray-600 text-center font-bold text-2xl">Connexion</h2>
                <p className="text-gray-700 text-center px-2">Connectez-vous pour avoir accès à vos notes</p>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2 justify-start">
                        <label className="text-left font-semibold text-gray-500" htmlFor="email">Votre email *</label>
                        <input 
                            className="bg-transparent p-2 rounded-lg border border-gray-500 no-underline" 
                            id="email"
                            type="email"
                            onChange={(e) => setDatasLogin({...datasLogin, email: e.target.value})}
                            placeholder="Email" 
                            />
                    </div>
                     <div className="flex flex-col gap-2 justify-start">
                        <label className="text-left font-semibold text-gray-500" htmlFor="password">Votre mot de passe *</label>
                        <input 
                            className="bg-transparent p-2 rounded-lg border border-gray-500 no-underline" 
                            id="password" 
                            placeholder="••••••••••••••••" 
                            type="password"
                            value={datasLogin.password}
                            onChange={(e) => setDatasLogin({...datasLogin, password: e.target.value})}
                        />
                    </div>
                    {messageError &&
                    <p className="text-red-400 text-base text-left font-medium">Veuillez remplir tous les champs</p>}
                </div>
                <button 
                    className={`${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} bg-blue-500 hover:bg-blue-600 duration-200 active:bg-blue-600 text-white font-medium min-w-48 w-full py-2 px-6 rounded-[10px]`} 
                    type="submit" 
                    onClick={handleSubmit}
                >
                    {loading ? "Chargement..." : "Se connecter"}
                </button>
                <p className="text-center text-sm">
                    <span>Pas encore de compte ? </span>
                    <a className="font-semibold text-blue-500" href="/inscription">créer un compte</a>
                </p>
            </form>
        </div>
    )
};

export default Login;