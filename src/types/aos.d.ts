declare module "aos" {
  interface AOSOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    disable?: boolean | (() => boolean);
    startEvent?: string;
    initClassName?: string;
    animatedClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
    debounceDelay?: number;
    throttleDelay?: number;
  }

  interface AOS {
    init(options?: AOSOptions): void;
    refresh(options?: AOSOptions): void;
    refreshHard(): void;
  }

  const AOS: AOS;
  export default AOS;
}

declare module "aos/dist/aos.css";