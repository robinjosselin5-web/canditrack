import { Link } from 'react-router-dom'

export function Login() {
  return (
    <section className="rounded-xl border border-white/10 bg-white p-6 text-slate-950 shadow-xl">
      <p className="text-sm font-medium text-slate-500">CandiTrack</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Connexion
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Accede a ton espace de suivi de candidatures.
      </p>

      <form className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-slate-950"
            type="email"
            placeholder="toi@example.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Mot de passe
          </span>
          <input
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-slate-950"
            type="password"
            placeholder="********"
          />
        </label>

        <Link
          to="/dashboard"
          className="flex w-full items-center justify-center rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Se connecter
        </Link>
      </form>
    </section>
  )
}
