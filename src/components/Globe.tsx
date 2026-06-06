import { useEffect, useRef, useState } from "react"; 
import * as THREE from "three"; 
import ThreeGlobe from "three-globe"; 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; 

const BRAND_GREEN = "#00C48C";

let geoJsonCache: object[] | null = null;

const WORKING_COUNTRIES = new Set([ 
  "USA", "CAN", 
  "BRA", "ARG", "COL", 
  "GBR", "FRA", "DEU", "NLD", "CHE", "SWE", "NOR", "DNK", "ESP", "ITA", "RUS", "POL", 
  "ARE", "SAU", "QAT", "KWT", 
  "IND", "PAK", "BGD", 
  "CHN", "JPN", "HKG", "SGP", "MYS", "IDN", "PHL", 
  "AUS", "NZL", 
  "ZAF", "NGA", "KEN", "EGY", "GHA", 
]); 

const ARCS = [ 
  { startLat: 40.7128,  startLng: -74.006,   endLat: 51.5074,  endLng: -0.1278,   color: BRAND_GREEN }, 
  { startLat: 40.7128,  startLng: -74.006,   endLat: 19.076,   endLng: 72.8777,   color: "#00e5ff" }, 
  { startLat: 37.7749,  startLng: -122.4194, endLat: 35.6762,  endLng: 139.6503,  color: BRAND_GREEN }, 
  { startLat: 40.7128,  startLng: -74.006,   endLat: 48.8566,  endLng: 2.3522,    color: "#7c3aed" }, 
  { startLat: 51.5074,  startLng: -0.1278,   endLat: 25.2048,  endLng: 55.2708,   color: BRAND_GREEN }, 
  { startLat: 51.5074,  startLng: -0.1278,   endLat: 1.3521,   endLng: 103.8198,  color: "#00e5ff" }, 
  { startLat: 48.8566,  startLng: 2.3522,    endLat: 25.2048,  endLng: 55.2708,   color: "#7c3aed" }, 
  { startLat: 55.7558,  startLng: 37.6173,   endLat: 51.5074,  endLng: -0.1278,   color: "#a78bfa" }, 
  { startLat: 35.6762,  startLng: 139.6503,  endLat: 22.3193,  endLng: 114.1694,  color: BRAND_GREEN }, 
  { startLat: 19.076,   startLng: 72.8777,   endLat: 1.3521,   endLng: 103.8198,  color: "#00e5ff" }, 
  { startLat: 25.2048,  startLng: 55.2708,   endLat: 1.3521,   endLng: 103.8198,  color: "#7c3aed" }, 
  { startLat: 1.3521,   startLng: 103.8198,  endLat: -33.8688, endLng: 151.2093,  color: BRAND_GREEN }, 
  { startLat: -33.8688, startLng: 151.2093,  endLat: 35.6762,  endLng: 139.6503,  color: "#a78bfa" }, 
  { startLat: -23.5505, startLng: -46.6333,  endLat: 40.7128,  endLng: -74.006,   color: "#00e5ff" }, 
  { startLat: -26.2041, startLng: 28.0473,   endLat: 51.5074,  endLng: -0.1278,   color: BRAND_GREEN }, 
  { startLat: 22.3193,  startLng: 114.1694,  endLat: 19.076,   endLng: 72.8777,   color: "#00e5ff" }, 
  { startLat: 30.0444,  startLng: 31.2357,   endLat: 25.2048,  endLng: 55.2708,   color: "#7c3aed" }, 
]; 

const HUBS = [ 
  { lat: 40.7128,   lng: -74.006,  name: "USA", client: "NovaCorp Systems" }, 
  { lat: 51.5074,   lng: -0.1278,  name: "UK", client: "TechBridge Ltd" }, 
  { lat: 25.2048,   lng: 55.2708,  name: "UAE", client: "AlphaStream UAE" }, 
  { lat: 19.076,    lng: 72.8777,  name: "India", client: "DataSync India" }, 
  { lat: 1.3521,    lng: 103.8198, name: "Singapore", client: "CloudPeak SG" }, 
  { lat: 35.6762,   lng: 139.6503, name: "Japan", client: "NextWave Tokyo" }, 
  { lat: 22.3193,   lng: 114.1694, name: "Hong Kong", client: "SmartLogic HK" }, 
  { lat: -33.8688,  lng: 151.2093, name: "Australia", client: "Oceania Tech" }, 
  { lat: 48.8566,   lng: 2.3522,   name: "France", client: "EuroSoft Paris" }, 
  { lat: 37.7749,   lng: -122.4194, name: "USA (SF)", client: "Valley AI" }, 
  { lat: -23.5505,  lng: -46.6333, name: "Brazil", client: "LatAm Connect" }, 
  { lat: -26.2041,  lng: 28.0473,  name: "South Africa", client: "CapeSoft" }, 
  { lat: 55.7558,   lng: 37.6173,  name: "Russia", client: "MosTech" }, 
  { lat: 30.0444,   lng: 31.2357,  name: "Egypt", client: "Nile IT" }, 
]; 

export function Globe({ 
  width = "120%", 
  height = "120%", 
  marginTop = "-100px"
}: { 
  width?: string | number; 
  height?: string | number; 
  marginTop?: string;
}) { 
  const mountRef = useRef<HTMLDivElement>(null); 
  const [hoveredClient, setHoveredClient] = useState<{ name: string; client: string; x: number; y: number } | null>(null); 

  useEffect(() => { 
    if (!mountRef.current) return; 
    const container = mountRef.current; 
    const W = container.clientWidth; 
    const H = container.clientHeight; 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
    renderer.setPixelRatio(window.devicePixelRatio); 
    renderer.setSize(W, H); 
    renderer.setClearColor(0x000000, 0); 
    container.appendChild(renderer.domElement); 

    const scene = new THREE.Scene(); 
    scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3)); 
    scene.fog = new THREE.Fog(0x080e1e, 400, 2000); 

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 2000); 
    camera.position.set(0, 0, 280); 

    const dl1 = new THREE.DirectionalLight(0xffffff, 0.6); 
    dl1.position.set(-800, 2000, 400); 
    camera.add(dl1); 

    const dl2 = new THREE.DirectionalLight(0x00C48C, 1.4); 
    dl2.position.set(-200, 500, 200); 
    camera.add(dl2); 

    const pl = new THREE.PointLight(0x6B46C1, 0.9); 
    pl.position.set(200, -300, 200); 
    camera.add(pl); 

    scene.add(camera); 

    const controls = new OrbitControls(camera, renderer.domElement); 
    controls.enableDamping = true; 
    controls.dampingFactor = 0.01; 
    controls.enablePan = false; 
    controls.minDistance = 270; 
    controls.maxDistance = 320; 
    controls.rotateSpeed = 0.5; 
    controls.zoomSpeed = 0.8; 
    controls.autoRotate = true; 
    controls.autoRotateSpeed = 0.6; 

    let globe: ThreeGlobe | null = null; 
    let rafId: number; 
    const raycaster = new THREE.Raycaster(); 
    const mouse = new THREE.Vector2(); 

    const isActive = (feat: object) => 
      WORKING_COUNTRIES.has( 
        (feat as { properties: { ISO_A3: string } }).properties.ISO_A3 
      ); 

    const build = (features: object[]) => { 
      const g = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true }) 
        .showAtmosphere(true) 
        .atmosphereColor(BRAND_GREEN) 
        .atmosphereAltitude(0.18) 
        .polygonsData(features) 
        .polygonCapColor((feat: object) => 
          isActive(feat) ? "rgba(0,200,120,0.82)" : "rgba(255,255,255,0.04)" 
        ) 
        .polygonSideColor((feat: object) => 
          isActive(feat) ? "rgba(0,200,120,0.25)" : "rgba(0,0,0,0)" 
        ) 
        .polygonStrokeColor((feat: object) => 
          isActive(feat) ? BRAND_GREEN : "rgba(255,255,255,0.05)" 
        ) 
        .polygonAltitude((feat: object) => 
          isActive(feat) ? 0.016 : 0.001 
        ); 

      const mat = g.globeMaterial() as THREE.MeshPhongMaterial; 
      mat.color = new THREE.Color(0x080e1e); 
      mat.emissive = new THREE.Color(0x040d08); 
      mat.emissiveIntensity = 0.12; 
      mat.shininess = 0.7; 

      g.rotateY(-Math.PI * (5 / 9)); 
      g.rotateZ(-Math.PI / 6); 
      scene.add(g); 
      globe = g; 

      setTimeout(() => { 
        if (!globe) return; 
        globe 
          .arcsData(ARCS) 
          .arcColor((d: object) => (d as (typeof ARCS)[0]).color) 
          .arcAltitude(0.32) 
          .arcStroke(0.5) 
          .arcDashLength(0.4) 
          .arcDashGap(1.8) 
          .arcDashAnimateTime(900) 
          .arcsTransitionDuration(800) 
          .arcDashInitialGap((d: object) => (ARCS.indexOf(d as (typeof ARCS)[0]) % 5) * 0.6) 
          .ringsData(HUBS) 
          .ringColor(() => BRAND_GREEN) 
          .ringMaxRadius(3.5) 
          .ringPropagationSpeed(3) 
          .ringRepeatPeriod(1000) 
          .pointsData(HUBS) 
          .pointColor(() => BRAND_GREEN) 
          .pointAltitude(0.025) 
          .pointRadius(0.4) 
          .pointsMerge(false) 
          .labelsData(HUBS) 
          .labelText((d: any) => d.name) 
          .labelSize(2.2) 
          .labelDotRadius(0.5) 
          .labelColor(() => "#ffffffff") 
          .labelAltitude(0.06) 
          .labelResolution(3); 
      }, 1200); 
    }; 

    if (geoJsonCache) {
      build(geoJsonCache);
    } else {
      fetch(
        "https://raw.githubusercontent.com/vasturiano/three-globe/master/example/country-polygons/ne_110m_admin_0_countries.geojson"
      )
        .then((r) => r.json())
        .then((d) => { geoJsonCache = d.features; build(d.features); })
        .catch(() => {
          const g = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
            .showAtmosphere(true).atmosphereColor(BRAND_GREEN).atmosphereAltitude(0.18);
          (g.globeMaterial() as THREE.MeshPhongMaterial).color = new THREE.Color(0x080e1e);
          g.rotateY(-Math.PI * (5 / 9)); g.rotateZ(-Math.PI / 6);
          scene.add(g); globe = g;
        });
    }

    let mx = 0, my = 0; 
    const hW = W / 2, hH = H / 2; 

    let mousePending = false;
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX - hW;
      my = e.clientY - hH;
      if (mousePending) return;
      mousePending = true;
      requestAnimationFrame(() => {
        mousePending = false;
        if (!globe) return;
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / W) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / H) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(globe.children, true);
        if (intersects.length > 0) {
          const obj: any = intersects.find(i => (i.object as any).__data);
          if (obj && obj.object.__data && obj.object.__data.client) {
            const data = obj.object.__data;
            setHoveredClient({ name: data.name, client: data.client, x: e.clientX, y: e.clientY });
            container.style.cursor = "pointer";
          } else {
            setHoveredClient(null);
            container.style.cursor = "default";
          }
        } else {
          setHoveredClient(null);
          container.style.cursor = "default";
        }
      });
    };
    document.addEventListener("mousemove", onMouse); 

    const onResize = () => { 
      const w = container.clientWidth, h = container.clientHeight; 
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); 
    }; 
    window.addEventListener("resize", onResize); 

    const tick = () => { 
      rafId = requestAnimationFrame(tick); 
      if (Math.abs(mx) <= hW / 2) camera.position.x += (mx / 2 - camera.position.x) * 0.003; 
      camera.position.y += (-my / 2 - camera.position.y) * 0.003; 
      camera.lookAt(scene.position); 
      controls.update(); 
      renderer.render(scene, camera); 
    }; 
    tick(); 

    return () => { 
      cancelAnimationFrame(rafId); 
      document.removeEventListener("mousemove", onMouse); 
      window.removeEventListener("resize", onResize); 
      controls.dispose(); 
      renderer.dispose(); 
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement); 
    }; 
  }, []); 

  return ( 
    <div style={{ width, height, overflow: "hidden", background: "transparent", position: "relative", marginTop }}> 
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} /> 
      
      {hoveredClient && (
        <div 
          style={{ 
            position: "fixed", 
            left: hoveredClient.x + 15, 
            top: hoveredClient.y + 15, 
            backgroundColor: "rgba(13, 25, 48, 0.95)", 
            border: "1px solid #00ff99", 
            borderRadius: "8px", 
            padding: "12px 16px", 
            color: "#fff", 
            zIndex: 9999, 
            pointerEvents: "none", 
            boxShadow: "0 4px 20px rgba(0, 255, 153, 0.2)", 
            backdropFilter: "blur(8px)", 
            minWidth: "180px", 
            fontFamily: "var(--font-sans, sans-serif)" 
          }} 
        > 
          <div style={{ color: BRAND_GREEN, fontSize: "12px", fontWeight: "bold", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {hoveredClient.name}
          </div> 
          <div style={{ fontSize: "15px", fontWeight: "600", color: "#e2e8f0" }}> 
            {hoveredClient.client} 
          </div> 
        </div> 
      )} 
    </div> 
  ); 
} 

export default Globe;