import { useLocation, useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RouteList } from "@/components/pages/general/paths"
import { Compass, Home, ArrowLeft, Search } from "lucide-react"

const NotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    )
  }, [location.pathname])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-rose-50 dark:from-blue-950 dark:via-purple-950 dark:to-rose-950">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-rose-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center px-6">
        <div className="w-full">
          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/60">
            {/* Glow border */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 dark:ring-white/5" />

            <div className="grid items-center gap-8 md:grid-cols-2">
              {/* Left: Message */}
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-black/5 backdrop-blur dark:bg-zinc-800/50 dark:text-zinc-300 dark:ring-white/10">
                  <Compass className="h-3.5 w-3.5" />
                  Lost in navigation
                </div>

                <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl">
                  404
                </h1>
                <p className="mt-3 text-xl font-semibold text-slate-800 dark:text-zinc-100">
                  We couldn't find that page.
                </p>
                <p className="mt-2 text-slate-600 dark:text-zinc-300">
                  The path <span className="font-mono text-slate-800 dark:text-zinc-100">{location.pathname}</span> may be moved or never existed. Try exploring popular sections or go back.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={() => navigate(-1)} variant="secondary" className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Go Back
                  </Button>
                  <Link to={RouteList.SERVICES}>
                    <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                      <Search className="h-4 w-4" /> Explore Services
                    </Button>
                  </Link>
                  <Link to={RouteList.DASHBOARD}>
                    <Button variant="outline" className="gap-2">
                      <Home className="h-4 w-4" /> Go to Dashboard
                    </Button>
                  </Link>
                </div>

                <div className="mt-4 text-sm text-slate-500 dark:text-zinc-400">
                  Or return to the homepage and start fresh.
                </div>
              </div>

              {/* Right: Illustration */}
              <div className="relative mx-auto hidden h-64 w-full max-w-sm md:block">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-rose-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="h-48 w-48 text-blue-400/70 dark:text-purple-300/70">
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#f43f5e" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M50,20 C70,10 130,10 150,20 C170,30 180,70 160,100 C140,130 60,140 40,110 C20,80 30,30 50,20 Z"
                      fill="url(#grad)"
                      opacity="0.4"
                    />
                    <circle cx="80" cy="80" r="8" fill="#fff" opacity="0.9" />
                    <circle cx="120" cy="60" r="6" fill="#fff" opacity="0.7" />
                    <circle cx="130" cy="100" r="5" fill="#fff" opacity="0.6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Helpful links */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Link to={RouteList.SERVICES} className="group rounded-lg border border-slate-200/60 bg-white/70 p-4 ring-1 ring-black/5 transition hover:shadow-md dark:border-white/10 dark:bg-zinc-900/60 dark:ring-white/10">
                <div className="text-sm font-semibold text-slate-800 group-hover:underline dark:text-zinc-100">Browse Services</div>
                <div className="text-sm text-slate-500 dark:text-zinc-400">Find providers across categories</div>
              </Link>
              <Link to={RouteList.AUTH} className="group rounded-lg border border-slate-200/60 bg-white/70 p-4 ring-1 ring-black/5 transition hover:shadow-md dark:border-white/10 dark:bg-zinc-900/60 dark:ring-white/10">
                <div className="text-sm font-semibold text-slate-800 group-hover:underline dark:text-zinc-100">Sign In</div>
                <div className="text-sm text-slate-500 dark:text-zinc-400">Access your account instantly</div>
              </Link>
              <Link to={RouteList.B_TO_B} className="group rounded-lg border border-slate-200/60 bg-white/70 p-4 ring-1 ring-black/5 transition hover:shadow-md dark:border-white/10 dark:bg-zinc-900/60 dark:ring-white/10">
                <div className="text-sm font-semibold text-slate-800 group-hover:underline dark:text-zinc-100">Become a Provider</div>
                <div className="text-sm text-slate-500 dark:text-zinc-400">Register your business on Kustom</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound