import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import homefirst from "../public/image/homepage-first.jpeg";
import homesecond from "../public/image/homepage-second.jpeg";
import homethird from "../public/image/homepage-third.jpeg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050428] text-white font-sans">
      <main className="flex-grow">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="order-1 lg:order-1">
            <Image
            style={{ height:"760.4px" }}
              src={homefirst}
              alt="Wood piles"
              width={760.4}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-12 py-20 bg-[#46a39a] text-[#07102b] flex items-center">
            <div className="max-w-xl">
              <h1
                className="text-5xl font-semibold text-white
 leading-tight mb-6">
                Welcome to
                <br />
                Sayona Enterprise
              </h1>
              <p className="mb-6 text-[18px] font-medium text-white">
                The Ultimate Source in Home Improvement
              </p>
              <p className="text-[13px] font-medium text-white">
                Sayona enterprise is your one-stop shop for quality hardware and
                brass components parts . Established in 2008, we’ve been
                providing a huge selection of top quality materials at
                affordable prices, enabling customers to stay within budget and
                deadline. Our individualised service and expertise enable you to
                get the job done faster and easier.
              </p>
            </div>
          </div>
        </section>

        {/* Section: text left, image right */}
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            <Image
              src={homesecond}
              alt="Bags"
              width={1200}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-12 py-24 bg-[#000] text-[#f4b03c] flex items-center">
            <div className="max-w-md">
              <h2 className="text-3xl font-semibold mb-4">
                Your Quality Hardware Materials Store
              </h2>
              <p className="text-sm leading-7 text-white/90">
                Family owned for more than 18+ years, we have the proven knowledge,
                professionalism and expertise to provide quality architectural
                hardware and brass component manufacturing services to all
                sectors of the construction industry. This includes government,
                commercial, residential, health and education projects.
                <br /><br />
                We concentrate on building and maintaining long-lasting
                relationships with our customers and business partners. We pride
                ourselves on our reputation for being professional, easy to deal
                with and supplying first class products and services.
              </p>
            </div>
          </div>
        </section>

        {/* Section: image left, contact right */}
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="px-12 py-24 bg-[#6d6a76] flex items-center">
            <div className="mx-auto text-center text-white/90">
              <h3 className="text-3xl text-[#f4b03c] mb-4">Contact Us</h3>
              <p className="text-sm">
                Plot No. -4770,Phase-3, 
                <br />
                GIDC, Dared, Jamnagar - 361004
                <br />
                India,
              </p>
             <br />
              <a href="mailto:Info@sayonaenterprise.com" className="hover:underline">Info@sayonaenterprise.com</a>
              <p><a href="tel:+917984819991">+91 79848 19991</a></p>
            </div>
          </div>
          <div>
            <Image
              src={homethird}
              alt="Blocks"
              width={760.4}
              height={760.4}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
