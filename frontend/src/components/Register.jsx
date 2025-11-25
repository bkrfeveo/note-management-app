import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../services/authServices";


const Register = ()  => {
    const [datasRegister, setDatasRegister] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [messageError, setMessageError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit (e) {
        e.preventDefault();
        try{
            if (!datasRegister.name.trim() ||
                !datasRegister.email.trim() || 
                !password1.trim() || !password2.trim()
            ) {
                setMessageError("Veuillez remplir tous les champs");
            } else {
                if (password1 === password2) {
                    setDatasRegister({...datasRegister, password: password1})
                    setLoading(true);
                    await registerService(datasRegister.name, datasRegister.email, datasRegister.password);
                    navigate('/');
                    setDatasRegister({
                        name: "",
                        email: "",
                        password: ""
                    });
                } else {
                    console.log("Les mots de passe entrés ne sont pas identiques");
                    setMessageError("Les mots de passe entrés ne sont pas identiques");
                }
            };
        } catch (err) {
            console.error("Erreur cote client : ", err)
        } finally {
            setLoading(false);
        }
    }
    
    return(
        <div className="w-full flex flex-col gap-4 items-center my-16 justify-center">
            <form className="lg:w-1/2 box-shadow-css shadow-blue-400 rounded-xl mb-20 p-4 flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <h2 className="text-gray-600 text-center font-bold text-3xl">Inscription</h2>
                    <p className="text-gray-700 px-2">Creer un compte et commencer à gérer vos tâches</p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex sm:flex-row flex-col gap-2">
                        <div className="sm:w-1/2 w-full flex flex-col gap-2 justify-start">
                            <label className=" pl-2 text-left font-semibold text-gray-500" htmlFor="name">Nom complet *</label>
                            <input 
                                className="bg-transparent p-2 rounded-lg border border-gray-500 no-underline" 
                                value={datasRegister.name}
                                onChange={(e) => setDatasRegister({...datasRegister, name: e.target.value})}
                                id="name"
                                type="text"
                                placeholder="" 
                            />
                        </div>
                        {/* <div className="flex flex-col gap-2 justify-start">
                            <label className="pl-2 text-left font-semibold text-gray-500" htmlFor="lastName">Nom *</label>
                            <input 
                                className="bg-transparent p-2 rounded-lg border border-gray-500 no-underline" 
                                value={datasRegister.lastName}
                                onChange={(e) => setDatasRegister({...datasRegister, lastName: e.target.value})}
                                id="lastName"
                                type="text"
                                placeholder="" 
                            />
                        </div> */}
                        <div className="sm:w-1/2 w-full flex flex-col gap-2 justify-start">
                            <label className="pl-2 text-left font-semibold text-gray-500" htmlFor="email">Email *</label>
                            <input
                                className="bg-transparent p-2 rounded-lg border border-gray-500 no-underline"
                                value={datasRegister.email}
                                onChange={(e) => setDatasRegister({...datasRegister, email: e.target.value})}
                                id="email"
                                type="email"
                                placeholder="monemail@gmail.com"
                                />
                        </div>
                    </div>
                        {/* <div className="flex flex-col gap-2 justify-start">
                            <label className="pl-2 text-left font-semibold text-gray-500" htmlFor="email">nom utilisateur *</label>
                            <input
                                className="bg-transparent p-2 rounded-lg border border-gray-500 no-underline"
                                value={datasRegister.username}
                                onChange={(e) => setDatasRegister({...datasRegister, username: e.target.value})}
                                id="email"
                                type="text"
                                placeholder="Ex: Abou, fadel..."
                            />
                        </div> */}
                    <div className="flex flex-col gap-2 justify-start">
                        <label className="pl-2 text-left font-semibold text-gray-500" htmlFor="password1">Entrer un mot de passe *</label>
                        <input 
                            className="bg-transparent p-2 rounded-lg border border-gray-500 no-underline" 
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            id="password1" 
                            type="password" 
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-start">
                        <label className="pl-2 text-left font-semibold text-gray-500" htmlFor="password2">Confirmer le mot de passe *</label>
                        <input 
                            className="bg-transparent p-2 rounded-lg border border-gray-500 no-underline" 
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            id="password2" 
                            type="password" 
                        />
                    </div>
                    {messageError && <p className="text-red-400 text-base text-left">{messageError}</p>}
                </div>
                <button  
                    onClick={handleSubmit} 
                    className={`${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} bg-blue-500 hover:bg-blue-600 duration-200 active:bg-blue-600 text-white font-medium min-w-48 w-full py-2 px-6 rounded-[10px]`} 
                    type="submit"
                >
                    {!loading ? "S'inscrire" : "Patientez..."}
                </button>
                <p className="text-center text-sm">
                    <span>Déjà un compte ? </span>
                    <a className="font-semibold text-blue-500" href="/connexion">connectez-vous</a>
                </p>
            </form>
        </div>
    )
};

export default Register;