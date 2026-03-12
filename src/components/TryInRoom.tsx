import { useState, useRef, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html, TransformControls } from "@react-three/drei";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { Camera, Upload, RotateCcw, ZoomIn, ZoomOut, Move, RotateCw, Maximize2 } from "lucide-react";
import * as THREE from "three";

interface TryInRoomProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Furniture 3D shapes based on category
const FurnitureModel = ({ category, color }: { category: string; color: string }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const materialProps = { color, roughness: 0.4, metalness: 0.1 };

  if (category === "Sofas") {
    return (
      <group ref={meshRef}>
        {/* Seat */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2.4, 0.4, 1]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Back */}
        <mesh position={[0, 0.75, -0.4]}>
          <boxGeometry args={[2.4, 0.6, 0.2]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Left arm */}
        <mesh position={[-1.1, 0.5, 0]}>
          <boxGeometry args={[0.2, 0.5, 1]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Right arm */}
        <mesh position={[1.1, 0.5, 0]}>
          <boxGeometry args={[0.2, 0.5, 1]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Legs */}
        {[[-1, 0, -0.35], [1, 0, -0.35], [-1, 0, 0.35], [1, 0, 0.35]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.04, 0.04, 0.2]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        {/* Cushions */}
        {[-0.7, 0, 0.7].map((x, i) => (
          <mesh key={`c${i}`} position={[x, 0.55, 0.05]}>
            <boxGeometry args={[0.65, 0.1, 0.8]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        ))}
      </group>
    );
  }

  if (category === "Tables") {
    return (
      <group ref={meshRef}>
        {/* Table top */}
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[1.6, 0.06, 0.9]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.3} />
        </mesh>
        {/* Legs */}
        {[[-0.7, 0.37, -0.35], [0.7, 0.37, -0.35], [-0.7, 0.37, 0.35], [0.7, 0.37, 0.35]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={[0.06, 0.72, 0.06]} />
            <meshStandardMaterial color="#8B5E3C" roughness={0.3} />
          </mesh>
        ))}
      </group>
    );
  }

  if (category === "Chairs") {
    return (
      <group ref={meshRef}>
        {/* Seat */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[0.5, 0.06, 0.5]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Back */}
        <mesh position={[0, 0.8, -0.22]}>
          <boxGeometry args={[0.5, 0.65, 0.06]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Legs */}
        {[[-0.2, 0.22, -0.2], [0.2, 0.22, -0.2], [-0.2, 0.22, 0.2], [0.2, 0.22, 0.2]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.025, 0.025, 0.42]} />
            <meshStandardMaterial color="#333" metalness={0.6} />
          </mesh>
        ))}
      </group>
    );
  }

  if (category === "Beds") {
    return (
      <group ref={meshRef}>
        {/* Mattress */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[2, 0.3, 2.4]} />
          <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[2.1, 0.12, 2.5]} />
          <meshStandardMaterial color="#654321" roughness={0.4} />
        </mesh>
        {/* Headboard */}
        <mesh position={[0, 0.7, -1.2]}>
          <boxGeometry args={[2.1, 0.8, 0.1]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Pillows */}
        {[-0.5, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 0.55, -0.85]}>
            <boxGeometry args={[0.55, 0.12, 0.35]} />
            <meshStandardMaterial color="#fff" roughness={0.9} />
          </mesh>
        ))}
      </group>
    );
  }

  if (category === "Storage" || category === "Desks") {
    return (
      <group ref={meshRef}>
        {/* Main body */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.2, 1, 0.4]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.4} />
        </mesh>
        {/* Shelves */}
        {[0.2, 0.5, 0.8].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[1.15, 0.03, 0.38]} />
            <meshStandardMaterial color="#654321" roughness={0.3} />
          </mesh>
        ))}
      </group>
    );
  }

  // Default box
  return (
    <group ref={meshRef}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
};

const Scene = ({ category, backgroundImage, transformMode }: { category: string; backgroundImage: string | null; transformMode: "translate" | "rotate" | "scale" }) => {
  const modelRef = useRef<THREE.Group>(null!);
  const colorMap: Record<string, string> = {
    Sofas: "#6B5B95",
    Tables: "#8B5E3C",
    Chairs: "#2C3E50",
    Beds: "#4A4A4A",
    Storage: "#8B5E3C",
    Desks: "#5C4033",
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} />

      {backgroundImage && (
        <mesh position={[0, 2, -5]} scale={[12, 8, 1]}>
          <planeGeometry />
          <meshBasicMaterial>
            <canvasTexture
              attach="map"
              image={(() => {
                const img = new Image();
                img.src = backgroundImage;
                const canvas = document.createElement("canvas");
                canvas.width = 1920;
                canvas.height = 1080;
                const ctx = canvas.getContext("2d");
                img.onload = () => ctx?.drawImage(img, 0, 0, 1920, 1080);
                return canvas;
              })()}
            />
          </meshBasicMaterial>
        </mesh>
      )}

      <group ref={modelRef}>
        <TransformControls mode={transformMode} size={0.6}>
          <group>
            <FurnitureModel category={category} color={colorMap[category] || "#6B5B95"} />
          </group>
        </TransformControls>
      </group>

      <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={10} blur={2} />

      {!backgroundImage && (
        <>
          {/* Floor grid */}
          <gridHelper args={[10, 10, "#888", "#ccc"]} position={[0, 0, 0]} />
          {/* Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#f0ece3" roughness={0.8} />
          </mesh>
          {/* Walls */}
          <mesh position={[0, 2.5, -5]} receiveShadow>
            <planeGeometry args={[10, 5]} />
            <meshStandardMaterial color="#e8e4db" roughness={0.9} />
          </mesh>
          <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
            <planeGeometry args={[10, 5]} />
            <meshStandardMaterial color="#ddd8cf" roughness={0.9} />
          </mesh>
        </>
      )}

      <Environment preset="apartment" />
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
    </>
  );
};

const TryInRoom = ({ product, open, onOpenChange }: TryInRoomProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [transformMode, setTransformMode] = useState<"translate" | "rotate" | "scale">("translate");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleReset = useCallback(() => {
    setBackgroundImage(null);
    setTransformMode("translate");
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[85vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2 border-b border-border">
          <DialogTitle className="font-display text-lg">
            Try "{product.name}" In Your Room
          </DialogTitle>
          <DialogDescription>
            Upload a room photo or use the default room. Drag, rotate, and scale the furniture to visualize it.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="gap-1.5"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload Room Photo
            </Button>

            <div className="h-5 w-px bg-border mx-1" />

            <Button
              variant={transformMode === "translate" ? "default" : "outline"}
              size="sm"
              onClick={() => setTransformMode("translate")}
              className="gap-1.5"
            >
              <Move className="h-3.5 w-3.5" />
              Move
            </Button>
            <Button
              variant={transformMode === "rotate" ? "default" : "outline"}
              size="sm"
              onClick={() => setTransformMode("rotate")}
              className="gap-1.5"
            >
              <RotateCw className="h-3.5 w-3.5" />
              Rotate
            </Button>
            <Button
              variant={transformMode === "scale" ? "default" : "outline"}
              size="sm"
              onClick={() => setTransformMode("scale")}
              className="gap-1.5"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Scale
            </Button>

            <div className="h-5 w-px bg-border mx-1" />

            <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>

          {/* 3D Canvas */}
          <div className="flex-1 min-h-0 bg-muted/10">
            <Canvas
              shadows
              camera={{ position: [3, 3, 5], fov: 50 }}
              style={{ width: "100%", height: "100%" }}
            >
              <Suspense fallback={
                <Html center>
                  <div className="text-sm text-muted-foreground animate-pulse">Loading 3D scene...</div>
                </Html>
              }>
                <Scene
                  category={product.category}
                  backgroundImage={backgroundImage}
                  transformMode={transformMode}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Info bar */}
          <div className="px-4 py-2.5 border-t border-border bg-muted/30 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              💡 Use mouse to orbit. Use toolbar to move, rotate, or scale the furniture.
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-display font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TryInRoom;
