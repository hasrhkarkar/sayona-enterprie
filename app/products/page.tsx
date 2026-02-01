import BrochureViewer from "../../components/BrochureViewer";

export default function ProductsPage() {
  const images = [
    "/image/Broucher-01.png",
    "/image/Broucher-02.png",
    "/image/Broucher-03.png",
    "/image/Broucher-04.png",
    "/image/Broucher-05.png",
    "/image/Broucher-06.png",
    "/image/Broucher-07.png",
    "/image/Broucher-08.png",
    "/image/Broucher-09.png",
    "/image/Broucher-10.png",
    "/image/Broucher-11.png",
    "/image/Broucher-12.png",
    "/image/Broucher-13.png",
    "/image/Broucher-14.png",
    "/image/Broucher-15.png",
    "/image/Broucher-16.png",
    "/image/Broucher-17.png",
    "/image/Broucher-18.png",
    "/image/Broucher-19.png",
    "/image/Broucher-20.png",
    "/image/Broucher-21.png",
    "/image/Broucher-22.png",
    "/image/Broucher-23.png",
    "/image/Broucher-24.png",
  ];

  return (
    <div>
      <main className="prose mx-auto">
        <div
          className=""
          style={{
            backgroundImage: "url('/image/product-bg.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="mx-auto bg-black/50 p-6">
            <div className="mx-auto overflow-x-auto flex justify-center">
              <BrochureViewer images={images} openPage={2} /> 
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
}
