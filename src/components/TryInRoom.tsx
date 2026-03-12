import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html, TransformControls } from "@react-three/drei";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { Camera, Upload, RotateCcw, Move, RotateCw, Maximize2, Video, VideoOff } from "lucide-react";
import * as THREE from "three";

interface TryInRoomProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Realistic 3D furniture models with product image as texture
const FurnitureModel = ({ category, imageUrl }: { category: string; imageUrl: string }) => {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  texture.colorSpace = THREE.SRGBColorSpace;

  const fabricMat = <meshStandardMaterial map={texture} roughness={0.7} />;
  const legMat = <meshStandardMaterial color="#8B6914" metalness={0.7} roughness={0.25} />;
  const woodMat = <meshStandardMaterial color="#6B4226" roughness={0.35} metalness={0.05} />;

  if (category === "Sofas") {
    return (
      <group>
        {/* Base/seat cushion */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <boxGeometry args={[2.4, 0.35, 1.05]} />
          {fabricMat}
        </mesh>
        {/* Back cushion */}
        <mesh position={[0, 0.72, -0.38]} castShadow>
          <boxGeometry args={[2.2, 0.5, 0.25]} />
          {fabricMat}
        </mesh>
        {/* Back frame */}
        <mesh position={[0, 0.62, -0.48]} castShadow>
          <boxGeometry args={[2.4, 0.65, 0.08]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.5} />
        </mesh>
        {/* Left arm */}
        <mesh position={[-1.12, 0.48, 0]} castShadow>
          <boxGeometry args={[0.18, 0.55, 1.05]} />
          {fabricMat}
        </mesh>
        {/* Right arm */}
        <mesh position={[1.12, 0.48, 0]} castShadow>
          <boxGeometry args={[0.18, 0.55, 1.05]} />
          {fabricMat}
        </mesh>
        {/* Seat cushion details - 3 cushions */}
        {[-0.72, 0, 0.72].map((x, i) => (
          <mesh key={`seat-${i}`} position={[x, 0.52, 0.02]} castShadow>
            <boxGeometry args={[0.68, 0.08, 0.9]} />
            {fabricMat}
          </mesh>
        ))}
        {/* Back pillows */}
        {[-0.65, 0, 0.65].map((x, i) => (
          <mesh key={`back-${i}`} position={[x, 0.78, -0.3]} castShadow>
            <boxGeometry args={[0.6, 0.35, 0.18]} />
            {fabricMat}
          </mesh>
        ))}
        {/* Gold legs */}
        {[[-1.0, 0.06, 0.4], [1.0, 0.06, 0.4], [-1.0, 0.06, -0.4], [1.0, 0.06, -0.4]].map((pos, i) => (
          <mesh key={`leg-${i}`} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.03, 0.025, 0.14, 8]} />
            {legMat}
          </mesh>
        ))}
      </group>
    );
  }

  if (category === "Tables") {
    return (
      <group>
        {/* Tabletop */}
        <mesh position={[0, 0.76, 0]} castShadow>
          <boxGeometry args={[1.8, 0.05, 0.95]} />
          {woodMat}
        </mesh>
        {/* Top edge bevel */}
        <mesh position={[0, 0.74, 0]} castShadow>
          <boxGeometry args={[1.84, 0.02, 0.99]} />
          <meshStandardMaterial color="#5a3520" roughness={0.3} />
        </mesh>
        {/* Legs - tapered */}
        {[[-0.78, 0.37, -0.38], [0.78, 0.37, -0.38], [-0.78, 0.37, 0.38], [0.78, 0.37, 0.38]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.035, 0.025, 0.73, 8]} />
            {woodMat}
          </mesh>
        ))}
        {/* Cross support */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[1.5, 0.03, 0.03]} />
          {woodMat}
        </mesh>
      </group>
    );
  }

  if (category === "Chairs") {
    return (
      <group>
        {/* Seat */}
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[0.52, 0.07, 0.5]} />
          {fabricMat}
        </mesh>
        {/* Seat cushion */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.48, 0.04, 0.46]} />
          {fabricMat}
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.82, -0.22]} castShadow>
          <boxGeometry args={[0.48, 0.65, 0.05]} />
          {fabricMat}
        </mesh>
        {/* Back cushion */}
        <mesh position={[0, 0.75, -0.18]} castShadow>
          <boxGeometry args={[0.42, 0.4, 0.06]} />
          {fabricMat}
        </mesh>
        {/* Legs */}
        {[[-0.22, 0.22, -0.22], [0.22, 0.22, -0.22], [-0.22, 0.22, 0.22], [0.22, 0.22, 0.22]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.02, 0.018, 0.44, 8]} />
            <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        {/* Armrests */}
        {[-0.28, 0.28].map((x, i) => (
          <mesh key={`arm-${i}`} position={[x, 0.62, 0]} castShadow>
            <boxGeometry args={[0.04, 0.04, 0.4]} />
            <meshStandardMaterial color="#222" metalness={0.6} roughness={0.3} />
          </mesh>
        ))}
      </group>
    );
  }

  if (category === "Beds") {
    return (
      <group>
        {/* Frame base */}
        <mesh position={[0, 0.14, 0]} castShadow>
          <boxGeometry args={[2.1, 0.1, 2.5]} />
          {woodMat}
        </mesh>
        {/* Mattress */}
        <mesh position={[0, 0.34, 0.05]} castShadow>
          <boxGeometry args={[1.95, 0.28, 2.3]} />
          <meshStandardMaterial color="#f0ebe0" roughness={0.85} />
        </mesh>
        {/* Mattress top */}
        <mesh position={[0, 0.49, 0.05]} castShadow>
          <boxGeometry args={[1.92, 0.02, 2.27]} />
          <meshStandardMaterial color="#e8e2d6" roughness={0.9} />
        </mesh>
        {/* Headboard */}
        <mesh position={[0, 0.65, -1.2]} castShadow>
          <boxGeometry args={[2.1, 0.85, 0.08]} />
          {fabricMat}
        </mesh>
        {/* Headboard padding */}
        <mesh position={[0, 0.7, -1.15]} castShadow>
          <boxGeometry args={[1.95, 0.65, 0.06]} />
          {fabricMat}
        </mesh>
        {/* Pillows */}
        {[-0.5, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 0.54, -0.8]} castShadow>
            <boxGeometry args={[0.55, 0.14, 0.38]} />
            <meshStandardMaterial color="#fff" roughness={0.9} />
          </mesh>
        ))}
        {/* Legs */}
        {[[-0.95, 0.05, -1.15], [0.95, 0.05, -1.15], [-0.95, 0.05, 1.15], [0.95, 0.05, 1.15]].map((pos, i) => (
          <mesh key={`leg-${i}`} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.04, 0.03, 0.1, 8]} />
            {woodMat}
          </mesh>
        ))}
      </group>
    );
  }

  if (category === "Storage" || category === "Desks") {
    return (
      <group>
        {/* Main body */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[1.3, 1.1, 0.42]} />
          {woodMat}
        </mesh>
        {/* Shelves */}
        {[0.25, 0.55, 0.85].map((y, i) => (
          <mesh key={i} position={[0, y, 0.01]} castShadow>
            <boxGeometry args={[1.25, 0.025, 0.4]} />
            <meshStandardMaterial color="#5a3520" roughness={0.3} />
          </mesh>
        ))}
        {/* Top */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[1.34, 0.03, 0.46]} />
          <meshStandardMaterial color="#5a3520" roughness={0.3} />
        </mesh>
        {/* Side panels */}
        {[-0.64, 0.64].map((x, i) => (
          <mesh key={`side-${i}`} position={[x, 0.55, 0]} castShadow>
            <boxGeometry args={[0.025, 1.08, 0.42]} />
            {woodMat}
          </mesh>
        ))}
      </group>
    );
  }

  // Generic furniture
  return (
    <group>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        {fabricMat}
      </mesh>
    </group>
  );
};

// Component that renders a video texture as the scene background
const CameraBackground = ({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) => {
  const { scene, gl } = useThree();
  const textureRef = useRef<THREE.VideoTexture | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const texture = new THREE.VideoTexture(videoRef.current);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      textureRef.current = texture;
      scene.background = texture;
    }
    return () => {
      if (textureRef.current) {
        textureRef.current.dispose();
      }
      scene.background = null;
    };
  }, [videoRef, scene]);

  useFrame(() => {
    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  });

  return null;
};

// Component to clear scene background for default/upload modes
const StaticBackground = () => {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = null;
    return () => { scene.background = null; };
  }, [scene]);
  return null;
};

const Scene = ({
  category,
  productImage,
  backgroundImage,
  transformMode,
  cameraMode,
  videoRef,
}: {
  category: string;
  productImage: string;
  backgroundImage: string | null;
  transformMode: "translate" | "rotate" | "scale";
  cameraMode: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {

  const showDefaultRoom = !cameraMode && !backgroundImage;

  return (
    <>
      {cameraMode ? (
        <CameraBackground videoRef={videoRef} />
      ) : (
        <StaticBackground />
      )}

      <ambientLight intensity={cameraMode ? 0.8 : 0.5} />
      <directionalLight position={[5, 5, 5]} intensity={cameraMode ? 0.6 : 1} castShadow />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} />

      {backgroundImage && !cameraMode && (
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

      <TransformControls mode={transformMode} size={0.6}>
        <group>
          <FurnitureModel category={category} imageUrl={productImage} />
        </group>
      </TransformControls>

      <ContactShadows position={[0, -0.01, 0]} opacity={cameraMode ? 0.2 : 0.4} scale={10} blur={2} />

      {showDefaultRoom && (
        <>
          <gridHelper args={[10, 10, "#888", "#ccc"]} position={[0, 0, 0]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#f0ece3" roughness={0.8} />
          </mesh>
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
  const [cameraMode, setCameraMode] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null!);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraMode(true);
      setBackgroundImage(null);
    } catch (err) {
      console.error("Camera access failed:", err);
      setCameraError("Camera access denied. Please allow camera permissions and try again.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraMode(false);
  }, []);

  // Clean up camera on close
  useEffect(() => {
    if (!open) {
      stopCamera();
      setCameraError(null);
    }
  }, [open, stopCamera]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [stopCamera]);

  const handleReset = useCallback(() => {
    stopCamera();
    setBackgroundImage(null);
    setTransformMode("translate");
    setCameraError(null);
  }, [stopCamera]);

  const toggleCamera = useCallback(() => {
    if (cameraMode) {
      stopCamera();
    } else {
      startCamera();
    }
  }, [cameraMode, startCamera, stopCamera]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[85vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2 border-b border-border">
          <DialogTitle className="font-display text-lg">
            Try "{product.name}" In Your Room
          </DialogTitle>
          <DialogDescription>
            Use your camera to see the furniture live in your room, or upload a photo.
          </DialogDescription>
        </DialogHeader>

        {/* Hidden video element for camera feed */}
        <video
          ref={videoRef}
          playsInline
          muted
          style={{ display: "none" }}
        />

        <div className="flex-1 flex flex-col min-h-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
            <Button
              variant={cameraMode ? "default" : "outline"}
              size="sm"
              onClick={toggleCamera}
              className="gap-1.5"
            >
              {cameraMode ? <VideoOff className="h-3.5 w-3.5" /> : <Video className="h-3.5 w-3.5" />}
              {cameraMode ? "Stop Camera" : "Live Camera"}
            </Button>

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
              Upload Photo
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

          {/* Camera error message */}
          {cameraError && (
            <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm border-b border-border">
              {cameraError}
            </div>
          )}

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
                  productImage={product.image}
                  backgroundImage={backgroundImage}
                  transformMode={transformMode}
                  cameraMode={cameraMode}
                  videoRef={videoRef}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Info bar */}
          <div className="px-4 py-2.5 border-t border-border bg-muted/30 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {cameraMode
                ? "📹 Live camera active — point at your room and position the furniture with the toolbar."
                : "💡 Use mouse to orbit. Use toolbar to move, rotate, or scale the furniture."}
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
