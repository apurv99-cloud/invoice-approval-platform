import { Menu, X, Shield } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = ["Features", "Pricing", "About"];

  return (
    <>
      <div className="flex justify-center px-4 pt-6">
        <nav
          className="
          w-full
          max-w-6xl

          rounded-full

          border
          border-white/10

          bg-white/[0.04]

          backdrop-blur-xl

          px-6
          py-4

          flex
          items-center
          justify-between

          z-50
          relative
          "
        >
          {/* Logo */}

          <div className="flex items-center gap-3">
            <div
              className="
              w-10
              h-10

              rounded-full

              bg-blue-500

              flex
              items-center
              justify-center
              "
            >
              <Shield size={18} />
            </div>

            <div>
              <h1 className="font-semibold">InvoiceFlow</h1>

              <p className="text-xs text-white/50">Enterprise Suite</p>
            </div>
          </div>

          {/* Desktop */}

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                className="
                text-white/70
                hover:text-white
                transition
                "
              >
                {item}
              </button>
            ))}
          </div>

          <button
            className="
            hidden
            md:block

            px-5
            py-2.5

            rounded-full

            bg-white

            text-black

            font-medium
            "
          >
            Login
          </button>

          {/* Mobile */}

          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="px-4 mt-3 md:hidden">
          <div
            className="
            bg-white/[0.04]

            backdrop-blur-xl

            border
            border-white/10

            rounded-3xl

            p-5
            "
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button key={item} className="text-left text-white/80">
                  {item}
                </button>
              ))}

              <button
                className="
                mt-3

                rounded-full

                py-3

                bg-white

                text-black
                "
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
