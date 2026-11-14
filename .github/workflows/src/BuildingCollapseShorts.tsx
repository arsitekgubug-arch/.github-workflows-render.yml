import { Canvas } from "@remotion/three";
import { useCurrentFrame, interpolate } from "remotion";

function ThreeScene() {
  const frame = useCurrentFrame();

  // Simulasi gedung roboh menyamping mulai frame 900 (detik ke-30)
  const collapseProgress = interpolate(frame, [900, 1050], [0, Math.PI / 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pergeseran tanah lunak akibat tekanan tidak seimbang
  const soilShift = interpolate(frame, [600, 900], [0, -1.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} />

      {/* Tanah Sisi Utara (Galian Basement Kosong) */}
      <mesh position={[-5.5, -3.5, 0]}>
        <boxGeometry args={[7, 1, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Tanah Sisi Selatan + Tumpukan Tanah Berat */}
      <group position={[soilShift, 0, 0]}>
        <mesh position={[3.5, -3, 0]}>
          <boxGeometry args={[9, 1, 16]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        {/* Gunung Tumpukan Tanah Hasil Galian */}
        <mesh position={[5.5, -1.2, 0]}>
          <coneGeometry args={[3.2, 3.2, 16]} />
          <meshStandardMaterial color="#92400e" />
        </mesh>
      </group>

      {/* Gedung 13 Lantai yang Roboh Utuh */}
      <group position={[0, -2.5, 0]} rotation={[0, 0, collapseProgress]}>
        <mesh position={[0, 6, 0]}>
          <boxGeometry args={[3.2, 12, 3.2]} />
          <meshStandardMaterial color="#0ea5e9" roughness={0.3} />
        </mesh>
      </group>
    </>
  );
}

export const BuildingCollapseShorts = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        position: "relative",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Canvas 3D Three.js */}
      <Canvas
        style={{
          position: "absolute",
          width: "1080px",
          height: "1920px",
        }}
        camera={{ position: [0, 6, 20], fov: 50 }}
      >
        <ThreeScene />
      </Canvas>

      {/* Overlay Teks 2D Gaya Blueprint */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 70,
          right: 70,
          color: "white",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        {frame < 240 && (
          <div
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              padding: "28px",
              borderRadius: "16px",
              border: "3px solid #38bdf8",
            }}
          >
            <h1 style={{ fontSize: "50px", margin: 0 }}>
              Gedung 13 Lantai Roboh Utuh Kayak Domino! Kok Bisa?
            </h1>
          </div>
        )}

        {frame >= 240 && frame < 1140 && (
          <div
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              padding: "28px",
              borderRadius: "16px",
              border: "3px solid #f43f5e",
            }}
          >
            <h2 style={{ fontSize: "42px", color: "#38bdf8", margin: 0 }}>
              Tekanan Lateral Tanah Tidak Seimbang & Tiang Pancang Patah
            </h2>
          </div>
        )}

        {frame >= 1140 && (
          <div
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              padding: "28px",
              borderRadius: "16px",
              border: "3px solid #22c55e",
            }}
          >
            <h2 style={{ fontSize: "40px", color: "#4ade80", margin: 0 }}>
              Solusi Teknis: Diaphragm Wall, Muck Management & Inclinometer
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
