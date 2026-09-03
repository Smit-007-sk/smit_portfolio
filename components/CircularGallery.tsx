"use client";

import React, { useEffect, useRef } from "react";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import "./CircularGallery.css";

export interface CircularGalleryItem {
  image: string;
  text: string;
}

export interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  autoScroll?: boolean;
  autoScrollSpeed?: number;
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

const DEFAULT_FONT = "bold 26px Figtree";
const DEFAULT_FONT_URL = "https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap";

function deriveFontFamilyFromUrl(url: string) {
  const fileName = (url.split("/").pop() || "custom-font").split("?")[0];
  const base = fileName.replace(/\.(woff2?|ttf|otf|eot)$/i, "");
  return base.replace(/[^a-zA-Z0-9-_ ]/g, "").trim() || "CircularGalleryFont";
}

async function loadFontFromStylesheet(url: string) {
  if (typeof window === "undefined" || typeof document === "undefined") return "CircularGalleryFont";
  const FontFaceConstructor = (window as any).FontFace;
  if (!FontFaceConstructor) return "CircularGalleryFont";

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch font stylesheet (${response.status})`);
  const cssText = await response.text();
  const faceBlocks = cssText.match(/@font-face\s*{[^}]*}/g) || [];
  let family: string | null = null;
  const fontFaces: any[] = [];
  for (const block of faceBlocks) {
    const familyMatch = block.match(/font-family:\s*['"]?([^;'"]+)['"]?/);
    const urlMatch = block.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);
    if (!familyMatch || !urlMatch) continue;
    family = familyMatch[1].trim();
    const descriptors: Record<string, string> = {};
    const weightMatch = block.match(/font-weight:\s*([^;]+);/);
    const styleMatch = block.match(/font-style:\s*([^;]+);/);
    const rangeMatch = block.match(/unicode-range:\s*([^;]+);/);
    if (weightMatch) descriptors.weight = weightMatch[1].trim();
    if (styleMatch) descriptors.style = styleMatch[1].trim();
    if (rangeMatch) descriptors.unicodeRange = rangeMatch[1].trim();
    fontFaces.push(new FontFaceConstructor(family, `url(${urlMatch[1]})`, descriptors));
  }
  if (!family) throw new Error("No @font-face rule found in the stylesheet");
  await Promise.allSettled(
    fontFaces.map(async (face) => {
      await face.load();
      (document as any).fonts?.add(face);
    })
  );
  return family;
}

async function loadFontFromFile(url: string) {
  if (typeof window === "undefined" || typeof document === "undefined") return "CircularGalleryFont";
  const FontFaceConstructor = (window as any).FontFace;
  if (!FontFaceConstructor) return "CircularGalleryFont";

  const family = deriveFontFamilyFromUrl(url);
  const fontFace = new FontFaceConstructor(family, `url(${url})`);
  await fontFace.load();
  (document as any).fonts?.add(fontFace);
  return family;
}

async function loadCustomFont(fontUrl: string) {
  const isStylesheet = fontUrl.includes("fonts.googleapis.com") || /\.css(\?.*)?$/i.test(fontUrl);
  return isStylesheet ? loadFontFromStylesheet(fontUrl) : loadFontFromFile(fontUrl);
}

async function resolveFont(font: string, fontUrl?: string) {
  const effectiveUrl = fontUrl || (font === DEFAULT_FONT ? DEFAULT_FONT_URL : null);
  if (!effectiveUrl) {
    if (typeof document !== "undefined" && document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(font);
        await document.fonts.ready;
      } catch {
        // Ignore fallback
      }
    }
    return font;
  }
  try {
    const family = await loadCustomFont(effectiveUrl);
    const sizeMatch = font.match(/^\s*(.*?\d+px)/);
    const prefix = sizeMatch ? sizeMatch[1].trim() : "bold 26px";
    const resolved = `${prefix} "${family}"`;
    if (typeof document !== "undefined" && document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(resolved);
      } catch {
        // Ignore fallback
      }
    }
    return resolved;
  } catch (error) {
    console.error("CircularGallery: unable to load font from", fontUrl, error);
    return font;
  }
}

function getFontSize(font: string) {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 26;
}

function createTextTexture(gl: any, text: string, font = "bold 26px monospace", color = "black") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return { texture: new Texture(gl), width: 1, height: 1 };
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(getFontSize(font) * 1.3);
  canvas.width = textWidth + 30;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  gl: any;
  plane: any;
  renderer: any;
  text: string;
  textColor: string;
  font: string;
  mesh: any;
  width: number = 1;
  height: number = 1;

  constructor({ gl, plane, renderer, text, textColor = "#FFFFFF", font = "26px sans-serif" }: any) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    this.width = width;
    this.height = height;
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    this.mesh.setParent(this.plane);
  }
  updateLayout(planeScaleX: number, planeScaleY: number, isMobile: boolean) {
    if (!this.mesh) return;
    const aspect = this.width / this.height;
    const localH = isMobile ? 0.08 : 0.12;
    const localW = localH * aspect * (planeScaleY / planeScaleX);
    this.mesh.scale.set(localW, localH, 1);
    this.mesh.position.y = -0.5 - (localH * 0.5) - (isMobile ? 0.06 : 0.05);
    this.mesh.position.x = 0;
  }
}

class Media {
  extra: number;
  geometry: any;
  gl: any;
  image: string;
  index: number;
  length: number;
  renderer: any;
  scene: any;
  screen: any;
  text: string;
  viewport: any;
  bend: number;
  effectiveBend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  program: any;
  plane: any;
  title: any;
  scale: number = 1;
  padding: number = 2;
  width: number = 0;
  widthTotal: number = 0;
  x: number = 0;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
  }: any) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.effectiveBend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }
  update(scroll: any, direction: string) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    const activeBend = this.effectiveBend;

    if (activeBend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(activeBend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(Math.max(0, R * R - effectiveX * effectiveX));
      if (activeBend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(Math.min(1, effectiveX / R));
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(Math.min(1, effectiveX / R));
      }
    }

    // Generous buffer so recycling occurs completely out of view, never vanishing on screen
    const planeOffset = this.plane.scale.x;
    const viewportOffset = this.viewport.width / 2 + this.plane.scale.x * 1.5;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  onResize({ screen, viewport }: any = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    if (!this.screen || !this.viewport) return;

    const isMobile = this.screen.width < 768;
    
    // Proportional bend that matches reference image layout
    this.effectiveBend = isMobile ? 2.2 : this.bend;

    this.scale = this.screen.height / 1500;
    
    if (isMobile) {
      // Mobile: portrait card aspect ratio (3:4) matching reference image with side cards visible
      this.plane.scale.y = this.viewport.height * 0.56;
      this.plane.scale.x = this.plane.scale.y * 0.72;
      this.padding = this.plane.scale.x * 0.34;
    } else {
      // Desktop: classic React Bits formula
      this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
      this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
      this.padding = 2.0;
    }

    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;

    // Anchor title mesh locally below the card with no aspect stretching
    if (this.title) {
      this.title.updateLayout(this.plane.scale.x, this.plane.scale.y, isMobile);
    }
  }
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  autoScroll: boolean;
  autoScrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position: number };
  onCheckDebounce: any;
  renderer: any;
  gl: any;
  camera: any;
  scene: any;
  planeGeometry: any;
  mediasImages: any[] = [];
  medias: any[] = [];
  screen: any;
  viewport: any;
  raf: number = 0;
  isDown: boolean = false;
  start: number = 0;
  boundOnResize: any;
  boundOnWheel: any;
  boundOnTouchDown: any;
  boundOnTouchMove: any;
  boundOnTouchUp: any;
  boundOnKeyDown: any;

  constructor(
    container: HTMLElement,
    {
      items,
      bend,
      textColor = "#ffffff",
      borderRadius = 0,
      font = "bold 26px Figtree",
      scrollSpeed = 2,
      scrollEase = 0.05,
      autoScroll = true,
      autoScrollSpeed = 0.08,
    }: any = {}
  ) {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("no-js");
    }
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.autoScroll = autoScroll;
    this.autoScrollSpeed = autoScrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.onResize();
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }
  createMedias(items: any[], bend = 1, textColor: string, borderRadius: number, font: string) {
    const defaultItems = [
      { image: `/projects/millionaire-digital-real.jpg`, text: "MILLIONAIRE DIGITAL" },
      { image: `/projects/nexora-crm-real.jpg`, text: "NEXORA CRM" },
      { image: `/projects/emperor-media.jpg`, text: "EMPEROR MEDIA" },
      { image: `/projects/dental-uk-real.jpg`, text: "DENTAL UK" },
      { image: `/projects/spotify-clone-real.jpg`, text: "SPOTIFY CLONE" },
      { image: `/projects/ecommerce-platform-real.jpg`, text: "E-COMMERCE" },
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    // 3-fold items so carousel wraps seamlessly far off-screen
    this.mediasImages = galleryItems.concat(galleryItems).concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      });
    });
  }
  onTouchDown(e: any) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }
  onTouchMove(e: any) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }
  onTouchUp() {
    this.isDown = false;
    if (!this.autoScroll) {
      this.onCheck();
    }
  }
  onWheel(e: any) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    if (!this.autoScroll) {
      this.onCheckDebounce();
    }
  }
  onKeyDown(e: any) {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        this.scroll.target += this.scrollSpeed * 5;
        if (!this.autoScroll) this.onCheckDebounce();
        break;

      case "ArrowLeft":
        e.preventDefault();
        this.scroll.target -= this.scrollSpeed * 5;
        if (!this.autoScroll) this.onCheckDebounce();
        break;

      case "Home":
        e.preventDefault();
        this.scroll.target = 0;
        if (!this.autoScroll) this.onCheckDebounce();
        break;

      default:
        break;
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    if (!this.container) return;
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    if (this.renderer) {
      this.renderer.setSize(this.screen.width, this.screen.height);
    }
    if (this.camera) {
      this.camera.perspective({
        aspect: this.screen.width / this.screen.height,
      });
      const fov = (this.camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
      const width = height * this.camera.aspect;
      this.viewport = { width, height };
    }
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }
  update() {
    if (this.autoScroll && !this.isDown) {
      this.scroll.target += this.autoScrollSpeed;
    }
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render({ scene: this.scene, camera: this.camera });
    }
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);

    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("wheel", this.boundOnWheel, { passive: true });
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown, { passive: true });
    window.addEventListener("touchmove", this.boundOnTouchMove, { passive: true });
    window.addEventListener("touchend", this.boundOnTouchUp);

    this.container?.addEventListener("keydown", this.boundOnKeyDown);
  }
  destroy() {
    if (typeof window !== "undefined") {
      window.cancelAnimationFrame(this.raf);
      window.removeEventListener("resize", this.boundOnResize);
      window.removeEventListener("wheel", this.boundOnWheel);
      window.removeEventListener("mousedown", this.boundOnTouchDown);
      window.removeEventListener("mousemove", this.boundOnTouchMove);
      window.removeEventListener("mouseup", this.boundOnTouchUp);
      window.removeEventListener("touchstart", this.boundOnTouchDown);
      window.removeEventListener("touchmove", this.boundOnTouchMove);
      window.removeEventListener("touchend", this.boundOnTouchUp);
    }
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }

    if (this.container) {
      this.container.removeEventListener("keydown", this.boundOnKeyDown);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 26px Figtree",
  fontUrl,
  scrollSpeed = 2,
  scrollEase = 0.05,
  autoScroll = true,
  autoScrollSpeed = 0.08,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let app: App | undefined;
    let isMounted = true;

    resolveFont(font, fontUrl).then((resolvedFont) => {
      if (!isMounted || !containerRef.current) return;
      app = new App(containerRef.current, {
        items,
        bend,
        textColor,
        borderRadius,
        font: resolvedFont,
        scrollSpeed,
        scrollEase,
        autoScroll,
        autoScrollSpeed,
      });
    });

    return () => {
      isMounted = false;
      if (app) app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase, autoScroll, autoScrollSpeed]);

  return (
    <div
      className="circular-gallery"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular image gallery."
    />
  );
}
