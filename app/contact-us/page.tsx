import Header from "../../components/Header";
import ContactForm from "../../components/ContactForm";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <div>
      <div className="min-h-screen flex flex-col bg-[#050428] text-white font-sans">
        <main className="flex-grow">
          <section className="flex flex-col lg:flex-row" style={{ minHeight: "100vh" }}>
            <div className="lg:w-1/3 bg-[#45a297] p-12 text-center">
              <h2 className="text-4xl tracking-widest text-white text-[24px] font-semibold">
                CONTACT US
              </h2>
              <div className="mt-8 text-sm leading-6">
                <p>
                  Plot No. -4770,Phase-3,
                  <br/> GIDC, Dared, Jamnagar - 361004 <br/>India
                </p>

                <p className="mt-4"><a href="tel:+91 79848 19991">+91 79848 19991</a></p>
              </div>
            </div>

            <div className="lg:w-1/3 bg-[#000] p-12 text-center text-[#07102b]">
              <h2 className="text-4xl tracking-widest text-white text-[24px] font-semibold">
                VISIT US
              </h2>
              <p className="mt-8 text-sm leading-6 text-white">
                Monday - Thursday, Saturday-Sunday 07:00 am - 19:00 pm
                <br />
                Friday Closed
              </p>
            </div>

            <div className="lg:w-1/3 bg-[#6d6a76] p-12 text-center">
              <h2 className="text-4xl tracking-widest text-white text-[24px] font-semibold">
                TELL US
              </h2>
              <ContactForm />
            </div>
          </section>
        </main>

       <Footer />
      </div>
    </div>
  );
}
