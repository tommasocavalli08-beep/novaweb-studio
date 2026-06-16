import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  LayoutTemplate,
  Smartphone,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function App() {
  const [form, setForm] = useState({
    project: "Landing Page",
    pages: "1-3",
    priority: "Standard",
    extras: [],
    nome: "",
    cognome: "",
    azienda: "",
    email: "",
    telefono: "",
    messaggio: "",
  });

  const extrasList = [
    { name: "Blog", price: 250 },
    { name: "Area Riservata", price: 500 },
    { name: "SEO Avanzata", price: 300 },
    { name: "Multilingua", price: 400 },
    { name: "Pagamenti Online", price: 600 },
    { name: "Prenotazioni", price: 450 },
  ];

  const estimate = useMemo(() => {
    const base = {
      "Landing Page": 700,
      "Sito Aziendale": 1500,
      "E-commerce": 2800,
      "Web App": 4500,
      "Gestionale": 6000,
    };

    const pages = {
      "1-3": 0,
      "4-8": 400,
      "9-15": 900,
      "15+": 1500,
    };

    const priority = {
      Standard: 0,
      Prioritaria: 300,
      Urgente: 800,
    };

    let total = base[form.project] + pages[form.pages] + priority[form.priority];

    form.extras.forEach((e) => {
      const found = extrasList.find((x) => x.name === e);
      if (found) total += found.price;
    });

    return total;
  }, [form]);

  const toggleExtra = (extra) => {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }));
  };

  const submitQuote = () => {
    const payload = {
      ...form,
      estimate,
    };

    console.log(payload);

    alert(
      "Preventivo inviato. Integra qui Resend o EmailJS per l'invio automatico."
    );
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold max-w-4xl"
          >
            Realizzo siti web che convertono visitatori in clienti.
          </motion.h1>

          <p className="text-zinc-400 text-xl mt-6 max-w-2xl">
            Landing page, siti aziendali, e-commerce e web app moderne.
          </p>

          <div className="flex gap-4 mt-10">
            <a
              href="#preventivo"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500"
            >
              Calcola Preventivo
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10">Cosa posso costruire</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Landing Page", LayoutTemplate],
            ["Siti Aziendali", Globe],
            ["E-commerce", ShoppingCart],
            ["Web App", Smartphone],
            ["Performance", Zap],
            ["SEO", CheckCircle],
          ].map(([title, Icon]) => (
            <motion.div
              whileHover={{ y: -8 }}
              key={title}
              className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900"
            >
              <Icon className="mb-4" />
              <h3 className="font-semibold text-xl">{title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10">Il mio processo</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Analisi",
            "Progettazione",
            "Design UI/UX",
            "Sviluppo",
            "Testing",
            "Consegna",
          ].map((step, i) => (
            <div key={step} className="bg-zinc-900 p-6 rounded-2xl">
              <div className="text-blue-400 text-3xl mb-3">0{i + 1}</div>
              {step}
            </div>
          ))}
        </div>
      </section>

      <section id="preventivo" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10">
          Preventivo Automatico
        </h2>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <select
              className="w-full bg-zinc-900 p-4 rounded-xl"
              value={form.project}
              onChange={(e) =>
                setForm({ ...form, project: e.target.value })
              }
            >
              <option>Landing Page</option>
              <option>Sito Aziendale</option>
              <option>E-commerce</option>
              <option>Web App</option>
              <option>Gestionale</option>
            </select>

            <select
              className="w-full bg-zinc-900 p-4 rounded-xl"
              value={form.pages}
              onChange={(e) =>
                setForm({ ...form, pages: e.target.value })
              }
            >
              <option>1-3</option>
              <option>4-8</option>
              <option>9-15</option>
              <option>15+</option>
            </select>

            <select
              className="w-full bg-zinc-900 p-4 rounded-xl"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option>Standard</option>
              <option>Prioritaria</option>
              <option>Urgente</option>
            </select>

            <div className="grid grid-cols-2 gap-3">
              {extrasList.map((extra) => (
                <button
                  key={extra.name}
                  onClick={() => toggleExtra(extra.name)}
                  className={`p-3 rounded-xl border ${form.extras.includes(extra.name)
                      ? "bg-blue-600 border-blue-600"
                      : "border-zinc-700"
                    }`}
                >
                  {extra.name}
                </button>
              ))}
            </div>

            <input placeholder="Nome" className="w-full bg-zinc-900 p-4 rounded-xl"
              onChange={(e) => setForm({ ...form, nome: e.target.value })} />
            <input placeholder="Cognome" className="w-full bg-zinc-900 p-4 rounded-xl"
              onChange={(e) => setForm({ ...form, cognome: e.target.value })} />
            <input placeholder="Azienda" className="w-full bg-zinc-900 p-4 rounded-xl"
              onChange={(e) => setForm({ ...form, azienda: e.target.value })} />
            <input placeholder="Email" className="w-full bg-zinc-900 p-4 rounded-xl"
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Telefono" className="w-full bg-zinc-900 p-4 rounded-xl"
              onChange={(e) => setForm({ ...form, telefono: e.target.value })} />

            <textarea
              placeholder="Descrivi il progetto"
              className="w-full bg-zinc-900 p-4 rounded-xl h-40"
              onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
            />

            <button
              onClick={submitQuote}
              className="bg-blue-600 px-6 py-4 rounded-xl flex items-center gap-2"
            >
              Invia Preventivo <ArrowRight size={18} />
            </button>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">
            <div className="text-zinc-400">Preventivo stimato</div>
            <div className="text-6xl font-bold mt-4">
              € {estimate.toLocaleString("it-IT")}
            </div>

            <div className="mt-10 space-y-3">
              <p>Progetto: {form.project}</p>
              <p>Pagine: {form.pages}</p>
              <p>Priorità: {form.priority}</p>
              <p>Extra: {form.extras.join(", ") || "Nessuno"}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 text-zinc-400">
          © 2026 Web Developer • React • Tailwind • Framer Motion
        </div>
      </footer>
    </div>
  );
}
