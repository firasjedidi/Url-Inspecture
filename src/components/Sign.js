import React,{useState} from 'react'
import api from '@/utils/api';
import { useRouter } from 'next/router';
const Sign = () => {
    const [info ,setInfo] = useState({email:"",password:""});
    const router = useRouter()
    const handelChange = (event) => {
        const {name,value} = event.target;
        setInfo(prev =>({...prev,[name]:value}))
    };
    const handelAuth = async() => {
        try {
            const {data} = await api.post('/login',info,{withCredentials:true});
            if (data.msg ==="The user is authed") router.push('/test') && console.log(data.msg);;
        } catch (error) {
            console.log(error);
        } 
    };
    const disabled = info.email && info.password === "" && info.password.length < 8
  return (
    <section className="h-screen mt-20">
        <div className="px-6 h-full text-gray-800">
            <div
                className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
            >
                <div
                    className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                >
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="w-full"
                        alt="Sample image"
                    />
                </div>
                <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                    <form>
                        <div className='flex justify-center m-1 '>
                            <h1 className='text-3xl text-[#287CE4] '>Welcome To Url-Inspecter</h1>
                        </div>
                        <div
                            className="flex items-center my-10 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        />
                        <div className="mb-6">
                            <input
                                type="email"
                                name='email'
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Email address"
                                onChange={handelChange}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <input
                                type="password"
                                name='password'
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Password"
                                onChange={handelChange}
                                required
                            />
                        </div>
                        <div className="text-center lg:text-left mb-5">
                            <button
                                type="button"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={handelAuth}
                                disabled={disabled}
                            >
                                Login
                            </button>
                            {/* <p className="text-sm font-semibold mt-2 pt-1 ">
                                Don&apos;t have an account?
                                <a
                                    href="#!"
                                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                    >Register
                               </a>
                            </p> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

  );
}

export default Sign;