"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Image from "next/image"; 
import TextType from "@/components/TextType";
import LogoLoop from "@/components/LogoLoop";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Search,
  Rocket,
  CheckCircle
} from "lucide-react";

const serviceLogos = [
  {
    node: <Globe size={40} />,
    title: "Siti Vetrina",
    desc: "Presenta la tua attività online."
  },
  {
    node: <ShoppingCart size={40} />,
    title: "E-Commerce",
    desc: "Vendi online con facilità."
  },
  {
    node: <Search size={40} />,
    title: "SEO",
    desc: "Posizionamento sui motori di ricerca."
  },
  {
    node: <Smartphone size={40} />,
    title: "Responsive",
    desc: "Perfetti su smartphone."
  },
  {
    node: <Rocket size={40} />,
    title: "Performance",
    desc: "Velocità e ottimizzazione."
  },
  {
    node: <CheckCircle size={40} />,
    title: "Supporto",
    desc: "Assistenza continua."
  }
];

export default function NovaWebStudio() {
  const [activeLink, setActiveLink] = useState(0);
  const [sendStatus, setSendStatus] = useState(null);
  const [openUrgency, setOpenUrgency] = useState(false);
  const urgencyRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (urgencyRef.current && !urgencyRef.current.contains(e.target)) {
        setOpenUrgency(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    {
      label: "Servizi",
      href: "#servizi"
    },
    {
      label: "Preventivo",
      href: "#preventivo"
    },
    {
      label: "Contatti",
      href: "#contatti"
    }
  ];

  const [formData, setFormData] = useState({
    package: "starter",
    pages: 5,
    ecommerce: false,
    seo: false,
    booking: false,
    blog: false,
    logo: false,

    urgency: "standard",

    name: "",
    email: "",
    phone: "",
    company: "",
    notes: ""
  });

  const price = useMemo(() => {
    let total = 0;

    // PACKAGES
    if (formData.package === "starter") total += 400;
    if (formData.package === "business") total += 700;
    if (formData.package === "premium") total += 1500;

    // extras
    if (formData.ecommerce) total += 800;
    if (formData.seo) total += 300;
    if (formData.booking) total += 400;
    if (formData.blog) total += 200;
    if (formData.logo) total += 250;

    // urgency
    if (formData.urgency === "veloce") total += 100;
    if (formData.urgency === "urgente") total += 300;

    return total;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {

      // Mail al cliente
      await emailjs.send(
        "service_s2jmler",
        "template_928fask",
        {
          client_name: formData.name,
          client_email: formData.email,
          phone: formData.phone,
          company: formData.company,
          notes: formData.notes,
          site_type: formData.package,
          pages: formData.pages,
          urgency: formData.urgency,
          ecommerce: formData.ecommerce ? "Si" : "No",
          seo: formData.seo ? "Si" : "No",
          booking: formData.booking ? "Si" : "No",
          blog: formData.blog ? "Si" : "No",
          logo: formData.logo ? "Si" : "No",
          total: `${price}€`
        },
        "Q2pHIOlTf25yMEz_B"
      );

      // Mail a te
      await emailjs.send(
        "service_s2jmler",
        "template_ty076rw",
        {
          client_name: formData.name,
          client_email: formData.email,
          phone: formData.phone,
          company: formData.company,
          notes: formData.notes,
          site_type: formData.package,
          pages: formData.pages,
          urgency: formData.urgency,
          total: `${price}€`
        },
        "Q2pHIOlTf25yMEz_B"
      );

      setSendStatus("success");

    } catch (err) {
      console.log(err);
      setSendStatus("error");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">

      {/* NAVBAR */}

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-2">
            <Image
              src="/Logo-scritta-vet.png"
              alt="NovaWeb Studio"
              width={200}
              height={200}
              priority
              className="
                opacity-100
              "
            />
          </div>

          <div
            className="
    hidden md:flex
    items-center
    gap-2
    bg-white/5
    border border-white/10
    backdrop-blur-xl
    rounded-full
    p-2
  "
          >
            {links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setActiveLink(index)}
                className="
        relative
        px-6
        py-2
        text-sm
        font-medium
      "
              >
                {activeLink === index && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="
            absolute
            inset-0
            rounded-full
            bg-gradient-to-r
            from-blue-700
            via-blue-600
            to-blue-500
            shadow-[0_0_30px_rgba(59,130,246,0.6)]
          "
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30
                    }}
                  />
                )}

                <span className="relative z-10 text-white">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">

        {/* Glow sfondo */}
        <div className="absolute w-[800px] h-[800px] rounded-full bg-blue-600 blur-[220px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-6 z-10">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Logo */}
            <div className="flex justify-center">

              <Image
                src="/Logo.png"
                alt="NovaWeb Studio"
                width={1800}
                height={1800}
                priority
                className="drop-shadow-[0_0_50px_rgba(37,99,235,0.6)]"
              />

            </div>

            <div className="
              text-3xl md:text-5xl font-semibold
              leading-tight max-w-5xl mx-auto mt-8
              bg-gradient-to-r from-white via-blue-300 to-blue-600
              bg-clip-text text-transparent
              ">

              <TextType
                text={[
                  "Crea il tuo sito.",
                  "Facile.",
                  "Veloce.",
                  "Professionale."
                ]}
                typingSpeed={30}
                deletingSpeed={20}
                pauseDuration={1500}
                showCursor
                cursorCharacter="|"
              />

            </div>

          </div>

        </div>

      </section>

      {/* SERVIZI */}
      
      <div
        className="
          max-w-6xl
          mx-auto
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-blue-400/70
          to-transparent
          shadow-[0_0_50px_rgba(59,130,246,0.4)]
        "
      ></div>

      <section id="servizi" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-bold text-center mb-16">
            I Nostri Servizi
          </h2>

          <div className="relative overflow-hidden">

            {/* sfumature ai bordi pagina */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

            <LogoLoop
              logos={serviceLogos.map((item) => ({
                node: (
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="text-blue-500">{item.node}</div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                )
              }))}
              speed={110}
              direction="left"
              logoHeight={120}
              gap={40}
              scaleOnHover={true}
              hoverSpeed = {60}
            />
          </div>
        </div>
      </section>

      {/* PREVENTIVO */}

      <section id="preventivo" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-5xl font-bold text-center mb-12">
            Calcola il tuo Preventivo
          </h2>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* SINISTRA - PACCHETTI */}
            <div className="bg-zinc-900 p-8 rounded-3xl">

              <label className="block mb-4 text-lg font-semibold">
                Scegli il Pacchetto
              </label>

              <div className="grid md:grid-cols-3 gap-6">

                {/* STARTER */}
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, package: "starter" }))
                  }
                  className={`cursor-pointer p-6 rounded-2xl border transition duration-300 hover:scale-[1.03] ${formData.package === "starter"
                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                      : "border-white/10 bg-white/5 hover:border-blue-400/50"
                    }`}
                >
                  <h3 className="text-xl font-bold">Starter</h3>
                  <p className="text-2xl font-black mt-2">€400</p>

                  <ul className="text-sm text-gray-400 mt-4 space-y-1">
                    <li>• 1 a 3 pagine</li>
                    <li>• Sito vetrina moderno</li>
                    <li>• Design responsive</li>
                    <li>• Setup base</li>
                  </ul>
                </div>

                {/* BUSINESS */}
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, package: "business" }))
                  }
                  className={`cursor-pointer p-6 rounded-2xl border transition duration-300 hover:scale-[1.03] ${formData.package === "business"
                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_40px_rgba(59,130,246,0.4)] scale-[1.03]"
                      : "border-white/10 bg-white/5 hover:border-blue-400/50"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Business</h3>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                      Più scelto
                    </span>
                  </div>

                  <p className="text-2xl font-black mt-2">€700</p>

                  <ul className="text-sm text-gray-400 mt-4 space-y-1">
                    <li>• Fino a 6 pagine</li>
                    <li>• SEO base inclusa</li>
                    <li>• Performance ottimizzate</li>
                    <li>• Integrazioni avanzate</li>
                  </ul>
                </div>

                {/* PREMIUM */}
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, package: "premium" }))
                  }
                  className={`cursor-pointer p-6 rounded-2xl border transition duration-300 hover:scale-[1.03] ${formData.package === "premium"
                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                      : "border-white/10 bg-white/5 hover:border-blue-400/50"
                    }`}
                >
                  <h3 className="text-xl font-bold">Premium</h3>
                  <p className="text-2xl font-black mt-2">€1500</p>

                  <ul className="text-sm text-gray-400 mt-4 space-y-1">
                    <li>• Progetto strategico completo</li>
                    <li>• UI/UX su misura</li>
                    <li>• SEO avanzata</li>
                    <li>• Animazioni premium</li>
                  </ul>
                </div>

              </div>

              {/* URGENCY */}
              <div className="mt-8 relative" ref={urgencyRef}>

                {/* LABEL */}
                <label className="block mb-3 text-lg font-semibold">
                  Urgenza del progetto
                </label>

                {/* BUTTON */}
                <button
                  type="button"
                  onClick={() => setOpenUrgency(!openUrgency)}
                  className="
      w-full flex justify-between items-center
      px-4 py-3 rounded-xl
      bg-zinc-900 border border-blue-500/20
      text-white
      hover:border-blue-500/40
      transition
    "
                >
                  <span className="capitalize">
                    {formData.urgency}
                  </span>

                  <span className={`transition ${openUrgency ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>

                {/* DROPDOWN */}
                {openUrgency && (
                  <div className="
      absolute z-50 mt-2 w-full
      rounded-xl overflow-hidden
      bg-zinc-900 border border-blue-500/20
      shadow-[0_0_30px_rgba(59,130,246,0.2)]
    ">
                    {[
                      { value: "standard", label: "Standard (14–21 giorni)" },
                      { value: "veloce", label: "Veloce (7 giorni +100€)" },
                      { value: "urgente", label: "Urgente (3 giorni +300€)" }
                    ].map((item) => (
                      <div
                        key={item.value}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            urgency: item.value
                          }));
                          setOpenUrgency(false);
                        }}
                        className="
            px-4 py-3 cursor-pointer text-sm
            text-gray-200
            hover:bg-blue-500/10 hover:text-white
            transition
          "
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>

            {/* DESTRA */}
            <div className="flex flex-col gap-8">

              {/* BOX PREVENTIVO */}
              <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent blur-2xl"></div>

                <div className="relative">
                  <h3 className="text-3xl font-bold">
                    Preventivo Stimato
                  </h3>

                  <div className="text-6xl font-black mt-6 bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-transparent">
                    € {price}
                  </div>

                  <p className="text-sm text-gray-400 mt-4">
                    Progetto {formData.package} · {formData.pages} pagine · Delivery {formData.urgency}
                  </p>

                  <p className="text-gray-300 mt-4">
                    Valore indicativo. Il preventivo finale verrà personalizzato dopo analisi.
                  </p>
                </div>

              </div>

              {/* FOTO */}
              <div className="relative overflow-hidden rounded-3xl border border-blue-500/20">

                {/* glow */}
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl"></div>

                <motion.div
                  whileHover={{ scale: 1.10 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="
                      absolute
                      -inset-4
                      rounded-[40px]
                      bg-gradient-to-r
                      from-blue-600/40
                      via-cyan-400/30
                      to-blue-600/40
                      blur-[80px]
                      animate-pulse
                    "
                  ></div>

                  <Image
                    src="/logo-header.png"
                    alt="Anteprima"
                    width={1000}
                    height={700}
                    className="relative rounded-3xl w-full object-cover"
                  />
                </motion.div>

              </div>

            </div>

          </div>

          <form
            onSubmit={sendEmail}
            className="mt-16 bg-zinc-900 rounded-3xl p-8"
          >
            <h3 className="text-3xl font-bold mb-8">
              Ricevi il Preventivo
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                name="name"
                placeholder="Nome"
                required
                onChange={handleChange}
                className="bg-black p-4 rounded-xl"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="bg-black p-4 rounded-xl"
              />

              <input
                type="text"
                name="phone"
                placeholder="Telefono"
                onChange={handleChange}
                className="bg-black p-4 rounded-xl"
              />

              <input
                type="text"
                name="company"
                placeholder="Azienda"
                onChange={handleChange}
                className="bg-black p-4 rounded-xl"
              />
            </div>

            <textarea
              name="notes"
              placeholder="Descrivi il progetto..."
              rows="5"
              onChange={handleChange}
              className="w-full mt-6 bg-black p-4 rounded-xl"
            />

            <button
              type="submit"
              className="mt-8 px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold"
            >
              Invia Preventivo
            </button>


            <div className="mt-4">
              {sendStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-medium"
                >
                  ✔ Inviato con successo
                </motion.div>
              )}

              {sendStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium"
                >
                  ✖ Errore nell'invio
                </motion.div>
              )}
            </div>


          </form>

        </div>

        
    
      </section>

      {/* FOOTER */}

      <footer
        id="contatti"
        className="py-12 border-t border-zinc-800 text-center"
      >
        <h3 className="text-3xl font-bold">
          NOVAWEB STUDIO
        </h3>

        <p className="text-gray-400 mt-3">
          Siti Web • SEO • E-Commerce • Branding
        </p>
      </footer>

    </div>
  );
}