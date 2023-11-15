
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";



const Registration = () => {
    const [userid, setuserId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [passwordConfChanged, setPasswordConfChanged] = useState(false);

    const navigate = useNavigate();

    const isValidate = () => {
        let isProceed = true;
        let errormessage = "Error "
        if(userid === null || userid === ''){
            isProceed = false;
            errormessage += "Username"
        }
        if(password === null || password === '' || password.length < 8){
            isProceed = false;
            errormessage += "Password"
        }
        if(passwordConf !== password){
            isProceed = false;
            errormessage += "Password Mismatch"
        }
        if(!isProceed){
            toast.warning(errormessage)
        }
        return isProceed;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = { userid: userid, password: password };
        if (isValidate()) {
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload)
            }).then((res) => {
                toast.success("Registered Successfully")
                navigate('/login')
            }).catch((error) => {
                toast.error('Failed :' + error.message)
            });
        }
    }

    const renderPError = () => {
        if (passwordConfChanged && passwordConf !== password) {
            return <em>Passwords Doesn't Match</em>
        } return null
    }

    return (
        <>
            <div className="flex flex-col gap-4 max-w-[400px] h-auto w-full mx-auto py-3">
                <form onSubmit={handleSubmit}>
                    <div className="text-xl text-center">
                        <h1>User Registration</h1>
                    </div>
                    <div className="border border-slate-800 mx-1 my-3 grid gap-1 p-3">
                        <div className="rounded-md p-1 flex flex-col justify-between">
                            <label>
                                user name
                            </label>
                            <input type="text"
                                placeholder="kabir.kda"
                                className="border border-slate-800 px-2 py-1"
                                value={userid}
                                onChange={e => setuserId(e.target.value)}
                                />
                        </div>
                        <div className="rounded-md p-1 flex flex-col justify-between">
                            <label>
                                Password
                            </label>
                            <input type="password"
                                placeholder="password"
                                className="border border-slate-800 px-2 py-1"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                
                            />
                        </div>
                        <div className="ounded-md p-1 flex flex-col justify-between">
                            <label >
                                Confirm Password
                            </label>
                            <input type="text"
                                placeholder="confirm password"
                                className="border border-slate-800 px-2 py-1"
                                value={passwordConf}
                                onChange={e => {
                                    setPasswordConf(e.target.value);
                                    setPasswordConfChanged(true)
                                }}
                                
                            />
                            {renderPError()}
                        </div>
                        <div> <input type="radio" /> accept terms and conditions </div>
                    </div>
                    <div className="w-full flex justify-start gap-4 mx-1 my-0">
                        <button type="submit"
                            className="bg-slate-800 text-slate-100 px-3 py-1 ">
                            Register
                        </button>
                        <a className="bg-slate-800 text-slate-100 px-3 py-1">
                            back
                        </a>
                    </div>

                </form>
            </div>
        </>
    );
}

export default Registration;