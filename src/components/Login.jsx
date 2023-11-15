import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const url = 'http://localhost:3000/users'
    const proceedLogin = (e) => {
        e.preventDefault();
        if(validate()){
            // console.log("proceed")
              fetch( 'http://localhost:3000/users'+userName).then((res) => {
                return res.json();
              }).then ((res) => {
                console.log(res);
              }).catch((err) => {
                toast.error("Login failed")
              })
        }
        
    }
    const validate = () => {
        let result = true;
        if(userName === '' || userName === null){
            result = false;
            toast.warning("Please Enter User Name")
        }
        if(password === '' || password === null){
            result = false;
            toast.warning("Please Enter Password")
        } 
        return result;
    }
    return (<>
        <div>
            <div className='flex flex-col gap-4 max-w-[400px] h-auto w-full mx-auto py-3'>
                <form onSubmit={proceedLogin}>
                    <div className="text-xl text-center">
                        <h1>User Login</h1>
                    </div>
                    <div className="border border-slate-800 mx-1 my-3 grid gap-1 p-3">
                        <div className="rounded-md p-1 flex gap-2 flex-col justify-between">
                            <label>
                                user name
                            </label>
                            <input value={userName}
                                onChange={e => setUserName(e.target.value)}
                                className="border border-slate-800 px-2 py-1" />
                        </div>
                        <div className="rounded-md p-1 flex gap-2 mb-2 flex-col justify-between">
                            <label>
                                Password
                            </label>
                            <input type="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="border border-slate-800 px-2 py-1"
                            />
                        </div>
                        <div className="flex justify-left mx-1 my-1 text-slate-100 gap-2">
                            <button className="bg-slate-800  rounded-md px-4 py-1 ">Login</button>
                            <Link to="/register">
                                <button className="bg-slate-800  rounded-md px-4 py-1 ">
                                    Registration
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button>

                        </button>
                    </div>
                </form>
            </div>

        </div>
    </>);
}

export default Login; <>Login</>