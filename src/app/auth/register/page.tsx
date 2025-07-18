import Link from "next/link"
import { Eye } from "lucide-react"

export default function register () {
    return (
        <form className="border p-4 border-gray-300/20 rounded-xl shadow-md shadow-gray-300/25 max-w-128 min-w-88 min-h-auto gap-4 flex flex-col m-auto">
            <h1 className="w-full text-center text-3xl inline-block h-auto">Register</h1>
            <div>
                <p className="text-base mb-2 ml-2">Name</p>
                <input type="text" name="name" required autoComplete="off" className="w-full border border-gray-300/30 rounded-lg px-2 py-1 text-sm" />
            </div>
            <div>
                <p className="text-base mb-2 ml-2">Email</p>
                <input type="email" name="email" required autoComplete="off" className="w-full border border-gray-300/30 rounded-lg px-2 py-1 text-sm" />
            </div>
            <div>
                <p className="text-base mb-2 ml-2">Password</p>
                <input type="password" name="password" required autoComplete="off" className="w-full border border-gray-300/30 rounded-lg px-2 py-1 text-sm" />
            </div>
            <div className="flex w-full">
                <Link href="/auth/login">
                <span className="text-sm ml-2 hover:cursor-pointer hover:text-gray-300/70">
                    Ya tiene cuenta?
                </span>
                </Link>
            </div>
            <button id="form-button" className="bg-gray-200 w-full h-auto text-black items-center py-1 rounded-lg">Register</button>
        </form>
    )
}