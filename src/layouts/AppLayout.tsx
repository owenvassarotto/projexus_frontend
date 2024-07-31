import { Link, Navigate, Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { Toaster } from "react-hot-toast"
import { useAuth } from "@/hooks/useAuth"
import Spinner from "@/components/Spinner"

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()
    if(isLoading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>
    if(isError) return <Navigate to={'/auth/login'} />

  if(data) return (
   <>
    <header
        className="bg-gray-800 p-5"
    >
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-6 lg:flex-row justify-between items-center">
            <Link to="/">
                <Logo />
            </Link>

            <NavMenu 
                name={data.name}
            />
        </div>
    </header>

    <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
    </section>

    <footer className="py-4 bg-gray-800 text-white absolute bottom-0 w-full">
        <p className="text-center font-semibold">
            &copy; {new Date().getFullYear()} Projexus. All rights reserved.
        </p>
    </footer>


    <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
            duration: 5000,
        }}
    />
   </>
  )
}
