import { useRef } from "react";

const photos = [
  {
    url: "https://cdn.poehali.dev/projects/61a19a31-3cb5-42a6-a87e-93a6f5343977/bucket/d4d7407e-2069-4bf4-8347-d53e78cc0a5f.jpg",
    alt: "photo1",
  },
  {
    url: "https://cdn.poehali.dev/projects/61a19a31-3cb5-42a6-a87e-93a6f5343977/bucket/82799f40-3243-4e07-9d0f-679df5654079.jpg",
    alt: "photo2",
  },
  {
    url: "https://cdn.poehali.dev/projects/61a19a31-3cb5-42a6-a87e-93a6f5343977/bucket/5ba0e8aa-0d8e-4793-9bc1-f32e0c5797d7.jpg",
    alt: "photo3",
  },
  {
    url: "https://cdn.poehali.dev/projects/61a19a31-3cb5-42a6-a87e-93a6f5343977/bucket/68d15e0c-f41f-40d3-ac2f-96ae381835d7.jpg",
    alt: "photo4",
  },
  {
    url: "https://cdn.poehali.dev/projects/61a19a31-3cb5-42a6-a87e-93a6f5343977/bucket/8722c4e0-7fb0-4b93-ba09-d7558f40742b.jpg",
    alt: "photo5",
  },
];

export default function MagazineCover() {
  const coverRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div
        ref={coverRef}
        className="relative overflow-hidden"
        style={{
          width: "700px",
          height: "980px",
          background: "#0a0a0a",
          fontFamily: "'Montserrat', sans-serif",
          boxShadow: "0 40px 120px rgba(0,0,0,0.9)",
        }}
      >
        {/* Photo collage background */}
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
          {/* Top left - large */}
          <div className="relative overflow-hidden" style={{ gridColumn: "1", gridRow: "1" }}>
            <img
              src={photos[0].url}
              alt={photos[0].alt}
              className="w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.75)" }}
            />
          </div>
          {/* Top right */}
          <div className="relative overflow-hidden" style={{ gridColumn: "2", gridRow: "1" }}>
            <img
              src={photos[2].url}
              alt={photos[2].alt}
              className="w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.7)" }}
            />
          </div>
          {/* Bottom left */}
          <div className="relative overflow-hidden" style={{ gridColumn: "1", gridRow: "2" }}>
            <img
              src={photos[3].url}
              alt={photos[3].alt}
              className="w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.7)" }}
            />
          </div>
          {/* Bottom right split */}
          <div className="relative overflow-hidden flex flex-col" style={{ gridColumn: "2", gridRow: "2" }}>
            <div className="flex-1 overflow-hidden">
              <img
                src={photos[1].url}
                alt={photos[1].alt}
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.7)" }}
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <img
                src={photos[4].url}
                alt={photos[4].alt}
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.7)" }}
              />
            </div>
          </div>
        </div>

        {/* Grid lines overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, transparent 49.8%, rgba(255,255,255,0.15) 49.8%, rgba(255,255,255,0.15) 50.2%, transparent 50.2%), linear-gradient(0deg, transparent 49.8%, rgba(255,255,255,0.15) 49.8%, rgba(255,255,255,0.15) 50.2%, transparent 50.2%)"
        }} />

        {/* Dark gradient overlays */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.85) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)"
        }} />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 px-8 pt-6 flex items-center justify-between">
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase" }}>
            №04 · 2026
          </div>
          <div style={{
            background: "linear-gradient(135deg, #e8472a, #c0392b)",
            color: "white",
            fontSize: "10px",
            letterSpacing: "2px",
            padding: "4px 14px",
            textTransform: "uppercase",
            fontWeight: "700",
          }}>
            ЭКСКЛЮЗИВ
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase" }}>
            АПРЕЛЬ
          </div>
        </div>

        {/* Logo — center top */}
        <div className="absolute top-12 left-0 right-0 flex flex-col items-center">
          <div style={{
            color: "white",
            fontSize: "52px",
            fontWeight: "800",
            letterSpacing: "6px",
            textTransform: "uppercase",
            lineHeight: "1",
            textShadow: "0 2px 30px rgba(0,0,0,0.8)",
          }}>
            КОНТЕНТ
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #e8472a)" }} />
            <div style={{
              color: "#e8472a",
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "12px",
              textTransform: "uppercase",
            }}>
              МЕДИА
            </div>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #e8472a)" }} />
          </div>
          <div style={{
            color: "white",
            fontSize: "28px",
            fontWeight: "800",
            letterSpacing: "14px",
            textTransform: "uppercase",
            marginTop: "2px",
            textShadow: "0 2px 20px rgba(232,71,42,0.6)",
          }}>
            PRO
          </div>
        </div>

        {/* Thin red accent line */}
        <div className="absolute left-0 right-0" style={{ top: "148px", height: "2px", background: "linear-gradient(to right, transparent, #e8472a 30%, #e8472a 70%, transparent)" }} />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
          {/* Issue headline */}
          <div style={{
            color: "#e8472a",
            fontSize: "11px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontWeight: "700",
            marginBottom: "10px",
          }}>
            ★ АПРЕЛЬСКИЙ ВЫПУСК ★
          </div>

          <div style={{
            color: "white",
            fontSize: "34px",
            fontWeight: "800",
            lineHeight: "1.1",
            textTransform: "uppercase",
            letterSpacing: "1px",
            textShadow: "0 2px 20px rgba(0,0,0,0.9)",
            marginBottom: "14px",
          }}>
            ЛИЦА<br />
            <span style={{ color: "#e8472a" }}>АПРЕЛЯ</span>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.2)", marginBottom: "16px" }} />

          {/* Teasers */}
          <div className="flex flex-col gap-2" style={{ marginBottom: "20px" }}>
            {[
              "Эксклюзивные интервью с артистами месяца",
              "Контент, который продаёт: тренды апреля",
              "Истории успеха в музыкальной индустрии",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div style={{ width: "18px", height: "1px", background: "#e8472a", flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "12px", letterSpacing: "0.5px" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between" style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "12px",
          }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "2px" }}>
              КОНТЕНТМЕДИАPRO.RU
            </span>
            <div style={{
              background: "#e8472a",
              color: "white",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "2px",
              padding: "5px 12px",
            }}>
              FREE
            </div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "2px" }}>
              АПРЕЛЬ 2026
            </span>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0" style={{ width: "40px", height: "40px", borderTop: "2px solid #e8472a", borderLeft: "2px solid #e8472a" }} />
        <div className="absolute top-0 right-0" style={{ width: "40px", height: "40px", borderTop: "2px solid #e8472a", borderRight: "2px solid #e8472a" }} />
        <div className="absolute bottom-0 left-0" style={{ width: "40px", height: "40px", borderBottom: "2px solid #e8472a", borderLeft: "2px solid #e8472a" }} />
        <div className="absolute bottom-0 right-0" style={{ width: "40px", height: "40px", borderBottom: "2px solid #e8472a", borderRight: "2px solid #e8472a" }} />
      </div>
    </div>
  );
}
